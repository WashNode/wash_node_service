import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorServices } from '../schemas/vendor-services.schema';
import { BaseRepository } from './base.repository';

/**
 * Encapsulates all database interactions for the vendor services aggregate.
 */
@Injectable()
export class VendorServicesRepository extends BaseRepository<VendorServices> {
    constructor(@InjectModel(VendorServices.name) private vendorServicesModel: Model<VendorServices>) {
        super();
    }

    getModel(): Model<VendorServices> {
        return this.vendorServicesModel;
    }
}
