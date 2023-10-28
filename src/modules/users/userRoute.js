import { Router } from 'express';
import {
  protect,
  protectAccount,
  validateExistUser,
} from './userMiddleware.js';

import {
  login,
  register,
  userDelete,
  userFindAll,
  userFindOne,
  userUpdate,
} from './userController.js';

export const router = Router();

router.post('/login', login);
router.post('/register', register);

router.use(protect);

router.route('/orders').get(userFindAll);
router
  .route('/:id')

  .patch(validateExistUser, protectAccount, userUpdate)
  .delete(validateExistUser, protectAccount, userDelete);
router.route('/orders/:id').get(validateExistUser, userFindOne);
