import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

interface FacebookLeadEntry {
    id: string;
    time: number;
    changes: {
        value: {
            leadgen_id: string;
            page_id: string;
            form_id: string;
            adgroup_id?: string;
            ad_id?: string;
            created_time: number;
        };
        field: string;
    }[];
}

interface FacebookWebhookPayload {
    object: string;
    entry: FacebookLeadEntry[];
}

interface FacebookLeadData {
    field_data: { name: string; values: string[] }[];
}

@Injectable()
export class WebhookService {
    private readonly logger = new Logger(WebhookService.name);

    constructor(private readonly prisma: PrismaService) { }

    // ── Verification handshake ────────────────────────────────────────────────────
    verifyWebhook(mode: string, token: string, challenge: string): string {
        const verifyToken = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN;

        if (mode === 'subscribe' && token === verifyToken) {
            this.logger.log('Facebook webhook verified successfully');
            return challenge;
        }

        throw new BadRequestException('Webhook verification failed: token mismatch');
    }

    // ── Incoming lead event ───────────────────────────────────────────────────────
    async handleLeadEvent(payload: FacebookWebhookPayload): Promise<void> {
        if (payload.object !== 'page') {
            this.logger.warn(`Unhandled webhook object type: ${payload.object}`);
            return;
        }

        for (const entry of payload.entry) {
            for (const change of entry.changes) {
                if (change.field !== 'leadgen') continue;

                const leadgenId = change.value.leadgen_id;
                this.logger.log(`Processing Facebook lead: ${leadgenId}`);

                try {
                    const leadData = await this.fetchLeadData(leadgenId);
                    await this.createEnquiryFromLead(leadgenId, leadData);
                } catch (err) {
                    this.logger.error(`Failed to process lead ${leadgenId}:`, err);
                }
            }
        }
    }

    // ── Fetch lead details from Graph API ─────────────────────────────────────────
    private async fetchLeadData(leadgenId: string): Promise<FacebookLeadData> {
        const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
        if (!accessToken) throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is not set');

        const url = `https://graph.facebook.com/v19.0/${leadgenId}?access_token=${accessToken}`;
        const res = await fetch(url);

        if (!res.ok) {
            const body = await res.text();
            throw new Error(`Graph API error ${res.status}: ${body}`);
        }

        return res.json() as Promise<FacebookLeadData>;
    }

    // ── Map Facebook fields → Enquiry ─────────────────────────────────────────────
    private async createEnquiryFromLead(
        leadgenId: string,
        data: FacebookLeadData,
    ): Promise<void> {
        // Flatten the field_data array into a plain object
        const fields: Record<string, string> = {};
        for (const f of data.field_data) {
            fields[f.name] = f.values[0] ?? '';
        }

        const name =
            [fields['full_name'], fields['first_name'], fields['last_name']]
                .filter(Boolean)
                .join(' ')
                .trim() || 'Unknown';

        const phone = fields['phone_number'] || fields['phone'] || '';
        const email = fields['email'] || undefined;
        const destination = fields['destination'] || fields['travel_destination'] || undefined;

        // Find or fall back to the first Facebook lead source
        const source = await this.prisma.leadSource.findFirst({
            where: { type: 'FACEBOOK' },
        });

        if (!source) {
            throw new Error('No FACEBOOK lead source configured. Add one via POST /api/config/lead-sources.');
        }

        // Find default enquiry status
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'ENQUIRY', name: 'New', isActive: true },
        });

        if (!defaultStatus) {
            throw new Error('Default enquiry status "New" not found.');
        }

        // Avoid duplicate processing of the same lead
        const existing = await this.prisma.enquiry.findFirst({
            where: { phone, sourceId: source.id, name },
        });

        if (existing) {
            this.logger.warn(`Lead ${leadgenId} appears to be a duplicate – skipping.`);
            return;
        }

        await this.prisma.enquiry.create({
            data: {
                name,
                phone,
                email,
                destination,
                sourceId: source.id,
                statusId: defaultStatus.id,
            },
        });

        this.logger.log(`Enquiry created from Facebook lead ${leadgenId} for '${name}'`);
    }
}
