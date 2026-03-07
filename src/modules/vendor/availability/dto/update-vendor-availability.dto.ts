import { IsMongoId, IsNotEmpty, IsOptional, IsArray, IsDateString } from 'class-validator';

export class UpdateVendorAvailabilityDto {
    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsArray()
    @IsOptional()
    booked?: any[];

    @IsArray()
    @IsOptional()
    blocked?: any[];
}
