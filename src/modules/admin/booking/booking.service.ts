import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WinstonLogger } from '../../../common/logger/winston.logger';
import { BookingRepository } from '../../../db/repositories/booking.repository';
import { CustomerRepository } from '../../../db/repositories/customer.repository';
import { VendorRepository } from '../../../db/repositories/vendor.repository';
import { BookingListDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
    constructor(
        private readonly bookingRepository: BookingRepository,
        private readonly customerRepository: CustomerRepository,
        private readonly vendorRepository: VendorRepository,
        private readonly logger: WinstonLogger
    ) { }

    async listBookings(query: BookingListDto) {
        try {
            const where = { ...query };
            const bookings = await this.bookingRepository.findAll({
                where,
                order: { date: 'ASC' },
            });

            this.logger.log(`Bookings listed successfully`, BookingService.name);
            return { bookings };
        } catch (err: unknown) {
            const error = err as Error;
            this.logger.error(`Failed to list bookings: ${error.message}`, error.stack, BookingService.name);
            throw new InternalServerErrorException(error.message);
        }
    }

    async getDefaults() {
        try {
            const vendors = await this.vendorRepository.findBySelectedFields(
                {},
                ['_id', 'shopName']
            );

            const customers = await this.customerRepository.findBySelectedFields(
                {},
                ['_id', 'name', 'email', 'displayName']
            );

            return { vendors, customers };
        } catch (err: unknown) {
            const error = err as Error;
            this.logger.error(`Failed to get booking defaults: ${error.message}`, error.stack, BookingService.name);
            throw new InternalServerErrorException(error.message);
        }
    }
}
