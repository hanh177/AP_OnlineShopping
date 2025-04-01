const {
  ErrorResponse,
  InternalServerError,
} = require("../../common/errorResponse");
const logger = require("../../common/logger");

// Middleware handling errors
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  logger.error({
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  if (!(err instanceof ErrorResponse)) {
    error = InternalServerError();
  }

  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal server error",
    stack: process.env.NODE_ENV === "dev" ? error.stack : undefined,
  });
};

module.exports = errorHandler;
