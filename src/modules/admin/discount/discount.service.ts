import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WinstonLogger } from '../../../common/logger/winston.logger';
import { DiscountRepository } from '../../../db/repositories/discount.repository';
import { Discount } from '../../../db/schemas/discount.schema';

@Injectable()
export class DiscountService {
    constructor(private readonly discountRepository: DiscountRepository, private readonly logger: WinstonLogger) { }

    async createNewDiscount(discountData: Partial<Discount>): Promise<Discount> {
        try {
            return await this.discountRepository.create(discountData);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create discount');
        }
    }

    async updateDiscount(id: string, discountData: Partial<Discount>): Promise<Discount> {
        try {
            const discount = await this.discountRepository.updateOne({ _id: id }, discountData);
            if (!discount) {
                throw new NotFoundException(`Discount with ID ${id} not found`);
            }
            return discount;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update discount');
        }
    }

    async getAllDiscounts(): Promise<Discount[]> {
        try {
            return await this.discountRepository.findAll();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch discounts');
        }
    }

    async getAllActiveDiscounts(): Promise<Discount[]> {
        try {
            return await this.discountRepository.findAllActive();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch active discounts');
        }
    }

    async getDiscountById(id: string): Promise<Discount> {
        try {
            const discount = await this.discountRepository.findById(id);
            if (!discount) {
                throw new NotFoundException(`Discount with ID ${id} not found`);
            }
            return discount;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch discount');
        }
    }
}
