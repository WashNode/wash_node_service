import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepo: AdminRepository) { }

  async createAdmin(userData: Partial<Admin>): Promise<Admin> {
    try {
      return this.adminRepo.create(userData);
    } catch (err: unknown) {
      const error = err as Error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminRepo.findByEmail(email);
  }
}
