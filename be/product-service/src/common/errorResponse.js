const { StatusCodes, ReasonPhrases } = require("http-status-codes");

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const BadRequest = (message = ReasonPhrases.BAD_REQUEST) =>
  new ErrorResponse(message, StatusCodes.BAD_REQUEST);

const Unauthorized = (message = ReasonPhrases.UNAUTHORIZED) =>
  new ErrorResponse(message, StatusCodes.UNAUTHORIZED);

const Forbidden = (message = ReasonPhrases.FORBIDDEN) =>
  new ErrorResponse(message, StatusCodes.FORBIDDEN);

const NotFound = (message = ReasonPhrases.NOT_FOUND) =>
  new ErrorResponse(message, StatusCodes.NOT_FOUND);

const InternalServerError = (message = ReasonPhrases.INTERNAL_SERVER_ERROR) =>
  new ErrorResponse(message, StatusCodes.INTERNAL_SERVER_ERROR);

const ConflictError = (message = ReasonPhrases.CONFLICT) =>
  new ErrorResponse(message, StatusCodes.CONFLICT);

module.exports = {
  ErrorResponse,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  ConflictError,
};
