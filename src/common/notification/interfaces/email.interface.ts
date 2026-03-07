/**
 * Interface for Email sending functionality
 */
export interface IEmailGateway {
    sendEmail(to: string, subject: string, body: string, htmlBody?: string): Promise<{ success: boolean; messageId?: string; error?: string }>;
    sendBulkEmail(recipients: string[], subject: string, body: string, htmlBody?: string): Promise<{ success: boolean; messageIds?: string[]; error?: string }>;
}

/**
 * Enum for Email status tracking
 */
export enum EmailSendStatus {
    PENDING = 'PENDING',
    SENT = 'SENT',
    FAILED = 'FAILED',
    DELIVERED = 'DELIVERED',
    BOUNCED = 'BOUNCED',
}
