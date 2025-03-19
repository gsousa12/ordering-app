import { User } from 'src/modules/user/domain/entities/user.entity';

export interface IAuthRepository {
  signup(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | null>;
  verifyExistRegisteredEMail(email: string);
  getUserIdByEmail(email: string);
  generateRefreshToken(refresh_token: string, expiresAt: Date, userId: number);
  verifyHasRefreshTokenByUserId(userId: number);
  findRefreshToken(refresh_token: string);
  findUserbyRefreshToken(refresh_token: string);
}
