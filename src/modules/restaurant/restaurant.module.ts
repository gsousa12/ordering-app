import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/modules/prisma-module/prisma.module';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';
import { RestaurantControler } from './http/controllers/restaurant.controller';
import { RestaurantService } from './domain/services/restaurant.service';
import { RESTAURANT_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { RestaurantRepository } from './infra/repositories/restaurant.repository';

@Module({
  imports: [PrismaModule],
  controllers: [RestaurantControler],
  providers: [
    PrismaService,
    RestaurantService,
    {
      provide: RESTAURANT_REPOSITORY,
      useClass: RestaurantRepository,
    },
  ],
})
export class RestaurantModule {}
