import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
    @ApiProperty({ description: 'Service name', example: 'Car Wash' })
    @IsString()
    @IsNotEmpty()
    serviceName: string;

    @ApiProperty({ description: 'What the service includes', required: false, example: 'Exterior and interior cleaning' })
    @IsString()
    @IsOptional()
    serviceIncludes?: string;

    @ApiProperty({ description: 'Service price', required: false, example: 50 })
    @IsNumber()
    @IsOptional()
    servicePrice?: number;
}
