import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Admin } from '../../../db/schemas/admin.schema';
import { AdminRepository } from '../../../db/repositories/admin.repository';
import { WinstonLogger } from '../../../common/logger/winston.logger';

@Injectable()
export class AuthService {

  constructor(private readonly adminRepo: AdminRepository, private readonly logger: WinstonLogger) { }

  async createAdmin(userData: Partial<Admin>): Promise<Admin> {
    try {
      const admin = await this.adminRepo.create(userData);
      this.logger.log(`Admin created successfully: ${userData.email || 'unknown'}`, AuthService.name);
      return admin;
    } catch (err: unknown) {
      const error = err as Error;
      this.logger.error(`Failed to create admin: ${error.message}`, error.stack, AuthService.name);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminRepo.findByEmail(email);
  }
}
