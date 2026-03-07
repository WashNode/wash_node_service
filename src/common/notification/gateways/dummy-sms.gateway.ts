import { Injectable, Logger } from '@nestjs/common';
import { ISmsGateway, SmsSendStatus } from '../interfaces/sms.interface';

/**
 * Dummy SMS Gateway Implementation
 * This is a placeholder implementation. Replace with actual SMS provider (Twilio, AWS SNS, etc.)
 */
@Injectable()
export class DummySmsGateway implements ISmsGateway {
    private readonly logger = new Logger(DummySmsGateway.name);

    async sendSms(phoneNumber: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
        try {
            this.logger.log(`[DUMMY SMS] Sending SMS to ${phoneNumber}: ${message}`);

            // TODO: Replace with actual SMS provider
            // Example implementations to add later:
            // - Twilio
            // - AWS SNS
            // - Firebase Cloud Messaging
            // - Custom SMS API

            const messageId = `DUMMY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            this.logger.log(`[DUMMY SMS] SMS sent successfully with ID: ${messageId}`);
            return {
                success: true,
                messageId,
            };
        } catch (error) {
            this.logger.error(`[DUMMY SMS] Failed to send SMS`, error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            };
        }
    }
}
