import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends CreateServiceDto {
    @ApiProperty({ description: 'Service ID', example: '507f1f77bcf86cd799439011' })
    @IsString()
    @IsNotEmpty()
    id: string;
}
