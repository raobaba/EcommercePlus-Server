const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const Order = require("../models/order.model");
const ErrorHandler = require("../utils/errorHandler");

const addOrderItems = asyncErrorHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const existingOrderItem = await Order.findOne({
    user: req.user._id,
    "orderItems.name": { $in: orderItems.map((item) => item.name) },
  });
  if (existingOrderItem) {
    const error = new ErrorHandler("You have already ordered this item", 400);
    return error.sendError(res);
  }
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const createdOrder = await order.save();
  res.status(201).json({
    success: true,
    order: createdOrder,
  });
});

const getOrderById = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems._id", "name price");
  if (!order) {
    const error = new ErrorHandler("Order not found", 404);
    return error.sendError(res)
  }
  res.status(200).json({
    success: true,
    order,
  });
});
const updateOrderToPaid = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    const error = new ErrorHandler("Order not found", 404);
    return error.sendError(res)
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    updateTime: req.body.updateTime,
    emailAddress: req.body.emailAddress,
  };
  const updatedOrder = await order.save();
  res.status(200).json({
    success: true,
    order: updatedOrder,
  });
});
const updateOrderToDelivered = asyncErrorHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    const error = new ErrorHandler("Order not found", 404);
    return error.sendError(res)
  }
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();
  res.status(200).json({
    success: true,
    order: updatedOrder,
  });
});
const getMyOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems._id", "name price")
    .sort({ createdAt: -1 });
    if (!orders) {
      const error = new ErrorHandler("Order not found", 404);
      return error.sendError(res)
    }
  res.status(200).json({
    success: true,
    orders,
  });
});
const getOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find({})
    .populate("user", "id name")
    .populate("orderItems._id", "name price")
    .sort({ createdAt: -1 });
    if (!orders) {
      const error = new ErrorHandler("Order not found", 404);
      return error.sendError(res)
    }
  res.status(200).json({
    success: true,
    orders,
  });
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
