import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PasswordUtils } from 'src/common/utils/password.utils';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { IAuthRepository } from '../interfaces/auth.interface';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { LoginResponseDto } from '../dtos/response/login.response.dto';
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

    const payload = { sub: user.id, email: user.email, role: user.role, status: user.status };

    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    const implementsCookies = this.implementsCookies(access_token, refresh_token, res);

    if (!implementsCookies) {
      throw new BadRequestException('Generic Error');
    }

    return { message: 'Login successful' };
  }

  async logout(res: Response) {
    const clearCookies = this.clearCookies(res);

    if (!clearCookies) {
      throw new BadRequestException('Generic Error');
    }

    return { message: 'Logout successful' };
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

  async implementsCookies(access_token: string, refresh_token: string, res: Response) {
    res.cookie('access_token', access_token, {
      httpOnly: true, // Impede acesso via JavaScript
      secure: AppConfig.node_env === 'production', // Usar HTTPS em produção
      sameSite: 'strict',
      maxAge: AppConfig.access_token_age, // 1 hora
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: AppConfig.node_env === 'production',
      sameSite: 'strict',
      maxAge: AppConfig.refresh_token_age, // 7 dias
    });
  }

  async clearCookies(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: AppConfig.node_env === 'production',
      sameSite: 'strict',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: AppConfig.node_env === 'production',
      sameSite: 'strict',
    });
  }
}
