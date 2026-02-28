import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async createAdmin(userData: Partial<Admin>): Promise<Admin> {
    try {
      const existing = await this.adminModel
        .findOne({ email: userData.email })
        .exec();
      if (existing) {
        throw new ConflictException(
          `Admin with email ${userData.email} already exists`,
        );
      }
      const created = new this.adminModel(userData);
      return created.save();
    } catch (err: unknown) {
      const error = err as Error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email }).exec();
  }
}
