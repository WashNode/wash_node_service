import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WinstonLogger } from '../../../common/logger/winston.logger';
import { VendorRepository } from '../../../db/repositories/vendor.repository';
import { Vendor } from '../../../db/schemas/vendor.schema';
import { NotificationService } from '../../../common/notification/notification.service';

@Injectable()
export class VendorService {
    constructor(
        private readonly vendorRepository: VendorRepository,
        private readonly notificationService: NotificationService,
        private readonly logger: WinstonLogger,
    ) { }

    async createVendor(vendorData: Partial<Vendor>): Promise<Vendor> {
        try {
            const vendor = await this.vendorRepository.create(vendorData);
            // TODO: Send welcome email/SMS to vendor
            return vendor;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create vendor');
        }
    }

    async updateVendor(id: string, vendorData: Partial<Vendor>): Promise<Vendor> {
        try {
            const vendor = await this.vendorRepository.updateOne({ _id: id }, vendorData);
            if (!vendor) {
                throw new NotFoundException(`Vendor with ID ${id} not found`);
            }
            return vendor;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update vendor');
        }
    }

    async getAllVendors(filterParams: any = {}): Promise<Vendor[]> {
        try {
            return await this.vendorRepository.findAll(filterParams);
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch vendors');
        }
    }

    async getVendorById(id: string): Promise<Vendor> {
        try {
            const vendor = await this.vendorRepository.findById(id);
            if (!vendor) {
                throw new NotFoundException(`Vendor with ID ${id} not found`);
            }
            return vendor;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch vendor');
        }
    }

    async getVendorCount(condition: any = {}): Promise<number> {
        try {
            return await this.vendorRepository.count(condition);
        } catch (error) {
            throw new InternalServerErrorException('Failed to count vendors');
        }
    }

    async deleteVendor(id: string): Promise<void> {
        try {
            await this.vendorRepository.deleteOne({ _id: id });
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete vendor');
        }
    }
}
