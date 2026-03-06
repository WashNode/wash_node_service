import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminRepository } from '../../../db/repositories/admin.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Admin, AdminSchema } from '../../../db/schemas/admin.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    ],
    controllers: [AuthController],
    providers: [AuthService, AdminRepository],
    exports: [AuthService, AdminRepository],
})
export class AuthModule { }
