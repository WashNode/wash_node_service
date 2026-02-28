import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginDto) {
    const admin = await this.adminService.findAdminByEmail(payload.email);
    if (!admin || admin.password !== payload.password) {
      return { success: false, message: 'Invalid credentials!' };
    }
    const token = this.jwtService.sign({ email: admin.email, sub: admin._id });
    return {
      success: true,
      data: { bearerToken: token },
      message: 'Login Successful!',
    };
  }

  @Post('register-user')
  async register(@Body() payload: RegisterDto) {
    const admin = await this.adminService.createAdmin({
      email: payload.email,
      userName: payload.userName,
      password: this.configService.get<string>('DEFAULT_ADMIN_PASSWORD'),
    });
    return { success: true, data: admin, message: 'Admin registered successfully!' };
  }
}
