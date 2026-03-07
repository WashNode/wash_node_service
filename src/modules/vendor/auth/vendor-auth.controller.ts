import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Param,
} from '@nestjs/common';
import { VendorAuthService } from './vendor-auth.service';
import { VendorSignupDto } from './dto/vendor-signup.dto';
import { VendorLoginDto } from './dto/vendor-login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class VendorAuthController {
    constructor(private readonly authService: VendorAuthService) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() signupDto: VendorSignupDto) {
        const result = await this.authService.signup(signupDto);
        return {
            success: true,
            data: result,
            message: 'Vendor registered successfully!',
        };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: VendorLoginDto) {
        const result = await this.authService.login(loginDto);
        return {
            success: true,
            data: result,
            message: 'Login successful!',
        };
    }

    @Post('password/forgot')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        const result = await this.authService.forgotPassword(forgotPasswordDto);
        return {
            success: true,
            data: result,
            message: result.message,
        };
    }

    @Post('password/reset/:vendorId')
    @HttpCode(HttpStatus.OK)
    async resetPassword(
        @Param('vendorId') vendorId: string,
        @Body() passwordDto: Omit<ResetPasswordDto, 'vendorId'>,
    ) {
        const resetPasswordDto: ResetPasswordDto = {
            ...passwordDto,
            vendorId,
        };
        const result = await this.authService.resetPassword(resetPasswordDto);
        return {
            success: true,
            data: result,
            message: result.message,
        };
    }
}
