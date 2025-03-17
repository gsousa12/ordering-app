import { User } from 'src/modules/user/domain/entities/user.entity';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../interfaces/employee.interface';
import { EMPLOYEE_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PasswordUtils } from 'src/common/utils/password.utils';
import { UserRestaurantPermissionLevel } from 'src/common/utils/enum';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}
  async createEmployee(
    employee: User,
    userId: number,
    restaurantId: number,
    permissionLevel: UserRestaurantPermissionLevel,
  ): Promise<User> {
    try {
      if (!userId || !restaurantId || !permissionLevel) {
        throw new BadRequestException('Invalid request');
      }
      const verifyUserIsRestaurantOwner = await this.employeeRepository.verifyUserIsRestaurantOwner(
        userId,
        restaurantId,
      );

      if (!verifyUserIsRestaurantOwner) {
        throw new BadRequestException('Você não tem permissão para criar funcionários neste restaurante.');
      }

      const verifyExistRegisteredEmail = await this.employeeRepository.verifyExistRegisteredEmail(
        employee.email,
      );

      if (verifyExistRegisteredEmail) {
        throw new BadRequestException('Email already registered');
      }

      employee.password = await PasswordUtils.hashPassword(employee.password);

      const createEmployee = this.employeeRepository.createEmployee(employee);

      await this.employeeRepository.linkEmployeeToRestaurant(
        (await createEmployee).id,
        restaurantId,
        permissionLevel,
      );

      return createEmployee;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
