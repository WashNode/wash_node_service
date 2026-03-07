import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorAvailability } from '../schemas/vendor-availability.schema';
import { BaseRepository } from './base.repository';

/**
 * Encapsulates all database interactions for the vendor availability aggregate.
 */
@Injectable()
export class VendorAvailabilityRepository extends BaseRepository<VendorAvailability> {
    constructor(@InjectModel(VendorAvailability.name) private vendorAvailabilityModel: Model<VendorAvailability>) {
        super();
    }

    getModel(): Model<VendorAvailability> {
        return this.vendorAvailabilityModel;
    }
}
