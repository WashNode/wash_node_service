import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from '../../../db/repositories/admin.repository';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Admin, AdminSchema } from '../../../db/schemas/admin.schema';
import { Booking, BookingSchema } from '../../../db/schemas/booking.schema';
import { BookingRepository } from '../../../db/repositories/booking.repository';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Admin.name, schema: AdminSchema },
            { name: Booking.name, schema: BookingSchema }
        ]),
        LoggerModule
    ],
    controllers: [BookingController],
    providers: [BookingService, AdminRepository, BookingRepository],
    exports: [BookingService, AdminRepository],
})
export class BookingModule { }
