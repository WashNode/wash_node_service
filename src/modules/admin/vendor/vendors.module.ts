import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorsController } from './vendors.controller';
import { VendorService } from './vendor.service';
import { VendorRepository } from '../../../db/repositories/vendor.repository';
import { VendorNotificationsRepository } from '../../../db/repositories/vendor-notifications.repository';
import { VendorServicesRepository } from '../../../db/repositories/vendor-services.repository';
import { VendorAvailabilityRepository } from '../../../db/repositories/vendor-availability.repository';
import { Vendor, VendorSchema } from '../../../db/schemas/vendor.schema';
import { VendorNotifications, VendorNotificationsSchema } from '../../../db/schemas/vendor-notifications.schema';
import { VendorServices, VendorServicesSchema } from '../../../db/schemas/vendor-services.schema';
import { VendorAvailability, VendorAvailabilitySchema } from '../../../db/schemas/vendor-availability.schema';
import { NotificationModule } from '../../../common/notification/notification.module';
import { ServicesModule } from '../services/services.module';
import { DiscountModule } from '../discount/discount.module';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Vendor.name, schema: VendorSchema },
            { name: VendorNotifications.name, schema: VendorNotificationsSchema },
            { name: VendorServices.name, schema: VendorServicesSchema },
            { name: VendorAvailability.name, schema: VendorAvailabilitySchema },
        ]),
        NotificationModule,
        ServicesModule,
        DiscountModule,
        LoggerModule
    ],
    controllers: [VendorsController],
    providers: [
        VendorService,
        VendorRepository,
        VendorNotificationsRepository,
        VendorServicesRepository,
        VendorAvailabilityRepository,
    ],
    exports: [VendorService],
})
export class VendorsModule { }
