const { redis: redisConf } = require("../config/index");
const redis = require("redis");

class RedisService {
  constructor(options) {
    this.options = options;
    this.client = redis.createClient(this.options);

    this.client.on("connect", () => console.log("Redis Connected"));
    this.client.on("error", console.error);
  }

  init() {
    return this.client;
  }
}

const options = {
  password: redisConf.password,
  host: redisConf.hostname,
  port: redisConf.port,
  no_ready_check: true,
};

module.exports = new RedisService(options);
