import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schemas/customer.schema';
import { BaseRepository } from './base.repository';

/**
 * Encapsulates all database interactions for the customer aggregate.
 * Keeping Mongoose model usage confined to this layer allows the service
 * to focus purely on business logic and makes the code easier to test.
 */
@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {
    constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {
        super();
    }

    getModel(): Model<Customer> {
        return this.customerModel;
    }
}
