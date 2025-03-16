import { User } from 'src/modules/user/domain/entities/user.entity';

export interface IAuthRepository {
  signup(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
