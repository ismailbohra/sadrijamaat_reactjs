const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  its: {
    type: Number,
    required: true,
  },
  hof: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
  },
  is_hof: {
    type: Boolean,
    default: false,
  },
  is_mehman: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  sector: {
    type: String,
  },
  role: {
    type: [{ type: String }],
    default: ["MUMINEEN"], 
  },
  fcmToken: { 
    type: String 
  },
  age: { 
    type: Number 
  },
  gender: { 
    type: String 
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
