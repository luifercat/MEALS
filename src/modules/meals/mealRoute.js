import { Router } from 'express';

import {
  mealCreate,
  mealsFindAll,
  mealFindOne,
  mealUpdate,
  mealDelete,
  mealFindAllWithRestaurants,
} from './mealController.js';
import { restrictTo } from '../users/userMiddleware.js';
import { validateExistMeal } from './mealMiddleware.js';

export const router = Router();

//router.route('/').post(restrictTo('admin'), mealCreate).get(mealsFindAll);
router
  .route('/')
  .post(restrictTo('admin'), mealCreate)
  .get(mealFindAllWithRestaurants);

router
  .route('/:id')
  .get(mealFindOne)
  .patch(validateExistMeal, restrictTo('admin'), mealUpdate)
  .delete(restrictTo('admin'), mealDelete);
