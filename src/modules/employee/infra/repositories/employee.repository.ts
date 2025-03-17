import { User } from 'src/modules/user/domain/entities/user.entity';
import { IEmployeeRepository } from '../../domain/interfaces/employee.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';
import { UserRestaurantPermissionLevel, UserRoles, UserStatus } from 'src/common/utils/enum';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(employee: User): Promise<User> {
    try {
      const createdEmployee = await this.prisma.user.create({
        data: {
          name: employee.name,
          email: employee.email,
          password: employee.password,
          status: UserStatus.ACTIVE,
          role: UserRoles.EMPLOYEE,
          createdAt: employee.createdAt || new Date(),
        },
      });
      return new User(createdEmployee);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async verifyExistRegisteredEmail(email: string) {
    const existRegisteredEmail = await this.prisma.user.findUnique({
      where: { email: email },
    });

    return existRegisteredEmail;
  }

  async verifyUserIsRestaurantOwner(userId: number, restaurantId: number) {
    const verifyUserIsRestaurantOwner = this.prisma.userRestaurant.findUnique({
      where: {
        userId_restaurantId: {
          userId: userId,
          restaurantId: restaurantId,
        },
        permissionLevel: UserRestaurantPermissionLevel.ADMIN,
      },
    });

    return verifyUserIsRestaurantOwner;
  }

  async linkEmployeeToRestaurant(
    employeeId: number,
    restaurantId: number,
    permissionLevel: UserRestaurantPermissionLevel,
  ) {
    return this.prisma.userRestaurant.create({
      data: {
        userId: employeeId,
        restaurantId: restaurantId,
        permissionLevel: permissionLevel,
      },
    });
  }
}
