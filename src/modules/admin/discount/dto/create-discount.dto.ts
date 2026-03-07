import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountDto {
    @ApiProperty({ description: 'Discount name', example: 'Summer Sale' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Discount description', example: 'Discount for summer season' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Discount percentage', example: 10 })
    @IsNumber()
    @IsNotEmpty()
    percentage: number;

    @ApiProperty({ description: 'Is discount active', example: true })
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
