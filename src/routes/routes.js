import { Router } from 'express';

import { router as userRouter } from '../modules/users/userRoute.js';
import { router as reviewRouter } from '../modules/reviews/reviewRoute.js';
import { router as orderRouter } from '../modules/orders/orderRoute.js';
import { router as mealRouter } from '../modules/meals/mealRoute.js';
import { router as restaurantRouter } from '../modules/restaurants/restaurantRoute.js';
import { protect } from '../modules/users/userMiddleware.js';

export const router = Router();

router.use('/user', userRouter);

router.use(protect);
router.use('/review', reviewRouter);
router.use('/order', orderRouter);
router.use('/meal', mealRouter);
router.use('/restaurant', restaurantRouter);
