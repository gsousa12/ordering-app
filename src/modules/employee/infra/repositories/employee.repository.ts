import { User } from 'src/modules/user/domain/entities/user.entity';
import { IEmployeeRepository } from '../../domain/interfaces/employee.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';
import { UserRoles, UserStatus } from 'src/common/utils/enum';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(user: User): Promise<User> {
    try {
      const existRegisteredEmail = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existRegisteredEmail) {
        throw new BadRequestException('Email already registered');
      }

      const createdUser = await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          status: UserStatus.ACTIVE,
          role: UserRoles.EMPLOYEE,
          createdAt: user.createdAt || new Date(),
        },
      });
      return new User(createdUser);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
