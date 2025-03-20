import { Restaurant } from '../entities/restaurant.entity';

export interface IRestaurantRepository {
  createRestaurant(user: Restaurant, userId: number): Promise<Restaurant>;
  verifyExistRegisteredTaxNumber(taxNumber: string, userId: number);
}
