import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/modules/prisma-module/prisma.module';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class RestaurantModule {}
