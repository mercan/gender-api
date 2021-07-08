const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest;
const RedisService = require("./Redis");

class NameService {
  constructor(RedisService) {
    this.client = RedisService.init();
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
        if (err) {
          throw err;
        }
      }
    );
  }

  remove(name) {
    this.client.hdel("names", name, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  exists(name) {
    return new Promise((resolve, reject) => {
      this.client.hexists("names", name, (err, exists) => {
        if (err) {
          return reject(err);
        }

        resolve(exists);
      });
    });
  }

  length() {
    return new Promise((resolve, reject) => {
      this.client.hlen("names", (err, count) => {
        if (err) {
          return reject(err);
        }

        resolve(count);
      });
    });
  }

  find(name) {
    return new Promise((resolve, reject) => {
      this.client.hget("names", name, (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(JSON.parse(data));
      });
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      const active = [];

      this.client.hgetall("names", (err, names) => {
        if (err) {
          return reject(err);
        }

        for (let name of names) {
          active.push(JSON.parse(name));
        }

        resolve(active);
      });
    });
  }
}

module.exports = new NameService(RedisService);
