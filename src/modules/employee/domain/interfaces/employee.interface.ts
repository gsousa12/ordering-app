import { UserRestaurantPermissionLevel } from 'src/common/utils/enum';
import { User } from 'src/modules/user/domain/entities/user.entity';

export interface IEmployeeRepository {
  createEmployee(user: User): Promise<User>;
  verifyUserIsRestaurantOwner(userId: number, restaurantId: number);
  linkEmployeeToRestaurant(
    userId: number,
    restaurantId: number,
    permissionLevel: UserRestaurantPermissionLevel,
  );
  verifyExistRegisteredEmail(email: string);
}
