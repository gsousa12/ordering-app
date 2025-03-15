import { User } from 'src/modules/user/domain/entities/user.entity';

export interface IEmployeeRepository {
  createEmployee(user: User): Promise<User>;
}
