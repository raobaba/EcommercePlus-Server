const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/product.controller");
const isAuthenticatedUser = require("../middlewares/auth.middleware");

const productRouter = express.Router();

productRouter
  .route("/products")
  .post(isAuthenticatedUser, createProduct)
  .get(isAuthenticatedUser, getAllProducts);

productRouter
  .route("/products/:id")
  .get(isAuthenticatedUser, getProductById)
  .put(isAuthenticatedUser, updateProductById)
  .delete(isAuthenticatedUser, deleteProductById);

module.exports = productRouter;
