import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PasswordUtils } from 'src/common/utils/password.utils';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { IAuthRepository } from '../interfaces/auth.interface';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { LoginResponseDto } from '../dtos/response/login.response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
  ) {}

  async create(user: User): Promise<User> {
    try {
      user.password = await PasswordUtils.hashPassword(user.password);
      const createUser = await this.authRepository.signup(user);
      return createUser;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginRequestDto.email, loginRequestDto.password);

    if (!user) {
      throw new BadRequestException('Invalid password invalid');
    }

    const payload = { sub: user.id, email: user.email, role: user.role, status: user.status };

    return {
      access_token: '',
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && isValidPassword) {
      return user;
    }

    return null;
  }
}
