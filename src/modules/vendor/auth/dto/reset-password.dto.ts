import { IsString, IsNotEmpty, MinLength, IsMongoId } from 'class-validator';

export class ResetPasswordDto {
    @IsMongoId()
    @IsNotEmpty()
    vendorId: string;

    @IsString()
    @IsNotEmpty()
    currentPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}
