import Meals from './mealModel.js';
import { Op } from 'sequelize';
import Restaurants from '../restaurants/restaurantModel.js';

export class MealsServices {
  async createMeals(data) {
    return await Meals.create(data);
  }

  async findAllMeals() {
    return await Meals.findAll();
  }

  async findOneMeal(id) {
    return await Meals.findOne({
      where: {
        id,
        status: { [Op.in]: ['active'] },
      },
      include: [
        {
          model: Restaurants,
        },
      ],
    });
  }

  async updateMeal(meal, data) {
    return await meal.update(data);
  }

  async deleteMeal(meal) {
    return await meal.update({ status: 'disabled' });
  }

  async findAllWitnRestaurants() {
    return await Meals.findAll({
      where: {
        status: { [Op.notIn]: ['disabled'] },
      },
      include: [
        {
          model: Restaurants,
        },
      ],
    });
  }
}
