import { IsNotEmpty } from 'class-validator';

export class CreateRestaurantRequestDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  UF: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  taxNumber: string;
}
