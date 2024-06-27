const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment.model");
const Product = require("../models/product.model");

const processPayment = asyncErrorHandler(async (req, res, next) => {
  const { items, shippingAddress, totalAmount } = req.body;
  const user = req.user._id;
  if (!user || !items || !shippingAddress || !totalAmount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          const error = new Error(
            `Product with id ${item.productId} not found`
          );
          return error.sendError(res);
        }
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
              images: [product.imageUrl],
            },
            unit_amount: product.price * 100,
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:8000/orders/success`,
      cancel_url: `http://localhost:8000/orders/failed`,
    });

    const newPayment = new Payment({
      user,
      items,
      shippingAddress,
      totalAmount,
      paymentStatus: "pending",
      stripeSessionId: session.id,
    });

    await newPayment.save();

    res.json({ sessionId: session.id });
  } catch (error) {
    next(error);
  }
});

const sendStripeApiKey = (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
};

module.exports = {
  processPayment,
  sendStripeApiKey,
};
