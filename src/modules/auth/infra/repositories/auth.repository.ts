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

  async generateRefreshToken(hashRefreshToken: string, expiresAt: Date, userId: number) {
    const refreshToken = await this.prisma.refreshToken.create({
      data: {
        token: hashRefreshToken,
        userId: userId,
        expiresAt: expiresAt,
      },
    });

    return refreshToken;
  }

  async verifyExistRegisteredEMail(email: string) {
    const findUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return findUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async getUserIdByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    const userId = user?.id;
    return userId;
  }

  async verifyHasRefreshTokenByUserId(userId: number) {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: { userId: userId },
    });

    if (refreshToken) {
      await this.prisma.refreshToken.delete({
        where: { id: refreshToken.id },
      });
      return true;
    }
    return false;
  }

  async findRefreshToken(refresh_token: string) {
    const existRefreshToken = await this.prisma.refreshToken.findUnique({
      where: { token: refresh_token },
    });

    if (!existRefreshToken || existRefreshToken.expiresAt < new Date()) {
      return false;
    }

    return true;
  }

  async findUserbyRefreshToken(refresh_token: string) {
    const findUserId = await this.prisma.refreshToken.findUnique({
      where: { token: refresh_token },
      select: { userId: true },
    });

    const userId = findUserId?.userId;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }
}
