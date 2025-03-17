import { UserRoles, UserStatus } from 'src/common/utils/enum';

export class User {
  constructor(data?: Partial<User>) {
    Object.assign(this, {
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      ...data,
    });
  }

  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
