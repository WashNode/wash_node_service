import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
} from '@nestjs/common';
import { VendorAvailabilityService } from './vendor-availability.service';
import { UpdateVendorAvailabilityDto } from './dto/update-vendor-availability.dto';

@Controller('availability')
export class VendorAvailabilityController {
    constructor(
        private readonly availabilityService: VendorAvailabilityService,
    ) { }

    @Get(':vendorId')
    @HttpCode(HttpStatus.OK)
    async getAvailability(@Param('vendorId') vendorId: string) {
        const availability = await this.availabilityService.getAvailability(vendorId);
        return {
            success: true,
            data: availability,
            message: 'Vendor availability retrieved successfully!',
        };
    }

    @Put(':vendorId')
    @HttpCode(HttpStatus.OK)
    async updateAvailability(
        @Param('vendorId') vendorId: string,
        @Body() updateDto: UpdateVendorAvailabilityDto,
    ) {
        const availability = await this.availabilityService.updateAvailability(
            vendorId,
            updateDto,
        );
        return {
            success: true,
            data: availability,
            message: 'Vendor availability updated successfully!',
        };
    }
}
