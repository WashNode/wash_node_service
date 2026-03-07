import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDiscountDto } from './create-discount.dto';

export class UpdateDiscountDto extends CreateDiscountDto {
    @ApiProperty({ description: 'Discount ID', example: '507f1f77bcf86cd799439011' })
    @IsString()
    @IsNotEmpty()
    id: string;
}
