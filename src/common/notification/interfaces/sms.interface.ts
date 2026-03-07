/**
 * Interface for SMS sending functionality
 */
export interface ISmsGateway {
    sendSms(phoneNumber: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

/**
 * Enum for SMS status tracking
 */
export enum SmsSendStatus {
    PENDING = 'PENDING',
    SENT = 'SENT',
    FAILED = 'FAILED',
    DELIVERED = 'DELIVERED',
}
