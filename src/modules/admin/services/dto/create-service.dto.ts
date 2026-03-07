import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    serviceName: string;

    @IsString()
    @IsOptional()
    serviceIncludes?: string;

    @IsNumber()
    @IsOptional()
    servicePrice?: number;
}
