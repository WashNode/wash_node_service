import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { BookingListDto } from './dto/booking.dto';

@ApiTags('Admin')
@Controller('admin/bookings')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Get()
    @ApiOperation({ summary: 'Retrieve list of bookings with optional filters' })
    @ApiResponse({ status: 200, description: 'List of bookings retrieved successfully' })
    async list(@Query() query: BookingListDto) {
        const result = await this.bookingService.listBookings(query);
        return { success: true, ...result };
    }

    @Get('defaults')
    @ApiOperation({ summary: 'Retrieve default values (vendors and customers) for booking creation forms' })
    @ApiResponse({ status: 200, description: 'Default arrays for bookings retrieved' })
    async getDefaults() {
        const result = await this.bookingService.getDefaults();
        return { success: true, data: result, message: 'Booking Default data' };
    }
}
