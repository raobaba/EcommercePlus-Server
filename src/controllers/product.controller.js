const Product = require("../models/product.model");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

// Create a new product
const createProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Get all products
const getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    });
});

// Get a single product by ID
const getProductById = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        const error = new ErrorHandler("Product not found", 404);
        return error.sendError(res);
    }
    res.status(200).json({
        success: true,
        product
    });
});

// Update a product by ID
const updateProductById = asyncErrorHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        const error = new ErrorHandler("Product not found", 404);
        return error.sendError(res);
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        product
    });
});

const deleteProductById = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        const error = new ErrorHandler("Product not found", 404);
        return error.sendError(res);
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};
