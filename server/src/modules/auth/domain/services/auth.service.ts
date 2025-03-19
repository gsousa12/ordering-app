import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PasswordUtils } from 'src/common/utils/password.utils';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { IAuthRepository } from '../interfaces/auth.interface';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AppConfig } from 'src/config/app.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(ownerUser: User): Promise<User> {
    try {
      const existRegisteredEMail = await this.authRepository.verifyExistRegisteredEMail(ownerUser.email);

      if (existRegisteredEMail) {
        throw new BadRequestException('Email already registered');
      }

      ownerUser.password = await PasswordUtils.hashPassword(ownerUser.password);
      const createOwnerUser = await this.authRepository.signup(ownerUser);
      return createOwnerUser;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(loginRequestDto: LoginRequestDto, res: Response) {
    const user = await this.validateUser(loginRequestDto.email, loginRequestDto.password);

    if (!user) {
      throw new BadRequestException('Invalid invalid');
    }

    const payload = { sub: user.id, role: user.role };

    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });

    const userId = await this.authRepository.getUserIdByEmail(loginRequestDto.email);

    if (!userId) {
      throw new BadRequestException('Usuário não encontrado');
    }

    const implementsCookies = this.implementsCookies(access_token, res);

    if (!implementsCookies) {
      throw new BadRequestException('Generic Error');
    }

    const refreshToken = this.generateRefreshToken(userId);

    return refreshToken;
  }

  async logout(res: Response) {
    const clearCookies = this.clearCookies(res);

    if (!clearCookies) {
      throw new BadRequestException('Generic Error');
    }

    return { message: 'Logout successful' };
  }

  async validateRefreshToken(refresh_token: string, res: Response) {
    const refreshToken = await this.authRepository.findRefreshToken(refresh_token);

    if (!refreshToken) {
      throw new BadRequestException('Refresh token inválido ou expirado. Por favor, faça login novamente.');
    }

    const user = await this.authRepository.findUserbyRefreshToken(refresh_token);

    if (!user) {
      throw new BadRequestException('Não existe um usuário atrelado');
    }

    const payload = { sub: user.id, role: user.role };

    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });

    const implementsCookies = this.implementsCookies(access_token, res);

    if (!implementsCookies) {
      throw new BadRequestException('Generic Error');
    }

    return { message: 'Novo token de acesso gerado' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const existRegisteredEMail = await this.authRepository.verifyExistRegisteredEMail(email);

    if (!existRegisteredEMail) {
      throw new BadRequestException('There is no user registered with this email.');
    }

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    if (user && isValidPassword) {
      return user;
    }

    return null;
  }

  async implementsCookies(access_token: string, res: Response) {
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: AppConfig.node_env === 'production',
      sameSite: 'strict',
      maxAge: AppConfig.access_token_age,
    });
  }

  async generateRefreshToken(userId: number) {
    const expiresAt = AppConfig.refresh_token_age;
    const refresh_token = crypto.randomUUID();

    await this.authRepository.verifyHasRefreshTokenByUserId(userId);

    const generateRefreshToken = await this.authRepository.generateRefreshToken(
      refresh_token,
      expiresAt,
      userId,
    );

    if (!generateRefreshToken) {
      throw new BadRequestException('Error ao gerar o refresh token');
    }

    return refresh_token;
  }

  async clearCookies(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: AppConfig.node_env === 'production',
      sameSite: 'strict',
    });
  }
}
