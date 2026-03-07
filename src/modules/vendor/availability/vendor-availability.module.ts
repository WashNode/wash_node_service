import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorAvailabilityController } from './vendor-availability.controller';
import { VendorAvailabilityService } from './vendor-availability.service';
import { VendorAvailabilityRepository } from '../../../db/repositories/vendor-availability.repository';
import { VendorAvailability, VendorAvailabilitySchema } from '../../../db/schemas/vendor-availability.schema';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: VendorAvailability.name, schema: VendorAvailabilitySchema },
        ]),
        LoggerModule
    ],
    controllers: [VendorAvailabilityController],
    providers: [VendorAvailabilityService, VendorAvailabilityRepository],
    exports: [VendorAvailabilityService],
})
export class VendorAvailabilityModule { }
