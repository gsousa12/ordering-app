import { User } from 'src/modules/user/domain/entities/user.entity';
import { LoginRequestDto } from '../dtos/request/login.request.dto';
import { LoginResponseDto } from '../dtos/response/login.response.dto';
import { Response } from 'express';

export interface IAuthRepository {
  signup(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | null>;
  verifyExistRegisteredEMail(email: string);
}
