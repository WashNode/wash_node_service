import { IsString, IsNotEmpty } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}
