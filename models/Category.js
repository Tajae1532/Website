const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
});

module.exports = mongoose.model('Category', categorySchema);
