const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/payment.controller");
const isAuthenticatedUser = require("../middlewares/auth.middleware");
const paymentRouter = express.Router();

paymentRouter.post("/process-payment", isAuthenticatedUser, processPayment);
paymentRouter.get("/get-stripe-key", isAuthenticatedUser, sendStripeApiKey);

module.exports = paymentRouter;
