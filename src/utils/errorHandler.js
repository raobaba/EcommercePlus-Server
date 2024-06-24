class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }

    sendError(res) {
        res.status(this.statusCode).json({
            success: false,
            message: this.message,
            statusCode: this.statusCode,
        });
    }
}

module.exports = ErrorHandler;
