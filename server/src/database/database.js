require("dotenv").config();
const mongoose = require("mongoose");

async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect mongoose succces");
    return connection;
  } catch (error) {
    if (error.code === 8000) {
      throw new Error("Wrong database username and password");
    } else if (error.code === "ENOTFOUND") {
      throw new Error("Wrong server name/connection string");
    }
    throw new Error("Cannot connect to MongoDB");
  }
}

module.exports = connect;
