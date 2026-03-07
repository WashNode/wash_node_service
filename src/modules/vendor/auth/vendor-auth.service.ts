import {
    Injectable,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Vendor } from '../../../db/schemas/vendor.schema';
import { VendorRepository } from '../../../db/repositories/vendor.repository';
import { NotificationService } from '../../../common/notification/notification.service';
import { WinstonLogger } from '../../../common/logger/winston.logger';
import { VendorSignupDto } from './dto/vendor-signup.dto';
import { VendorLoginDto } from './dto/vendor-login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class VendorAuthService {
    constructor(
        private readonly vendorRepo: VendorRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly notificationService: NotificationService,
        private readonly logger: WinstonLogger,
    ) { }

    async signup(signupDto: VendorSignupDto): Promise<{ accessToken: string }> {
        try {
            // Check if vendor already exists
            const existingVendor = await this.vendorRepo.findOne({ email: signupDto.email });
            if (existingVendor) {
                throw new BadRequestException('Vendor with this email already exists');
            }

            // Create new vendor
            const vendor = await this.vendorRepo.create({
                email: signupDto.email,
                password: signupDto.password,
                termsAndConditionsAccepted: false,
            });

            this.logger.log(`Vendor signed up successfully: ${vendor.email}`, VendorAuthService.name);

            // Generate JWT token
            const accessToken = this.jwtService.sign(
                { id: vendor._id, email: vendor.email },
                { expiresIn: '1h' },
            );

            return { accessToken };
        } catch (err: unknown) {
            const error = err as Error;
            if (error instanceof BadRequestException) {
                throw error;
            }
            this.logger.error(`Signup failed for ${signupDto.email}: ${error.message}`, error.stack, VendorAuthService.name);
            throw new InternalServerErrorException(error.message);
        }
    }

    async login(loginDto: VendorLoginDto): Promise<{ accessToken: string }> {
        try {
            const vendor = await this.vendorRepo.findOne({ email: loginDto.email });

            if (!vendor) {
                throw new NotFoundException('Vendor not found');
            }

            // Compare password - In production, use bcrypt.compare()
            if (vendor.password !== loginDto.password) {
                this.logger.warn(`Invalid password attempt for ${loginDto.email}`, VendorAuthService.name);
                throw new UnauthorizedException('Invalid password');
            }

            this.logger.log(`Vendor logged in successfully: ${vendor.email}`, VendorAuthService.name);

            // Generate JWT token
            const accessToken = this.jwtService.sign(
                { id: vendor._id, email: vendor.email },
                { expiresIn: '1h' },
            );

            return { accessToken };
        } catch (err: unknown) {
            const error = err as Error;
            if (
                error instanceof NotFoundException ||
                error instanceof UnauthorizedException
            ) {
                throw error;
            }
            this.logger.error(`Login failed for ${loginDto.email}: ${error.message}`, error.stack, VendorAuthService.name);
            throw new InternalServerErrorException(error.message);
        }
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
        try {
            const vendor = await this.vendorRepo.findOne({
                email: forgotPasswordDto.email,
            });

            if (!vendor) {
                throw new NotFoundException('Vendor with this email not found');
            }

            // Send password reset email via notification service
            await this.notificationService.sendEmail(
                {
                    to: vendor.email,
                    subject: 'Password Reset Request',
                    template: 'forgot-password',
                    context: {
                        vendorName: vendor.ownerName || vendor.shopName || 'Vendor',
                        resetLink: `${this.configService.get('APP_URL')}/vendor/auth/password/reset/${vendor._id}`,
                    },
                },
            );

            this.logger.log(`Password reset email sent to ${vendor.email}`, VendorAuthService.name);

            return { message: 'Password reset email sent successfully' };
        } catch (err: unknown) {
            const error = err as Error;
            if (error instanceof NotFoundException) {
                throw error;
            }
            this.logger.error(`Forgot password failed for ${forgotPasswordDto.email}: ${error.message}`, error.stack, VendorAuthService.name);
            throw new InternalServerErrorException(error.message);
        }
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        try {
            const vendor = await this.vendorRepo.findById(resetPasswordDto.vendorId);

            if (!vendor) {
                throw new NotFoundException('Vendor not found');
            }

            // Verify current password - In production, use bcrypt.compare()
            if (vendor.password !== resetPasswordDto.currentPassword) {
                this.logger.warn(`Incorrect current password for vendor ${resetPasswordDto.vendorId}`, VendorAuthService.name);
                throw new UnauthorizedException('Current password is incorrect');
            }

            // Update password
            await this.vendorRepo.updateOne(
                { _id: resetPasswordDto.vendorId },
                { password: resetPasswordDto.newPassword }, // In production, hash this with bcrypt
            );

            this.logger.log(`Password reset successfully for vendor ${vendor._id}`, VendorAuthService.name);

            return { message: 'Password reset successfully' };
        } catch (err: unknown) {
            const error = err as Error;
            if (
                error instanceof NotFoundException ||
                error instanceof UnauthorizedException
            ) {
                throw error;
            }
            this.logger.error(`Reset password failed for vendor ${resetPasswordDto.vendorId}: ${error.message}`, error.stack, VendorAuthService.name);
            throw new InternalServerErrorException(error.message);
        }
    }
}
