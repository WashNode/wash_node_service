import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VendorAvailabilityService } from './vendor-availability.service';
import { UpdateVendorAvailabilityDto } from './dto/update-vendor-availability.dto';

@ApiTags('Vendor')
@Controller('vendor/availability')
export class VendorAvailabilityController {
    constructor(
        private readonly availabilityService: VendorAvailabilityService,
    ) { }

    @Get(':vendorId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get vendor availability by vendor ID' })
    @ApiResponse({ status: 200, description: 'Vendor availability retrieved successfully' })
    @ApiParam({ name: 'vendorId', description: 'The ID of the vendor' })
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
    @ApiOperation({ summary: 'Update vendor availability' })
    @ApiResponse({ status: 200, description: 'Vendor availability updated successfully' })
    @ApiParam({ name: 'vendorId', description: 'The ID of the vendor' })
    @ApiBody({ type: UpdateVendorAvailabilityDto })
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
