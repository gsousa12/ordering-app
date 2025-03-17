import { IsNotEmpty } from 'class-validator';
import { UserRestaurantPermissionLevel } from 'src/common/utils/enum';

export class CreateEmployeeRequestDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  permissionLevel: UserRestaurantPermissionLevel;
  @IsNotEmpty()
  restaurantId: number;
}
