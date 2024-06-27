const express = require("express");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} = require("../controllers/order.controller");
const isAuthenticatedUser = require("../middlewares/auth.middleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the ordered item.
 *         name:
 *           type: string
 *           description: The name of the ordered item.
 *         price:
 *           type: number
 *           description: The price of the ordered item.
 *       required:
 *         - _id
 *         - name
 *         - price
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the order.
 *         orderItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *           description: The list of ordered items.
 *         user:
 *           type: string
 *           description: The ID of the user who placed the order.
 *         shippingAddress:
 *           type: string
 *           description: The shipping address for the order.
 *         paymentMethod:
 *           type: string
 *           description: The payment method used for the order.
 *         taxPrice:
 *           type: number
 *           description: The tax amount for the order.
 *         shippingPrice:
 *           type: number
 *           description: The shipping cost for the order.
 *         totalPrice:
 *           type: number
 *           description: The total price of the order.
 *         isPaid:
 *           type: boolean
 *           description: Indicates if the order has been paid.
 *         paidAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was paid.
 *         paymentResult:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The ID of the payment.
 *             status:
 *               type: string
 *               description: The status of the payment.
 *             updateTime:
 *               type: string
 *               format: date-time
 *               description: The date and time of the payment update.
 *             emailAddress:
 *               type: string
 *               description: The email address associated with the payment.
 *       required:
 *         - orderItems
 *         - user
 *         - shippingAddress
 *         - paymentMethod
 *         - taxPrice
 *         - shippingPrice
 *         - totalPrice
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/orders/{id}/pay:
 *   put:
 *     summary: Update an order to paid status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the payment.
 *               status:
 *                 type: string
 *                 description: The status of the payment.
 *               updateTime:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time of the payment update.
 *               emailAddress:
 *                 type: string
 *                 description: The email address associated with the payment.
 *     responses:
 *       200:
 *         description: Order updated to paid successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/orders/{id}/deliver:
 *   put:
 *     summary: Update an order to delivered status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order
 *     responses:
 *       200:
 *         description: Order updated to delivered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/orders/myorders:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: No orders found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/orders/admin/orders:
 *   get:
 *     summary: Get all orders (admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: No orders found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// Define routes
router.post("/orders", isAuthenticatedUser, addOrderItems);
router.get("/orders/:id", isAuthenticatedUser, getOrderById);
router.put("/orders/:id/pay", isAuthenticatedUser, updateOrderToPaid);
router.put("/orders/:id/deliver", isAuthenticatedUser, updateOrderToDelivered);
router.get("/orders/myorders", isAuthenticatedUser, getMyOrders);
router.get("/orders/admin/orders", isAuthenticatedUser, getOrders);

module.exports = router;
