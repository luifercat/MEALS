import { Router } from 'express';
import {
  reviewCreate,
  reviewsFindAll,
  reviewFindOne,
  reviewUpdate,
  reviewDelete,
} from './reviewController.js';

export const router = Router();

router.route('/').post(reviewCreate).get(reviewsFindAll);

router
  .route('/:id')
  .get(reviewFindOne)
  .patch(reviewUpdate)
  .delete(reviewDelete);
