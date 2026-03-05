"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WebhookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let WebhookService = WebhookService_1 = class WebhookService {
    prisma;
    logger = new common_1.Logger(WebhookService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    verifyWebhook(mode, token, challenge) {
        const verifyToken = process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN;
        if (mode === 'subscribe' && token === verifyToken) {
            this.logger.log('Facebook webhook verified successfully');
            return challenge;
        }
        throw new common_1.BadRequestException('Webhook verification failed: token mismatch');
    }
    async handleLeadEvent(payload) {
        if (payload.object !== 'page') {
            this.logger.warn(`Unhandled webhook object type: ${payload.object}`);
            return;
        }
        for (const entry of payload.entry) {
            for (const change of entry.changes) {
                if (change.field !== 'leadgen')
                    continue;
                const leadgenId = change.value.leadgen_id;
                this.logger.log(`Processing Facebook lead: ${leadgenId}`);
                try {
                    const leadData = await this.fetchLeadData(leadgenId);
                    await this.createEnquiryFromLead(leadgenId, leadData);
                }
                catch (err) {
                    this.logger.error(`Failed to process lead ${leadgenId}:`, err);
                }
            }
        }
    }
    async fetchLeadData(leadgenId) {
        const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
        if (!accessToken)
            throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is not set');
        const url = `https://graph.facebook.com/v19.0/${leadgenId}?access_token=${accessToken}`;
        const res = await fetch(url);
        if (!res.ok) {
            const body = await res.text();
            throw new Error(`Graph API error ${res.status}: ${body}`);
        }
        return res.json();
    }
    async createEnquiryFromLead(leadgenId, data) {
        const fields = {};
        for (const f of data.field_data) {
            fields[f.name] = f.values[0] ?? '';
        }
        const name = [fields['full_name'], fields['first_name'], fields['last_name']]
            .filter(Boolean)
            .join(' ')
            .trim() || 'Unknown';
        const phone = fields['phone_number'] || fields['phone'] || '';
        const email = fields['email'] || undefined;
        const destination = fields['destination'] || fields['travel_destination'] || undefined;
        const source = await this.prisma.leadSource.findFirst({
            where: { type: 'FACEBOOK' },
        });
        if (!source) {
            throw new Error('No FACEBOOK lead source configured. Add one via POST /api/config/lead-sources.');
        }
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'ENQUIRY', name: 'New', isActive: true },
        });
        if (!defaultStatus) {
            throw new Error('Default enquiry status "New" not found.');
        }
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
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = WebhookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map