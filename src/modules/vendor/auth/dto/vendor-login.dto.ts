import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VendorLoginDto {
    @ApiProperty({ description: 'Vendor email address', example: 'vendor@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Vendor password', example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
