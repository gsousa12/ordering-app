import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY, USER_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { PrismaModule } from 'src/common/modules/prisma-module/prisma.module';
import { AuthController } from './http/controllers/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { AuthRepository } from './infra/repositories/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepository,
    },
    AuthService,
  ],
})
export class AuthModule {}
