const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("open", () => console.log("MongoDB: Connected"));
  mongoose.connection.on("error", (error) => console.error("MongoDB: Error ", error));
};
