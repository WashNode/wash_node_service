import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingListDto {
    @ApiProperty({ description: 'Request to vendor ID', required: false, example: '507f1f77bcf86cd799439011' })
    @IsString()
    @IsOptional()
    requestTo?: string;
    @ApiProperty({ description: 'Request by customer ID', required: false, example: '507f1f77bcf86cd799439012' })
    @IsString()
    @IsOptional()
    requestBy?: string;
}
