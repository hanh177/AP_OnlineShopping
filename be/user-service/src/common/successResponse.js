const { StatusCodes, ReasonPhrases } = require("http-status-codes");
class SuccessResponse {
  constructor({
    message = ReasonPhrases.OK,
    statusCode = StatusCodes.OK,
    metadata = {},
  }) {
    this.message = message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    if (Object.keys(headers).length > 0) {
      res.set(headers);
    }
    return res.status(this.status).json(this);
  }
}

const OK = ({ res, headers = {}, metadata = {}, message = ReasonPhrases.OK }) =>
  new SuccessResponse({
    statusCode: StatusCodes.OK,
    message,
    metadata,
  }).send(res, headers);

const CREATED = ({
  res,
  headers = {},
  metadata = {},
  message = ReasonPhrases.CREATED,
}) =>
  new SuccessResponse({
    statusCode: StatusCodes.CREATED,
    message,
    metadata,
  }).send(res, headers);

module.exports = {
  SuccessResponse,
  OK,
  CREATED,
};
