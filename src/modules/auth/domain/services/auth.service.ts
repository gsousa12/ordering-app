import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PasswordUtils } from 'src/common/utils/password.utils';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { IUserRepository } from 'src/modules/user/domain/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  async create(user: User): Promise<User> {
    try {
      user.password = await PasswordUtils.hashPassword(user.password);
      const createUser = await this.userRepository.signup(user);
      return createUser;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
