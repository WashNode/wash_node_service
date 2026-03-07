import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WinstonLogger } from '../../../common/logger/winston.logger';
import { BookingRepository } from '../../../db/repositories/booking.repository';
import { BookingListDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
    constructor(private readonly bookingRepository: BookingRepository, private readonly logger: WinstonLogger) { }

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
}
