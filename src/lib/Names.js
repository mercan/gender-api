const redis = require("redis");
const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest;

class Names {
  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_HOSTNAME,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      no_ready_check: true,
    });

    this.client.on("connect", () => console.log("Redis Connected"));
    this.client.on("error", console.error);

    // this.client.on("ready", () => {
    //   this.client.config("SET", "appendonly", "yes");
    //   this.client.config("SET", "appendfsync", "everysec");
    // });
  }

  disconnect() {
    this.client.quit();
  }

  upsert(name, data) {
    this.client.hset(
      "names",
      name,
      JSON.stringify({ ...removeProperty("duration", data), when: Date.now() }),
      (err) => {
        if (err) throw err;
      }
    );
  }

  remove(name) {
    this.client.hdel("names", name, (err) => {
      if (err) throw err;
    });
  }

  exists(name) {
    return new Promise((resolve, reject) => {
      this.client.hexists("names", name, (err, exists) => {
        if (err) return reject(err);

        resolve(exists);
      });
    });
  }

  length() {
    return new Promise((resolve, reject) => {
      this.client.hlen("names", (err, count) => {
        if (err) return reject(err);

        resolve(count);
      });
    });
  }

  find(name) {
    return new Promise((resolve, reject) => {
      this.client.hget("names", name, (err, data) => {
        if (err) return reject(err);

        resolve(JSON.parse(data));
      });
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      const active = [];

      this.client.hgetall("names", (err, names) => {
        if (err) return reject(err);

        for (let name in names) {
          active.push(JSON.parse(names[name]));
        }

        resolve(active);
      });
    });
  }
}

module.exports = new Names();
