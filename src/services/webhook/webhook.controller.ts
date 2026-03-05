import {
    Controller,
    Get,
    Post,
    Query,
    Body,
    HttpCode,
    Logger,
    UsePipes,
} from '@nestjs/common';
import { WebhookService } from './webhook.service';

// Facebook sends raw JSON — bypass the global ValidationPipe (same as auth).
@UsePipes()
@Controller('webhook')
export class WebhookController {
    private readonly logger = new Logger(WebhookController.name);

    constructor(private readonly webhookService: WebhookService) { }

    // ── GET /webhook  — Facebook verification handshake ──────────────────────────
    @Get()
    verify(
        @Query('hub.mode') mode: string,
        @Query('hub.verify_token') token: string,
        @Query('hub.challenge') challenge: string,
    ): string {
        return this.webhookService.verifyWebhook(mode, token, challenge);
    }

    // ── POST /webhook — Incoming lead events ─────────────────────────────────────
    @Post()
    @HttpCode(200)
    async handleEvent(@Body() payload: any): Promise<{ status: string }> {
        this.logger.log('Received Facebook webhook event');
        // Respond 200 immediately; process asynchronously
        this.webhookService.handleLeadEvent(payload).catch((err) => {
            this.logger.error('Webhook processing error:', err);
        });
        return { status: 'ok' };
    }
}
