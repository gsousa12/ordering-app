import {
  IsEmail,
  isEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRestaurantPermissionLevel } from 'src/common/utils/enum';

export class CreateEmployeeRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRestaurantPermissionLevel)
  permissionLevel: UserRestaurantPermissionLevel;

  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;
}
