import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BookingListDto {
    @IsString()
    @IsOptional()
    requestTo?: string;
    @IsString()
    @IsOptional()
    requestBy?: string;
}
