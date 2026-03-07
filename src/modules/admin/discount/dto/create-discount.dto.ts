import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateDiscountDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    percentage: number;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
