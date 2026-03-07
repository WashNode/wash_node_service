import { IsMongoId, IsNotEmpty, IsOptional, IsArray, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVendorAvailabilityDto {
    @ApiProperty({ description: 'Date for availability', example: '2023-12-01' })
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({ description: 'Booked slots', required: false, type: [Object] })
    @IsArray()
    @IsOptional()
    booked?: any[];

    @ApiProperty({ description: 'Blocked slots', required: false, type: [Object] })
    @IsArray()
    @IsOptional()
    blocked?: any[];
}
