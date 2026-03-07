import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@ApiTags('Admin')
@Controller('admin/discount')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new discount' })
    @ApiResponse({ status: 201, description: 'Discount created successfully' })
    @ApiBody({ type: CreateDiscountDto })
    async create(@Body() createDiscountDto: CreateDiscountDto) {
        const discount = await this.discountService.createNewDiscount(createDiscountDto);
        return { success: true, data: discount, message: 'Discount created successfully' };
    }

    @Put()
    @ApiOperation({ summary: 'Update an existing discount' })
    @ApiResponse({ status: 200, description: 'Discount updated successfully' })
    @ApiBody({ type: UpdateDiscountDto })
    async update(@Body() updateDiscountDto: UpdateDiscountDto) {
        const discount = await this.discountService.updateDiscount(updateDiscountDto.id, updateDiscountDto);
        return { success: true, data: discount, message: 'Discount updated successfully' };
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all discounts' })
    @ApiResponse({ status: 200, description: 'List of all discounts' })
    async findAll() {
        const discounts = await this.discountService.getAllDiscounts();
        return { success: true, data: discounts, message: 'Discounts list' };
    }

    @Get('active')
    @ApiOperation({ summary: 'Retrieve all active discounts' })
    @ApiResponse({ status: 200, description: 'List of active discounts' })
    async findAllActive() {
        const discounts = await this.discountService.getAllActiveDiscounts();
        return { success: true, data: discounts, message: 'Active discounts list' };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve discount by ID' })
    @ApiResponse({ status: 200, description: 'Discount details retrieved successfully' })
    @ApiParam({ name: 'id', description: 'The ID of the discount' })
    async findById(@Param('id') id: string) {
        const discount = await this.discountService.getDiscountById(id);
        return { success: true, data: discount, message: 'Discount details' };
    }
}
