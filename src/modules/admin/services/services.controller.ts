import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ServiceService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@ApiTags('Admin')
@Controller('admin/services')
export class ServicesController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new service' })
    @ApiResponse({ status: 201, description: 'Service created successfully' })
    @ApiBody({ type: CreateServiceDto })
    async create(@Body() createServiceDto: CreateServiceDto) {
        const service = await this.serviceService.createService(createServiceDto);
        return { success: true, data: service, message: 'Service created successfully', statusCode: 202 };
    }

    @Put()
    @ApiOperation({ summary: 'Update an existing service' })
    @ApiResponse({ status: 200, description: 'Service updated successfully' })
    @ApiBody({ type: UpdateServiceDto })
    async update(@Body() updateServiceDto: UpdateServiceDto) {
        const service = await this.serviceService.updateService(updateServiceDto.id, updateServiceDto);
        return { success: true, data: service, message: 'Service updated successfully' };
    }

    @Get()
    @ApiOperation({ summary: 'Retrieve all services with optional filters' })
    @ApiResponse({ status: 200, description: 'List of services' })
    async findAll(@Query() query: any) {
        const services = await this.serviceService.getAllServices(query);
        return { success: true, data: services, message: 'Services list' };
    }

    @Get('count')
    @ApiOperation({ summary: 'Get the count of services with optional filters' })
    @ApiResponse({ status: 200, description: 'Service count retrieved' })
    async getCount(@Query() query: any) {
        const count = await this.serviceService.getServiceCount(query);
        return { success: true, data: { count }, message: 'Service count' };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retrieve service by ID' })
    @ApiResponse({ status: 200, description: 'Service details retrieved successfully' })
    @ApiParam({ name: 'id', description: 'The ID of the service' })
    async findById(@Param('id') id: string) {
        const service = await this.serviceService.getServiceById(id);
        return { success: true, data: service, message: 'Service details' };
    }
}
