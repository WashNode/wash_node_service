import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discount } from '../schemas/discount.schema';
import { BaseRepository } from './base.repository';

/**
 * Encapsulates all database interactions for the discount aggregate.
 * Keeping Mongoose model usage confined to this layer allows the service
 * to focus purely on business logic and makes the code easier to test.
 */
@Injectable()
export class DiscountRepository extends BaseRepository<Discount> {
    constructor(@InjectModel(Discount.name) private discountModel: Model<Discount>) {
        super();
    }

    getModel(): Model<Discount> {
        return this.discountModel;
    }

    async findAllActive(): Promise<Discount[]> {
        return this.discountModel.find({ isActive: true }).exec();
    }
}
