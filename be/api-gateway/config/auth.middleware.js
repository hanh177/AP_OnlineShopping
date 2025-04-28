const jwt = require("jsonwebtoken");
const { APP_TOKEN_SECRET } = process.env;
const redisClient = require("./redis");
const { REDIS_REVOKED_PREFIX } = require("./constant");

module.exports = checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  const tokenString = token.split(" ")[1];

  try {
    const decoded = jwt.verify(tokenString, APP_TOKEN_SECRET);

    const instance = await redisClient;
    const isTokenRevoked = await instance.client.exists(
      `${REDIS_REVOKED_PREFIX}:${decoded.jti}`
    );

    if (isTokenRevoked) {
      throw new Error("Token is revoked");
    }

    req.decodedData = decoded;
  } catch (error) {
    return next();
  }

  next();
};
