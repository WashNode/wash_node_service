import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { VendorAuthService } from './vendor-auth.service';
import { VendorSignupDto } from './dto/vendor-signup.dto';
import { VendorLoginDto } from './dto/vendor-login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Vendor')
@Controller('vendor/auth')
export class VendorAuthController {
    constructor(private readonly authService: VendorAuthService) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Vendor signup' })
    @ApiResponse({ status: 201, description: 'Vendor registered successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: VendorSignupDto })
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
    @ApiOperation({ summary: 'Vendor login' })
    @ApiResponse({ status: 200, description: 'Login successful' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiBody({ type: VendorLoginDto })
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
    @ApiOperation({ summary: 'Forgot password' })
    @ApiResponse({ status: 200, description: 'Password reset email sent' })
    @ApiResponse({ status: 404, description: 'Vendor not found' })
    @ApiBody({ type: ForgotPasswordDto })
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
    @ApiOperation({ summary: 'Reset password' })
    @ApiResponse({ status: 200, description: 'Password reset successfully' })
    @ApiResponse({ status: 401, description: 'Invalid current password' })
    @ApiResponse({ status: 404, description: 'Vendor not found' })
    @ApiParam({ name: 'vendorId', description: 'Vendor ID' })
    @ApiBody({ type: ResetPasswordDto })
    async resetPassword(
        @Param('vendorId') vendorId: string,
        @Body() passwordDto: ResetPasswordDto,
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
