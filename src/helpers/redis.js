const redis = require("redis");

class Redis {
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
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  no_ready_check: true,
};

module.exports = new Redis(options);
