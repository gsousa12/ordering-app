import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateRestaurantRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  UF: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  city: string;

  @IsNotEmpty()
  @IsString()
  @Length(14)
  taxNumber: string;
}
