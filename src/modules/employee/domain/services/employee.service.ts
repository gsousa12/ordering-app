import { User } from 'src/modules/user/domain/entities/user.entity';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../interfaces/employee.interface';
import { EMPLOYEE_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PasswordUtils } from 'src/common/utils/password.utils';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}
  async createEmployee(user: User): Promise<User> {
    try {
      user.password = await PasswordUtils.hashPassword(user.password);
      const createUser = this.employeeRepository.createEmployee(user);
      return createUser;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
