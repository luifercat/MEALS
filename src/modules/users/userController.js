import { verifyPassword } from '../../config/plugins/encryptedPasswordPlugins.js';

import generateJWT from '../../config/plugins/generateJWTPlugins.js';
import { catAsync, AppError } from '../../errors/index.js';
import {
  validateLogin,
  validateRegister,
  validationPartialRegister,
} from './userSchema.js';
import { UserServices } from './userService.js';

const userServices = new UserServices();

export const login = catAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const user = await userServices.findOneUserByEmail(userData.email);
  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });
});

export const register = catAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const user = await userServices.createUser(userData);
  const token = await generateJWT(user.id);
  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      role: user.role,
    },
  });
});

export const userFindAll = catAsync(async (req, res) => {
  const user = await userServices.findAllUsers();
  return res.json(user);
});

export const userFindOne = catAsync(async (req, res, next) => {
  const { user } = req;
  return res.json(user);
});

export const userUpdate = catAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validationPartialRegister(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { id } = req.params;
  const user = await userServices.findOneUserById(id);

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: `User with id: ${id} no found`,
    });
  }

  const userUp = await userServices.updateUser(user, userData);
  return res.json(userUp);
});

export const userDelete = catAsync(async (req, res, next) => {
  const { user } = req;

  await userServices.deleteUser(user);
  return res.status(204).json(null);
});
