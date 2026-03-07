import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { VendorAvailability } from '../../../db/schemas/vendor-availability.schema';
import { VendorAvailabilityRepository } from '../../../db/repositories/vendor-availability.repository';
import { UpdateVendorAvailabilityDto } from './dto/update-vendor-availability.dto';

@Injectable()
export class VendorAvailabilityService {
    constructor(
        private readonly availabilityRepo: VendorAvailabilityRepository,
    ) { }

    async getAvailability(vendorId: string): Promise<VendorAvailability[]> {
        try {
            const availability = await this.availabilityRepo.findAll({
                vendorId,
            });

            if (!availability || availability.length === 0) {
                throw new NotFoundException(
                    'No availability found for this vendor',
                );
            }

            return availability;
        } catch (err: unknown) {
            const error = err as Error;
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async updateAvailability(
        vendorId: string,
        availabilityDto: UpdateVendorAvailabilityDto,
    ): Promise<VendorAvailability> {
        try {
            const updatedAvailability = await this.availabilityRepo.updateOne(
                { vendorId, date: new Date(availabilityDto.date) },
                {
                    date: new Date(availabilityDto.date),
                    booked: availabilityDto.booked || [],
                    blocked: availabilityDto.blocked || [],
                    vendorId,
                },
            );

            if (!updatedAvailability) {
                throw new NotFoundException('Availability record not found');
            }

            return updatedAvailability;
        } catch (err: unknown) {
            const error = err as Error;
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}
