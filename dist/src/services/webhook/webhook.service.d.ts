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
export declare class WebhookService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    verifyWebhook(mode: string, token: string, challenge: string): string;
    handleLeadEvent(payload: FacebookWebhookPayload): Promise<void>;
    private fetchLeadData;
    private createEnquiryFromLead;
}
export {};
