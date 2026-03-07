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
                throw new UnauthorizedException('Invalid password');
            }

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

            return { message: 'Password reset email sent successfully' };
        } catch (err: unknown) {
            const error = err as Error;
            if (error instanceof NotFoundException) {
                throw error;
            }
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
                throw new UnauthorizedException('Current password is incorrect');
            }

            // Update password
            await this.vendorRepo.updateOne(
                { _id: resetPasswordDto.vendorId },
                { password: resetPasswordDto.newPassword }, // In production, hash this with bcrypt
            );

            return { message: 'Password reset successfully' };
        } catch (err: unknown) {
            const error = err as Error;
            if (
                error instanceof NotFoundException ||
                error instanceof UnauthorizedException
            ) {
                throw error;
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}
