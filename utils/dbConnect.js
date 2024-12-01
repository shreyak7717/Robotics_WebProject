const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb+srv://shreyakhandelwal23cse:vQyly11Y1BeWYVih@clusterstudent.e0ks9.mongodb.net/');
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

module.exports = dbConnect;