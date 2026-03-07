import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { WinstonLogger } from '../../../common/logger/winston.logger';
import { ServiceRepository } from '../../../db/repositories/service.repository';
import { VendorRepository } from '../../../db/repositories/vendor.repository';
import { CustomerRepository } from '../../../db/repositories/customer.repository';
import { BookingRepository } from '../../../db/repositories/booking.repository';
import * as moment from 'moment';

@Injectable()
export class DashboardService {
    constructor(
        private readonly serviceRepository: ServiceRepository,
        private readonly vendorRepository: VendorRepository,
        private readonly customerRepository: CustomerRepository,
        private readonly bookingRepository: BookingRepository,
        private readonly logger: WinstonLogger,
    ) { }

    async getDashboardStats() {
        try {
            const todayStart = moment().startOf('day').toDate();
            const todayEnd = moment().endOf('day').toDate();

            const [serviceCount, vendorCount, customerCount, newBookings, totalBookings] = await Promise.all([
                this.serviceRepository.count({}),
                this.vendorRepository.count({}),
                this.customerRepository.count({}),
                this.bookingRepository.count({
                    createdAt: {
                        $gte: todayStart,
                        $lte: todayEnd,
                    }
                }),
                this.bookingRepository.count({
                    createdAt: {
                        $lte: todayEnd
                    }
                }),
            ]);

            return {
                vendorCount,
                serviceCount,
                customerCount,
                newBookings,
                totalBookings,
            };
        } catch (error) {
            this.logger.error(`Failed to fetch dashboard statistics: ${(error as Error).message}`, (error as Error).stack, DashboardService.name);
            throw new InternalServerErrorException('Failed to fetch dashboard statistics');
        }
    }
}
