const { MongoClient } = require("mongodb");
require("dotenv").config();

const mongoUrl = process.env.MONGOURI;

const dbConnect = async () => {
  try {
    const client = await MongoClient.connect(mongoUrl, {
      dbName: "paytm",
    });

    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = dbConnect;
