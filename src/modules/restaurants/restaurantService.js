import Restaurants from './restaurantModel.js';

export class RestaurantsServices {
  async createRestaurant(data) {
    return await Restaurants.create(data);
  }

  async findAllResaurants() {
    return await Restaurants.findAll();
  }

  async findOneRestaurant(id, restaurantId) {
    return await Restaurants.findOne({
      where: {
        id: restaurantId || id,
        status: 'active',
      },
    });
  }

  async updateRestaurant(restaurant, data) {
    return await restaurant.update(data);
  }

  async deleteRestaurant(restaurant) {
    return await restaurant.update({ status: 'disabled' });
  }

  // especial routes
  async findOneRestaurantsReview(id, restaurantId) {
    return await Restaurants.findOne({
      where: {
        id: restaurantId || id,
        status: 'active',
      },
    });
  }
}
