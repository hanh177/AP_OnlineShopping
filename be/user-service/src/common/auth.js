const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../api/models/refreshToken.model");
const { APP_TOKEN_SECRET } = process.env;
const uuid = require("uuid").v4;
const crypto = require("crypto");

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

  await refreshTokenModel.create({
    userId: _id,
    token: hashedToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    isRevoked: false,
    jti,
  });

  return { access_token, refresh_token: refeshToken };
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, APP_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

const revokeRefreshToken = async (query) => {
  await refreshTokenModel.findOneAndUpdate(query, { isRevoked: true });
  return true;
};

module.exports = {
  hashToken,
  generateTokenPair,
  decodeToken,
  revokeRefreshToken,
};
