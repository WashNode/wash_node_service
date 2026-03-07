import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { ServiceService } from '../services/services.service';
import { DiscountService } from '../discount/discount.service';

@Controller('vendors')
export class VendorsController {
    constructor(
        private readonly vendorService: VendorService,
        private readonly serviceService: ServiceService,
        private readonly discountService: DiscountService,
    ) { }

    @Get()
    async findAll(@Query() query: any) {
        const vendors = await this.vendorService.getAllVendors(query);
        return { success: true, data: vendors, message: 'Vendors list' };
    }

    @Get('default-values')
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
    async create(@Body() vendorData: any) {
        const vendor = await this.vendorService.createVendor(vendorData);
        return { success: true, data: vendor, message: 'Vendor created successfully' };
    }

    @Put()
    async update(@Body() vendorData: any) {
        const vendor = await this.vendorService.updateVendor(vendorData._id, vendorData);
        return { success: true, data: vendor, message: 'Vendor updated successfully' };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const vendor = await this.vendorService.getVendorById(id);
        return { success: true, data: vendor, message: 'Vendor details' };
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.vendorService.deleteVendor(id);
        return { success: true, message: 'Vendor deleted successfully' };
    }
}
