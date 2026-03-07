import { Injectable } from '@nestjs/common';
import { ISmsGateway } from './interfaces/sms.interface';
import { IEmailGateway } from './interfaces/email.interface';

/**
 * Notification Service
 * Provides a unified interface for sending SMS and Email notifications
 */
@Injectable()
export class NotificationService {
    constructor(
        private readonly smsGateway: ISmsGateway,
        private readonly emailGateway: IEmailGateway,
    ) { }

    /**
     * Send SMS notification
     */
    async sendSms(phoneNumber: string, message: string) {
        return this.smsGateway.sendSms(phoneNumber, message);
    }

    /**
     * Send Email notification
     */
    async sendEmail(to: string, subject: string, body: string, htmlBody?: string) {
        return this.emailGateway.sendEmail(to, subject, body, htmlBody);
    }

    /**
     * Send Bulk Email notification
     */
    async sendBulkEmail(recipients: string[], subject: string, body: string, htmlBody?: string) {
        return this.emailGateway.sendBulkEmail(recipients, subject, body, htmlBody);
    }
}
