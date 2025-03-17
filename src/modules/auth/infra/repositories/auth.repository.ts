import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { IAuthRepository } from '../../domain/interfaces/auth.interface';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';
import { UserRoles, UserStatus } from 'src/common/utils/enum';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async signup(user: User): Promise<User> {
    try {
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

  async verifyExistRegisteredEMail(email: string) {
    await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
