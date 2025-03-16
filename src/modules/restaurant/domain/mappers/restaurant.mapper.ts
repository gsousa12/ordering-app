import { CreateRestaurantRequestDto } from '../dtos/request/create-restaurant.request.dto';
import { CreateRestaurantResponseDto } from '../dtos/response/create-restaurant.response';
import { Restaurant } from '../entities/restaurant.entity';

export class RestaurantMapper {
  static async toMapperCreateRestaurant(
    createRestaurantRequestDto: CreateRestaurantRequestDto,
  ): Promise<Restaurant> {
    const restaurant = new Restaurant();
    restaurant.name = createRestaurantRequestDto.name;
    restaurant.UF = createRestaurantRequestDto.UF;
    restaurant.city = createRestaurantRequestDto.city;
    restaurant.taxNumber = createRestaurantRequestDto.taxNumber;
    return restaurant;
  }

  static async toMapperResponse(restaurant: Restaurant): Promise<CreateRestaurantResponseDto> {
    const createRestaurantResponseDto = new CreateRestaurantResponseDto();
    createRestaurantResponseDto.name = restaurant.name;
    createRestaurantResponseDto.createdAt = restaurant.createdAt;
    return createRestaurantResponseDto;
  }
}
