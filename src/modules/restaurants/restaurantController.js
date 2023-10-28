import { AppError, catAsync } from '../../errors/index.js';
import {
  validationRestaurantsSchema,
  validationPartialRestaurantsSchema,
} from './restaurantSchema.js';
import { RestaurantsServices } from './restaurantService.js';
import { ReviewsSchema } from '../reviews/reviewService.js';

const restaurantsServices = new RestaurantsServices();
const reviewsServices = new ReviewsSchema();

export const restaurantCreate = catAsync(async (req, res) => {
  const { hasError, errorMessage, restaurantData } =
    validationRestaurantsSchema(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const restaurant = await restaurantsServices.createRestaurant(restaurantData);
  return res.json(restaurant);
});

export const restaurantsFindAll = catAsync(async (req, res) => {
  const restaurants = await restaurantsServices.findAllResaurants();
  return res.json(restaurants);
});

export const restaurantFindOne = catAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await restaurantsServices.findOneRestaurant(id);

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${id} not found`, 404));
  }

  return res.json(restaurant);
});

export const restaurantUpdate = catAsync(async (req, res, next) => {
  const { hasError, errorMessage, restaurantData } =
    validationPartialRestaurantsSchema(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { id } = req.params;
  const restaurant = await restaurantsServices.findOneRestaurant(id);

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${id} no found`));
  }

  const restaurantUp = await restaurantsServices.updateRestaurant(
    restaurant,
    restaurantData
  );
  return res.json(restaurantUp);
});

export const restaurantDelete = catAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await restaurantsServices.findOneRestaurant(id);

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${id} no found`, 404));
  }

  await restaurantsServices.deleteRestaurant(restaurant);
  return res.status(204).json(null);
});

//
export const createReviewToRestaurant = catAsync(async (req, res, nex) => {
  const { comment, rating } = req.body;
  const { id } = req.params;
  const { sessionUser } = req;

  const review = await reviewsServices.createReviews({
    comment,
    rating,
    restaurantId: id,
    userId: sessionUser.id,
  });
  return res.status(201).json(review);
});

export const updateReview = catAsync(async (req, res, nex) => {
  const { comment, rating } = req.body;
  const { review } = req;

  const reviewUpdate = await reviewsServices.updateReview(review, {
    comment,
    rating,
  });

  return res.status(200).json(reviewUpdate);
});

export const deleteReview = catAsync(async (req, res, next) => {
  const { id } = req.body;
  const { review } = req;

  const reviewUp = await reviewsServices.updateReview(review, { id });

  if (!reviewUp) {
    return next(new AppError(`restaurant with id: ${id} no found`, 404));
  }

  await reviewsServices.deleteReview(reviewUp);
  return res.status(204).json(null);
});
