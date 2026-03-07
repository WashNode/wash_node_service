import { IsString, IsNotEmpty } from 'class-validator';
import { CreateDiscountDto } from './create-discount.dto';

export class UpdateDiscountDto extends CreateDiscountDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}
