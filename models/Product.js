const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  details: String,
  pros: [
    {
      title: String,
      details: String
    }
  ],
  cons: [
    {
      title: String,
      details: String
    }
  ],
  images: [String],
  rating: Number,
  links: [
    {
      url: String,
      text: String,
      originalPrice: String,
      salePrice: String
    }
  ],
  articleId: Number
});

module.exports = mongoose.model('Product', productSchema);
