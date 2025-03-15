import { Module } from '@nestjs/common';
import { UserService } from './domain/services/user.service';
import { UserController } from './http/controller/user.controller';
import { USER_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { UserRepository } from './infra/repository/user.repository';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';
import { PrismaModule } from 'src/common/modules/prisma-module/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    UserService,
    PrismaService,
  ],
})
export class UserModule {}
