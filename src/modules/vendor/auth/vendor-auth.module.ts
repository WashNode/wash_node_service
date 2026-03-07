import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorAuthController } from './vendor-auth.controller';
import { VendorAuthService } from './vendor-auth.service';
import { VendorRepository } from '../../../db/repositories/vendor.repository';
import { Vendor, VendorSchema } from '../../../db/schemas/vendor.schema';
import { NotificationModule } from '../../../common/notification/notification.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
        NotificationModule,
    ],
    controllers: [VendorAuthController],
    providers: [VendorAuthService, VendorRepository],
    exports: [VendorAuthService],
})
export class VendorAuthModule { }
