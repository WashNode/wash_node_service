import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class VendorLoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
