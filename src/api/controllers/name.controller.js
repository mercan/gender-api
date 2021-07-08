// Utils
const searchName = require("../../utils/searchName");

// Name Service
const Name = require("../../services/Name");

// Get Name
const getName = async (req, res) => {
  if (!req.query.name) {
    return res.code(400).send({
      message: "Name is required",
      example: "https://api-gender.herokuapp.com/search/?name=İbrahim",
    });
  }

  if (req.query.name.indexOf(",") !== -1) {
    let names = [...new Set(req.query.name.split(","))];

    if (names.length > 100) {
      names.length = 100;
    }

    const namesData = await Promise.all(
      names.map(async (name) => {
        const data = await Name.find(name);

        if (data) {
          delete data["when"];

          return { ...data, duration: `${res.getResponseTime().toFixed()}ms` };
        }
      })
    );

    const redisNames = namesData.filter(Boolean).map(({ name }) => name);
    names = names.flatMap((name) => (!redisNames.includes(name) ? name : []));

    const data = await Promise.all(names.map((name) => searchName(name)));
    namesData.push(
      ...(await Promise.all(
        data.map(async (obj) => {
          const data = { ...obj, duration: `${res.getResponseTime().toFixed()}ms` };

          if (data.name.split(" ").length > 1 && data.probability) {
            const names = data.name.split(" ");
            const namesData = await Promise.all(names.map((name) => searchName(name)));

            data["names"] = namesData.map((obj) => (delete obj["q"], obj));
          }

          if (data.probability) {
            const exists = await Name.exists(data.name);

            if (!exists) {
              Name.upsert(data.name, data);
            }
          }

          return data;
        })
      ))
    );

    return res.code(200).send(namesData.filter(Boolean));
  }

  const redisData = await Name.find(req.query.name);

  if (redisData) {
    delete redisData["when"];
    return res.code(200).send({ ...redisData, duration: `${res.getResponseTime().toFixed()}ms` });
  }

  const nameData = await searchName(req.query.name);
  req.query.name = nameData.name;
  const data = { ...nameData, duration: `${res.getResponseTime().toFixed()}ms` };

  if (req.query.name.split(" ").length > 1 && data.probability) {
    const namesData = await Promise.all(data.name.split(" ").map((name) => searchName(name)));
    data["names"] = namesData.map((obj) => (delete obj["q"], obj));
  }

  if (data.probability) {
    const exists = await Name.exists(req.query.name);

    if (!exists) {
      Name.upsert(req.query.name, data);
    }
  }

  return res.code(200).send(data);
};

module.exports = { getName };
