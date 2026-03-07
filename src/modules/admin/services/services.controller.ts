import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ServiceService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post()
    async create(@Body() createServiceDto: CreateServiceDto) {
        const service = await this.serviceService.createService(createServiceDto);
        return { success: true, data: service, message: 'Service created successfully', statusCode: 202 };
    }

    @Put()
    async update(@Body() updateServiceDto: UpdateServiceDto) {
        const service = await this.serviceService.updateService(updateServiceDto.id, updateServiceDto);
        return { success: true, data: service, message: 'Service updated successfully' };
    }

    @Get()
    async findAll(@Query() query: any) {
        const services = await this.serviceService.getAllServices(query);
        return { success: true, data: services, message: 'Services list' };
    }

    @Get('count')
    async getCount(@Query() query: any) {
        const count = await this.serviceService.getServiceCount(query);
        return { success: true, data: { count }, message: 'Service count' };
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const service = await this.serviceService.getServiceById(id);
        return { success: true, data: service, message: 'Service details' };
    }
}
