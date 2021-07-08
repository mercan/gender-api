const config = require("../config/index");
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
  password: config.redis.password,
  host: config.redis.hostname,
  port: config.redis.port,
  no_ready_check: true,
};

module.exports = new Redis(options);
