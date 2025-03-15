import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { USER_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { UserRepository } from '../user/infra/repository/user.repository';
import { AuthController } from './http/controllers/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    AuthService,
    PrismaService,
  ],
})
export class AuthModule {}
