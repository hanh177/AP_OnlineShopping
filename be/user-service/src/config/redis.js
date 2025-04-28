const { createClient } = require("redis");
const logger = require("../common/logger");
const { REDIS_HOST, REDIS_PORT } = process.env;

class RedisClient {
  constructor() {
    this.client = createClient({
      url: `redis://${REDIS_HOST || "localhost"}:${REDIS_PORT || 6379}`,
    });
  }

  static async getInstance() {
    if (!this.instance) {
      const instance = new RedisClient();
      await instance.client
        .connect()
        .then(() => {
          console.info("Connected to Redis");
        })
        .catch((err) => {
          logger.error("Redis connect error", err);
        });
      this.instance = instance;
    }
    return this.instance;
  }
}

const redisClient = RedisClient.getInstance();
module.exports = redisClient;
