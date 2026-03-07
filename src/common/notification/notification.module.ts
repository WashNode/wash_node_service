import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { DummySmsGateway } from './gateways/dummy-sms.gateway';
import { DummyEmailGateway } from './gateways/dummy-email.gateway';
import { ISmsGateway } from './interfaces/sms.interface';
import { IEmailGateway } from './interfaces/email.interface';
import { LoggerModule } from '../logger/logger.module';

@Module({
    imports: [LoggerModule],
    providers: [
        NotificationService,
        {
            provide: 'SMS_GATEWAY',
            useClass: DummySmsGateway,
        },
        {
            provide: 'EMAIL_GATEWAY',
            useClass: DummyEmailGateway,
        },
        {
            provide: NotificationService,
            useFactory: (smsGateway: ISmsGateway, emailGateway: IEmailGateway) => {
                return new NotificationService(smsGateway, emailGateway);
            },
            inject: ['SMS_GATEWAY', 'EMAIL_GATEWAY'],
        },
    ],
    exports: [NotificationService],
})
export class NotificationModule { }
