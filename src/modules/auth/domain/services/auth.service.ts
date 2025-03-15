import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PasswordUtils } from 'src/common/utils/password.utils';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { IAuthRepository } from '../interfaces/auth.interface';

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
}
