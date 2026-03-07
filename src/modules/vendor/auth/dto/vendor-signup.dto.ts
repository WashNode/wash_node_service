import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class VendorSignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
