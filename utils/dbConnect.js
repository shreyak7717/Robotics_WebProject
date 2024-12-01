const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/local');
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

module.exports = dbConnect;