import { AppError, catAsync } from '../../errors/index.js';
import {
  validationOrderSchema,
  validationPartialOrderSchema,
} from './orderSchema.js';
import { OrdersServices } from './orderService.js';
import { MealsServices } from '../meals/mealService.js';
import { totalMult } from '../../utils/operationMult.js';

const mealsServices = new MealsServices();
const ordersServices = new OrdersServices();

// export const orderCreate = catAsync(async (req, res) => {
//   const { hasError, errorMessage, orderData } = validationOrderSchema(req.body);

//   if (hasError) {
//     return res.status(422).json({
//       status: 'error',
//       message: errorMessage,
//     });
//   }

//   const order = await ordersServices.createOrder(orderData);
//   return res.json(order);
// });

export const odersFindAll = catAsync(async (req, res) => {
  const orders = await ordersServices.findAllOrders();
  return res.json(orders);
});

export const orderFindOne = catAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await ordersServices.findOneOrder(id);

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }

  return res.json(order);
});

export const orderUpdate = catAsync(async (req, res, next) => {
  const { hasError, errorMessage, orderData } = validationPartialOrderSchema(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }

  const { id } = req.params;
  const order = await ordersServices.findOneOrder(id);

  if (!order) {
    return next(new AppError(`Order with id: ${id} no found`));
  }

  const orderUp = await ordersServices.updateOrder(order, orderData);
  return res.json(orderUp);
});

export const orderDelete = catAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await ordersServices.findOneOrder(id);

  if (!order) {
    return next(new AppError(`Order with id: ${id} no found`, 404));
  }

  await ordersServices.deleteOrder(order);
  return res.status(204).json(null);
});
//
//
//
//

export const orderCreate = catAsync(async (req, res) => {
  const { hasError, errorMessage, orderData } = validationOrderSchema(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage,
    });
  }
  const mealData = await mealsServices.findOneMeal(orderData.mealId);
  if (!mealData) {
    return res.status(404).json({
      status: 'Error',
      message: `Order with meal id: ${orderData.mealId} no found`,
    });
  }

  orderData.totalPrice = totalMult(mealData.price, orderData.quantity);

  const order = await ordersServices.createOrder(orderData);
  return res.json(order);
});
