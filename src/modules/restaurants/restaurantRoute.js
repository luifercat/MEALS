import { Router } from 'express';
import {
  restaurantCreate,
  restaurantsFindAll,
  restaurantFindOne,
  restaurantUpdate,
  restaurantDelete,
  createReviewToRestaurant,
  updateReview,
  deleteReview,
} from './restaurantController.js';
import { validExistRestaurant } from './restaurantMiddleware.js';
import { validExistReview } from '../reviews/reviewMiddleware.js';
import { protectAccount, restrictTo } from '../users/userMiddleware.js';

export const router = Router();

router
  .route('/')
  .post(restrictTo('admin'), restaurantCreate)
  .get(restaurantsFindAll);

router
  .route('/:id')
  .get(restaurantFindOne)
  .patch(restaurantUpdate)
  .delete(restaurantDelete);

router.post(
  '/reviews/:id',
  validExistRestaurant,
  restrictTo('admin'),
  createReviewToRestaurant
);

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validExistRestaurant,
    validExistReview,
    restrictTo('admin'),
    protectAccount,
    updateReview
  )
  .delete(
    validExistRestaurant,
    validExistReview,
    restrictTo('admin'),
    protectAccount,
    deleteReview
  );
