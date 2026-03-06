import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BookingRepository } from '../../../db/repositories/booking.repository';
import lodash from 'lodash';

@Injectable()
export class BookingService {
    constructor(private readonly bookingRepository: BookingRepository) { }

    async listBookings(query) {
        try {
            const { requestTo, requestBy, } = query;
            const filterParams: { requestTo?: string; requestBy?: string } = {};
            if (requestTo) filterParams.requestTo = requestTo;
            if (requestBy) filterParams.requestBy = requestBy;
            let bookings = await this.bookingRepository.findAll(filterParams);

            bookings = lodash.sortBy(bookings, 'date');
            return { bookings };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
