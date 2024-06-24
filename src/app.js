const express = require("express");
require("dotenv").config();
const rateLimit = require('express-rate-limit');
const cors = require("cors");
const Connection = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const app = express();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});

// Apply to all requests
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
Connection();
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

module.exports = app;
