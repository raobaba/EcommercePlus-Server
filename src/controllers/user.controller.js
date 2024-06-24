const User = require("../models/user.model");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const sendToken = require("../utils/sendToken");
const ErrorHandler = require("../utils/errorHandler");

const registerUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        const error = new ErrorHandler("User with this email already exists", 400);
        return error.sendError(res);
    }


    const user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 200, res);
});

const loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new ErrorHandler("Please Enter Email And Password", 400);
        return error.sendError(res);
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        const error = new ErrorHandler("Invalid Email", 401);
        return error.sendError(res);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        const error = new ErrorHandler("Incorrect Password", 401);
        return error.sendError(res);
    }

    sendToken(user, 201, res);
});

const logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

module.exports = { registerUser, loginUser, logoutUser };
