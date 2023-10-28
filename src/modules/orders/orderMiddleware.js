import { AppError, catAsync } from '../../errors/index.js';
import { OrdersServices } from '../orders/orderService.js';

const ordersServices = new OrdersServices();

export const validateExistOrder = catAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await ordersServices.findAllOrders(id);

  if (!order) {
    return next(new AppError(`order not found with id: ${id}`, 404));
  }
  req.order = order;
  next();
});
