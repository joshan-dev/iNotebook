const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    }, 
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true
    }  
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;