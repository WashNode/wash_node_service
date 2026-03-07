import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('discounts')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) { }

    @Post()
    async create(@Body() createDiscountDto: CreateDiscountDto) {
        const discount = await this.discountService.createNewDiscount(createDiscountDto);
        return { success: true, data: discount, message: 'Discount created successfully' };
    }

    @Put()
    async update(@Body() updateDiscountDto: UpdateDiscountDto) {
        const discount = await this.discountService.updateDiscount(updateDiscountDto.id, updateDiscountDto);
        return { success: true, data: discount, message: 'Discount updated successfully' };
    }

    @Get()
    async findAll() {
        const discounts = await this.discountService.getAllDiscounts();
        return { success: true, data: discounts, message: 'Discounts list' };
    }

    @Get('active')
    async findAllActive() {
        const discounts = await this.discountService.getAllActiveDiscounts();
        return { success: true, data: discounts, message: 'Active discounts list' };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const discount = await this.discountService.getDiscountById(id);
        return { success: true, data: discount, message: 'Discount details' };
    }
}
