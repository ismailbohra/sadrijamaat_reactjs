const mongoose = require('mongoose');

// Define the schema for the FMB Menu
const menuSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  occasion: {
    type: String,
    default: 'Normal Day',
  },
  menu: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update the 'updated_at' field before every save
menuSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Export the FMB Menu model
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
