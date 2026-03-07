import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Admin email address', example: 'admin@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Admin password', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
