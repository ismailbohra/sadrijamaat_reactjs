// models/SkipThali.js
const mongoose = require('mongoose');

const SkipThaliSchema = new mongoose.Schema({
  submittedBy: {
    type: String,
    required: true,
  },
  thaliNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  toDate: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});

module.exports = mongoose.model('SkipThali', SkipThaliSchema);
