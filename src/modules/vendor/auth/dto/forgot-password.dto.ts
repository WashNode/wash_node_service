import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
    @ApiProperty({ description: 'Vendor email address', example: 'vendor@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
