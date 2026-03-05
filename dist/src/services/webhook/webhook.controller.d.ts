import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private readonly webhookService;
    private readonly logger;
    constructor(webhookService: WebhookService);
    verify(mode: string, token: string, challenge: string): string;
    handleEvent(payload: any): Promise<{
        status: string;
    }>;
}
