const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/iNotebook";

const connectToMongoDB = () => {
  mongoose.connect(mongooseURI);
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
};

module.exports = connectToMongoDB;
