const server = require("./app")({
  logger: { level: "error" },
  trustProxy: true,
});

server.listen(process.env.PORT || 3000, "0.0.0.0", (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
  server.log.info(`Server listening on ${address}`);
});
