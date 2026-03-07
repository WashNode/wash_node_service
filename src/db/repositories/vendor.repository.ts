import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from '../schemas/vendor.schema';
import { BaseRepository } from './base.repository';

/**
 * Encapsulates all database interactions for the vendor aggregate.
 * Keeping Mongoose model usage confined to this layer allows the service
 * to focus purely on business logic and makes the code easier to test.
 */
@Injectable()
export class VendorRepository extends BaseRepository<Vendor> {
    constructor(@InjectModel(Vendor.name) private vendorModel: Model<Vendor>) {
        super();
    }

    getModel(): Model<Vendor> {
        return this.vendorModel;
    }
}
