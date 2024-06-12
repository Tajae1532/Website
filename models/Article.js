const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  categoryId: Number,
});

module.exports = mongoose.model('Article', articleSchema);
