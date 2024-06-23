const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require('../controllers/order.controller');
const isAuthenticatedUser = require('../middlewares/auth.middleware');

const orderRouter = express.Router();

orderRouter.route('/orders')
  .post(isAuthenticatedUser, addOrderItems)
  .get(isAuthenticatedUser, getMyOrders);

  orderRouter.route('/orders/:id')
  .get(isAuthenticatedUser, getOrderById)
  .put(isAuthenticatedUser, updateOrderToPaid);

  orderRouter.route('/orders/:id/deliver')
  .put(isAuthenticatedUser, updateOrderToDelivered);

  orderRouter.route('/admin/orders')
  .get(isAuthenticatedUser, getOrders);

module.exports = orderRouter;
