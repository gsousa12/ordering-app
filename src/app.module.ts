import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RestaurantModule } from './modules/auth/restaurant.module';

@Module({
  imports: [UserModule, AuthModule, RestaurantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
