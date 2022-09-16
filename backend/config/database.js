const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, { useNewUrlParser: true })
    .then((data) => {
      console.log(
        `Mongodb Connected sucessfully with server : ${data.connection.host}`
      );
    });
};

module.exports = connectDatabase;
