import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './schemas/admin.schema';

/**
 * Encapsulates all database interactions for the admin aggregate.
 * Keeping Mongoose model usage confined to this layer allows the service
 * to focus purely on business logic and makes the code easier to test.
 */
@Injectable()
export class AdminRepository {
    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) { }

    async create(userData: Partial<Admin>): Promise<Admin> {
        const existing = await this.adminModel
            .findOne({ email: userData.email })
            .exec();
        if (existing) {
            // we still throw a ConflictException here so that callers can
            // respond appropriately; the service layer may choose to rethrow or
            // translate as needed.
            throw new ConflictException(
                `Admin with email ${userData.email} already exists`,
            );
        }

        const created = new this.adminModel(userData);
        return created.save();
    }

    async findByEmail(email: string): Promise<Admin | null> {
        return this.adminModel.findOne({ email }).exec();
    }
}
