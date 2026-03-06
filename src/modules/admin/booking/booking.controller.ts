import { Controller, Get, Query } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Get()
    async list(@Query() query: any) {
        const result = await this.bookingService.listBookings(query);
        return { success: true, ...result };
    }
}
