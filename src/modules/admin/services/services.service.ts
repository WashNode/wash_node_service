import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { WinstonLogger } from '../../../common/logger/winston.logger';
import { ServiceRepository } from '../../../db/repositories/service.repository';
import { Service } from '../../../db/schemas/service.schema';

@Injectable()
export class ServiceService {
    constructor(private readonly serviceRepository: ServiceRepository, private readonly logger: WinstonLogger) { }

    async createService(serviceData: Partial<Service>): Promise<Service> {
        try {
            return await this.serviceRepository.create(serviceData);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create service');
        }
    }

    async updateService(id: string, serviceData: Partial<Service>): Promise<Service> {
        try {
            const service = await this.serviceRepository.updateOne({ _id: id }, serviceData);
            if (!service) {
                throw new NotFoundException(`Service with ID ${id} not found`);
            }
            return service;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update service');
        }
    }

    async getAllServices(filterParams: any = {}): Promise<Service[]> {
        try {
            const services = await this.serviceRepository.findAll(filterParams);
            // Return services sorted by creation time (handled by database if needed)
            return services;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch services');
        }
    }

    async getServiceById(id: string): Promise<Service> {
        try {
            const service = await this.serviceRepository.findById(id);
            if (!service) {
                throw new NotFoundException(`Service with ID ${id} not found`);
            }
            return service;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch service');
        }
    }

    async getServiceCount(condition: any = {}): Promise<number> {
        try {
            return await this.serviceRepository.count(condition);
        } catch (error) {
            throw new InternalServerErrorException('Failed to count services');
        }
    }
}
