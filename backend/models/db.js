const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

async function connectDataBase() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect mongodb: ", error);
    throw error;
  }
}

module.exports = connectDataBase;
