import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [UserModule, AuthModule, RestaurantModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
