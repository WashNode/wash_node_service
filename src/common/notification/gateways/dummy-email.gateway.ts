import { Injectable } from '@nestjs/common';
import { WinstonLogger } from '../../logger/winston.logger';
import { IEmailGateway, EmailSendStatus } from '../interfaces/email.interface';

/**
 * Dummy Email Gateway Implementation
 * This is a placeholder implementation. Replace with actual Email provider (SendGrid, AWS SES, Nodemailer, etc.)
 */
@Injectable()
export class DummyEmailGateway implements IEmailGateway {
    constructor(private readonly logger: WinstonLogger) { }

    async sendEmail(to: string, subject: string, body: string, htmlBody?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
        try {
            this.logger.log(`[DUMMY EMAIL] Sending email to ${to} with subject: ${subject}`, DummyEmailGateway.name);

            // TODO: Replace with actual Email provider
            // Example implementations to add later:
            // - SendGrid
            // - AWS SES
            // - Nodemailer
            // - Gmail API
            // - Custom Email Service

            const messageId = `DUMMY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            this.logger.log(`[DUMMY EMAIL] Email sent successfully with ID: ${messageId}`, DummyEmailGateway.name);
            return {
                success: true,
                messageId,
            };
        } catch (error) {
            this.logger.error(`[DUMMY EMAIL] Failed to send email`, error, DummyEmailGateway.name);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            };
        }
    }

    async sendBulkEmail(recipients: string[], subject: string, body: string, htmlBody?: string): Promise<{ success: boolean; messageIds?: string[]; error?: string }> {
        try {
            this.logger.log(`[DUMMY EMAIL] Sending bulk email to ${recipients.length} recipients with subject: ${subject}`, DummyEmailGateway.name);

            const messageIds: string[] = [];

            for (const recipient of recipients) {
                const messageId = `DUMMY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                messageIds.push(messageId);
            }

            this.logger.log(`[DUMMY EMAIL] Bulk emails sent successfully with ${messageIds.length} message IDs`, DummyEmailGateway.name);
            return {
                success: true,
                messageIds,
            };
        } catch (error) {
            this.logger.error(`[DUMMY EMAIL] Failed to send bulk emails`, error, DummyEmailGateway.name);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            };
        }
    }
}
