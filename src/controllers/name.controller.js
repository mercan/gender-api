// Utils
const searchName = require("../utils/searchName");

// Get Name
const getName = async (req, res) => {
  if (req.query.name && req.query.name.indexOf(",") !== -1) {
    const names = [...new Set(req.query.name.split(","))];

    if (names.length > 100) {
      names.length = 100;
    }

    const data = await Promise.all(names.map((name) => searchName(name)));
    const namesData = await Promise.all(
      data.map(async (obj) => {
        const data = { ...obj, duration: `${res.getResponseTime().toFixed()}ms` };

        if (data.name.split(" ").length > 1 && data.probability) {
          const names = data.name.split(" ");
          const namesData = await Promise.all(names.map((name) => searchName(name)));
          data["names"] = namesData.map((obj) => (delete obj["q"], obj));
        }

        return data;
      })
    );

    return res.code(200).send(namesData);
  }

  const nameData = await searchName(req.query.name);
  req.query.name = nameData.name;
  const data = { ...nameData, duration: `${res.getResponseTime().toFixed()}ms` };

  if (req.query.name.split(" ").length > 1 && data.probability) {
    const namesData = await Promise.all(data.name.split(" ").map((name) => searchName(name)));
    data["names"] = namesData.map((obj) => (delete obj["q"], obj));
  }

  return res.code(200).send(data);
};

module.exports = { getName };
