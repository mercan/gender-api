"use strict";
const server = require("./app")({
  logger: {
    level: "error",
    prettyPrint: true,
  },
});

server.listen(process.env.PORT || 3000, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
  server.log.info(`Server listening on ${address}`);
});
