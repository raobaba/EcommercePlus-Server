const express = require("express");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const Connection = require("./config/db");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const paymentRouter = require("./routes/payment.route");
const app = express();

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later",
});

// Apply to all requests
app.use(limiter);

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce Management by MyIndia',
      version: '1.0.0',
    },
    servers:[
      {
         url:'http://localhost:8000'
      },
      {
        url:"https://digitalpaani-book-management.onrender.com"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
Connection();
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);
app.get("/", (req, res) => {
  res.send("Server is Running! 🚀");
});

module.exports = app;
