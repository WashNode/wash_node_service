import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VendorService } from './vendor.service';
import { ServiceService } from '../services/services.service';
import { DiscountService } from '../discount/discount.service';

@ApiTags('Admin')
@Controller('admin/vendors')
export class VendorsController {
    constructor(
        private readonly vendorService: VendorService,
        private readonly serviceService: ServiceService,
        private readonly discountService: DiscountService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Retrieve all vendors with optional filters' })
    @ApiResponse({ status: 200, description: 'List of vendors' })
    async findAll(@Query() query: any) {
        const vendors = await this.vendorService.getAllVendors(query);
        return { success: true, data: vendors, message: 'Vendors list' };
    }

    @Get('default-values')
    @ApiOperation({ summary: 'Get default values for vendor creation' })
    @ApiResponse({ status: 200, description: 'Default values retrieved successfully' })
    async getDefaultValues() {
        try {
            const [allServices, allDiscounts] = await Promise.all([
                this.serviceService.getAllServices(),
                this.discountService.getAllActiveDiscounts(),
            ]);
            return { success: true, data: { allServices, allDiscounts }, message: 'Default values' };
        } catch (error) {
            return { success: false, data: {}, message: 'Failed to fetch default values' };
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a new vendor' })
    @ApiResponse({ status: 201, description: 'Vendor created successfully' })
    async create(@Body() vendorData: any) {
        const vendor = await this.vendorService.createVendor(vendorData);
        return { success: true, data: vendor, message: 'Vendor created successfully' };
    }

    @Put()
    @ApiOperation({ summary: 'Update an existing vendor' })
    @ApiResponse({ status: 200, description: 'Vendor updated successfully' })
    async update(@Body() vendorData: any) {
        const vendor = await this.vendorService.updateVendor(vendorData._id, vendorData);
        return { success: true, data: vendor, message: 'Vendor updated successfully' };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve vendor by ID' })
    @ApiResponse({ status: 200, description: 'Vendor details retrieved successfully' })
    @ApiParam({ name: 'id', description: 'The ID of the vendor' })
    async findById(@Param('id') id: string) {
        const vendor = await this.vendorService.getVendorById(id);
        return { success: true, data: vendor, message: 'Vendor details' };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a vendor by ID' })
    @ApiResponse({ status: 200, description: 'Vendor deleted successfully' })
    @ApiParam({ name: 'id', description: 'The ID of the vendor to delete' })
    async delete(@Param('id') id: string) {
        await this.vendorService.deleteVendor(id);
        return { success: true, message: 'Vendor deleted successfully' };
    }
}
