import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ServiceRepository } from '../../../db/repositories/service.repository';
import { VendorRepository } from '../../../db/repositories/vendor.repository';
import { CustomerRepository } from '../../../db/repositories/customer.repository';
import { BookingRepository } from '../../../db/repositories/booking.repository';
import moment from 'moment';

@Injectable()
export class DashboardService {
    constructor(
        private readonly serviceRepository: ServiceRepository,
        private readonly vendorRepository: VendorRepository,
        private readonly customerRepository: CustomerRepository,
        private readonly bookingRepository: BookingRepository,
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
            throw new InternalServerErrorException('Failed to fetch dashboard statistics');
        }
    }
}
