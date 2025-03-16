import { RESTAURANT_REPOSITORY } from 'src/common/tokens/repositories.tokens';
import { IRestaurantRepository } from '../interface/restaurant.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import { Restaurant } from '../entities/restaurant.entity';

export class RestaurantService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: IRestaurantRepository,
  ) {}

  async createRestaurant(restaurant: Restaurant, userId: number): Promise<Restaurant> {
    try {
      const createRestaurant = this.restaurantRepository.createRestaurant(restaurant, userId);
      return createRestaurant;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
