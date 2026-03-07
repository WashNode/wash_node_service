import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../schemas/service.schema';
import { BaseRepository } from './base.repository';

/**
 * Encapsulates all database interactions for the service aggregate.
 * Keeping Mongoose model usage confined to this layer allows the service
 * to focus purely on business logic and makes the code easier to test.
 */
@Injectable()
export class ServiceRepository extends BaseRepository<Service> {
    constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) {
        super();
    }

    getModel(): Model<Service> {
        return this.serviceModel;
    }
}
