import z from 'zod';
import { extractValidationErrorData } from '../../common/utils/extractErrorData.js';

export const reviewsSchema = z.object({
  userId: z.number().positive(),
  restaurantId: z.number().positive(),
  comment: z
    .string()
    .min(10, { message: 'The comment must have a minimum of 10 characters' }),
  rating: z.number(1).min(1).max(5),
});

export const validatereviewsSchema = (data) => {
  const result = reviewsSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: reviewData,
  } = extractValidationErrorData(result);

  return {
    hasError,
    errorMessage,
    reviewData,
  };
};

export const validatePartailreviewsSchema = (data) => {
  const result = reviewsSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: reviewData,
  } = extractValidationErrorData(result);

  return {
    hasError,
    errorMessage,
    reviewData,
  };
};
