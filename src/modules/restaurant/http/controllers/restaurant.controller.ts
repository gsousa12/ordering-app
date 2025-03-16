import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { UserRoles } from 'src/common/utils/enum';
import { CreateRestaurantRequestDto } from '../../domain/dtos/request/create-restaurant.request.dto';
import { RestaurantMapper } from '../../domain/mappers/restaurant.mapper';
import { RestaurantService } from '../../domain/services/restaurant.service';
import { IsNotEmpty } from 'class-validator';

@Controller('restaurant')
export class RestaurantControler {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role(UserRoles.OWNER)
  async createRestaurant(@Body() createRestaurantDto: CreateRestaurantRequestDto, @Request() req) {
    try {
      const userId: number = req.user.sub;
      if (!userId) throw new BadRequestException('Generic Error');

      const restaurant = await RestaurantMapper.toMapperCreateRestaurant(createRestaurantDto);
      const createdRestaurant = await this.restaurantService.createRestaurant(restaurant, userId);
      const createRestaurantResponse = RestaurantMapper.toMapperResponse(createdRestaurant);
      return createRestaurantResponse;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
