const mongoose = require("mongoose");
const CONFIG = require("../config/config");
const logger = require("../logging/logger");

const ConnectToDb = async () => {
  try {
    const conn = await mongoose.connect(CONFIG.MONGODB_URL);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = ConnectToDb;
