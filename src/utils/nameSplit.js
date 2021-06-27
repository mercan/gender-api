module.exports = (name) =>
  name
    .trim()
    .split(",")[0]
    .split("-")[0]
    .split(".")[0]
    .split("_")[0]
    .split("!")[0]
    .split("&")[0]
    .split("/")[0]
    .split("(")[0]
    .split(")")[0]
    .split("?")[0]
    .split("*")[0]
    .split("~")[0]
    .split('"')[0]
    .split("'")[0]
    .split("+")[0];
