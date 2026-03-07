import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ServiceRepository } from '../../../db/repositories/service.repository';
import { VendorRepository } from '../../../db/repositories/vendor.repository';
import { CustomerRepository } from '../../../db/repositories/customer.repository';
import { BookingRepository } from '../../../db/repositories/booking.repository';
import { Service, ServiceSchema } from '../../../db/schemas/service.schema';
import { Vendor, VendorSchema } from '../../../db/schemas/vendor.schema';
import { Customer, CustomerSchema } from '../../../db/schemas/customer.schema';
import { Booking, BookingSchema } from '../../../db/schemas/booking.schema';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Service.name, schema: ServiceSchema },
            { name: Vendor.name, schema: VendorSchema },
            { name: Customer.name, schema: CustomerSchema },
            { name: Booking.name, schema: BookingSchema },
        ]),
        LoggerModule
    ],
    controllers: [DashboardController],
    providers: [
        DashboardService,
        ServiceRepository,
        VendorRepository,
        CustomerRepository,
        BookingRepository,
    ],
    exports: [DashboardService],
})
export class DashboardModule { }
