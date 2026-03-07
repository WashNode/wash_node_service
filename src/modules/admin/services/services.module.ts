import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesController } from './services.controller';
import { ServiceService } from './services.service';
import { ServiceRepository } from '../../../db/repositories/service.repository';
import { Service, ServiceSchema } from '../../../db/schemas/service.schema';
import { LoggerModule } from 'src/common/logger/logger.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Service.name, schema: ServiceSchema },
        ]),
        LoggerModule
    ],
    controllers: [ServicesController],
    providers: [ServiceService, ServiceRepository],
    exports: [ServiceService],
})
export class ServicesModule { }
