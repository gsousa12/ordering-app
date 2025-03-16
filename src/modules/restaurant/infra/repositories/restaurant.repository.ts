import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { IRestaurantRepository } from '../../domain/interface/restaurant.interface';
import { PrismaService } from 'src/common/modules/prisma-module/prisma.service';
import { Restaurant } from '../../domain/entities/restaurant.entity';
import { UserRestaurantPermissionLevel } from 'src/common/utils/enum';

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRestaurant(restaurant: Restaurant, userId: number): Promise<Restaurant> {
    try {
      const existRegisteredTaxNumber = await this.prisma.restaurant.findMany({
        where: {
          taxNumber: restaurant.taxNumber,
          users: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          users: true,
        },
      });

      if (existRegisteredTaxNumber.length) {
        throw new BadRequestException('TaxNumber already registered for this user');
      }

      const createdRestaurant = await this.prisma.restaurant.create({
        data: {
          name: restaurant.name,
          UF: restaurant.UF,
          city: restaurant.city,
          taxNumber: restaurant.taxNumber,
          createdAt: restaurant.createdAt || new Date(),
        },
      });

      await this.prisma.userRestaurant.create({
        data: {
          userId: userId,
          restaurantId: createdRestaurant.id,
          permissionLevel: UserRestaurantPermissionLevel.ADMIN,
          createdAt: restaurant.createdAt || new Date(),
        },
      });

      return new Restaurant(createdRestaurant);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
