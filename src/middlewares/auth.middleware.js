const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("./asyncErrorHandler");

const isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return next(new ErrorHandler("Authorization token missing", 401));
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    ); // Handle Bearer token prefix
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorHandler("Invalid token", 401));
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
});

module.exports = isAuthenticatedUser;
