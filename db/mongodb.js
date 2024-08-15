const mongoose = require("mongoose");
const CONFIG = require("../config/config");

const ConnectToDb = async () => {
  try {
    const conn = await mongoose.connect(CONFIG.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = ConnectToDb;
