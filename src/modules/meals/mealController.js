import { AppError, catAsync } from '../../errors/index.js';
import {
  validateMealsSchema,
  validatePartialMealSchema,
} from './mealSchema.js';
import { MealsServices } from './mealService.js';

const mealsServices = new MealsServices();

export const mealCreate = catAsync(async (req, res) => {
  const { hasError, errorMessage, mealData } = validateMealsSchema(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const meal = await mealsServices.createMeals(mealData);
  return res.json(meal);
});

export const mealsFindAll = catAsync(async (req, res) => {
  const meals = await mealsServices.findAllMeals();
  return res.json(meals);
});

export const mealFindAllWithRestaurants = catAsync(async (req, res) => {
  const mealsAndRestaurants = await mealsServices.findAllWitnRestaurants();
  return res.json(mealsAndRestaurants);
});

export const mealFindOne = catAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await mealsServices.findOneMeal(id);

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`, 404));
  }

  return res.json(meal);
});

export const mealUpdate = catAsync(async (req, res, next) => {
  const { hasError, errorMessage, mealData } = validatePartialMealSchema(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { id } = req.params;
  const meal = await mealsServices.findOneMeal(id);

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} no found`));
  }

  const mealUp = await mealsServices.updateMeal(meal, mealData);
  return res.json(mealUp);
});

export const mealDelete = catAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await mealsServices.findOneMeal(id);

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} no found`, 404));
  }

  await mealsServices.deleteMeal(meal);
  return res.status(204).json(null);
});
