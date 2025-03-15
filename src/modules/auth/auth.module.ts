import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AUTH_REPOSITORY, USER_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PrismaModule } from 'src/common/modules/prisma-module/prisma.module';
import { AuthController } from './http/controllers/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';
import { AuthRepository } from './infra/repositories/auth.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
  ],
})
export class AuthModule {}
