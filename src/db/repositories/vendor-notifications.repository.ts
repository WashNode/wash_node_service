import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorNotifications } from '../schemas/vendor-notifications.schema';
import { BaseRepository } from './base.repository';

/**
 * Encapsulates all database interactions for the vendor notifications aggregate.
 */
@Injectable()
export class VendorNotificationsRepository extends BaseRepository<VendorNotifications> {
    constructor(@InjectModel(VendorNotifications.name) private vendorNotificationsModel: Model<VendorNotifications>) {
        super();
    }

    getModel(): Model<VendorNotifications> {
        return this.vendorNotificationsModel;
    }

    async countUnread(vendorId: string): Promise<number> {
        return this.vendorNotificationsModel.countDocuments({
            vendorId,
            isRead: false,
        }).exec();
    }

    async deleteByVendorId(vendorId: string): Promise<any> {
        return this.vendorNotificationsModel.deleteMany({ vendorId }).exec();
    }
}
