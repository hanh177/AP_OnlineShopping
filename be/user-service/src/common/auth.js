const jwt = require("jsonwebtoken");
const RefreshToken = require("../api/models/refreshToken.model");
const { APP_TOKEN_SECRET } = process.env;
const uuid = require("uuid").v4;
const crypto = require("crypto");
const { REDIS_REVOKED_PREFIX } = require("./constant");
const redisClient = require("../config/redis");

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const generateTokenPair = async ({ _id, role, email, name }) => {
  const jti = uuid();
  const refeshToken = uuid();
  const hashedToken = hashToken(refeshToken);

  const access_token = jwt.sign(
    { _id, role, email, name, jti },
    APP_TOKEN_SECRET,
    {
      expiresIn: "10m",
    }
  );

  await RefreshToken.create({
    userId: _id,
    token: hashedToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    isRevoked: false,
    jti,
  });

  return { access_token, refresh_token: refeshToken };
};

const decodeToken = async (token) => {
  try {
    const decoded = jwt.verify(token, APP_TOKEN_SECRET);

    // Check if the token is revoked from redis
    const instance = await redisClient;
    const isTokenRevoked = await instance.client.exists(
      `${REDIS_REVOKED_PREFIX}:${decoded.jti}`
    );

    return isTokenRevoked ? null : decoded;
  } catch (error) {
    console.log("Token verification error", error);
    return null;
  }
};

const revokeRefreshToken = async (query) => {
  const tokens = await RefreshToken.find(query);

  if (!tokens || tokens.length === 0) {
    return false;
  }

  // insert revoked jti to redis list
  const instance = await redisClient;
  const pipeline = instance.client.multi();
  for (const token of tokens) {
    pipeline.set(`${REDIS_REVOKED_PREFIX}:${token.jti}`, "true", {
      EX: 30 * 24 * 60 * 60,
    }); // expire in 30 days
  }
  await pipeline.exec();

  const ids = tokens.map((token) => token._id);
  return RefreshToken.updateMany({ _id: { $in: ids } }, { isRevoked: true });
};

module.exports = {
  hashToken,
  generateTokenPair,
  decodeToken,
  revokeRefreshToken,
};
