import { AppError, catAsync } from '../../errors/index.js';
import { ReviewsSchema } from './reviewService.js';

const reviewsServices = new ReviewsSchema();

export const validExistReview = catAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await reviewsServices.findOneReview(id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }
  //console.log(review.user);
  req.user = review.user;
  req.review = review;
  next();
});
