const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/payment.controller");
const isAuthenticatedUser = require("../middlewares/auth.middleware");
const paymentRouter = express.Router();


/**
 * @swagger
 * /api/payment/process-payment:
 *   post:
 *     summary: Process a payment
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID of the product to order
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the product to order
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *               totalAmount:
 *                 type: number
 *                 description: Total amount to be paid
 *     responses:
 *       '200':
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *       '400':
 *         description: Bad request, missing required fields
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid
 */

/**
 * @swagger
 * /api/payment/get-stripe-key:
 *   get:
 *     summary: Get Stripe API key
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Stripe API key retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stripeApiKey:
 *                   type: string
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid
 */



paymentRouter.post("/process-payment", isAuthenticatedUser, processPayment);
paymentRouter.get("/get-stripe-key", isAuthenticatedUser, sendStripeApiKey);

module.exports = paymentRouter;
