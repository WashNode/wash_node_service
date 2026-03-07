import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '../../../db/repositories/booking.repository';
import { BookingListDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
    constructor(private readonly bookingRepository: BookingRepository) { }

    async listBookings(query: BookingListDto) {
        try {
            const where = { ...query };
            const bookings = await this.bookingRepository.findAll({
                where,
                order: { date: 'ASC' },
            });

            return { bookings };
        } catch (err: unknown) {
            const error = err as Error;
            throw new InternalServerErrorException(error.message);
        }
    }
}
