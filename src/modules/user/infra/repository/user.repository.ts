import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRoles, UserStatus } from 'src/common/utils/enum';
import { IUserRepository } from '../../domain/interfaces/user.interface';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signup(user: User): Promise<User> {
    try {
      const existRegisteredMail = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existRegisteredMail) {
        throw new BadRequestException('Email already registered');
      }

      const createdUser = await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          status: UserStatus.ACTIVE,
          role: UserRoles.OWNER,
          createdAt: user.createdAt || new Date(),
        },
      });

      return new User(createdUser);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
