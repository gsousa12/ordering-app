import { User } from '../entities/user.entity';

export interface IUserRepository {
  signup(user: User): Promise<User>;
}
