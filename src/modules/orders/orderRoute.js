import { Router } from 'express';

import {
  orderCreate,
  odersFindAll,
  orderFindOne,
  orderUpdate,
  orderDelete,
} from './orderController.js';
import { protect, protectAccount } from '../users/userMiddleware.js';

export const router = Router();

router.route('/').post(orderCreate).get(odersFindAll);

router
  .route('/:id')
  .get(orderFindOne)
  .patch(protectAccount, orderUpdate)
  .delete(protect, orderDelete);
