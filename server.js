const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/worth-the-pick', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create a schema and model for suggestions
const suggestionSchema = new mongoose.Schema({
  productName: String,
  productCategory: String,
  productLink: String
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

// Route to handle form submissions for product suggestions
app.post('/submit-suggestion', (req, res) => {
  const newSuggestion = new Suggestion({
    productName: req.body.productName,
    productCategory: req.body.productCategory,
    productLink: req.body.productLink
  });

  newSuggestion.save()
    .then(suggestion => res.status(201).json(suggestion))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route to handle contact form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'worththepick@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: message
  };

  console.log('Sending email...');
  console.log(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: error.message });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Schemas and Models for Categories, Articles, and Products
const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  categoryId: Number,
});

const productSchema = new mongoose.Schema({
  name: String,
  details: String,
  price: String,
  pros: Array,
  cons: Array,
  images: Array,
  rating: Number,
  links: Array,
  articleId: Number,
});

const Category = mongoose.model('Category', categorySchema);
const Article = mongoose.model('Article', articleSchema);
const Product = mongoose.model('Product', productSchema);

// Route to get all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get articles by category ID
app.get('/articles/:categoryId', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    console.log('Fetching articles for categoryId:', categoryId);
    const articles = await Article.find({ categoryId: categoryId });
    console.log('Fetched articles:', articles);
    res.json(articles);
  } catch (err) {
    console.error('Error fetching articles:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Route to get products by article ID
app.get('/products/:articleId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId); // Parse the articleId as an integer
    const products = await Product.find({ articleId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Serve the home.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Serve other HTML files
app.get('/about/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about', 'about.html'));
});

app.get('/contact_us/contact_us.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact_us', 'contact_us.html'));
});

app.get('/categories/categories.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'categories', 'categories.html'));
});

// Route to handle form submissions for adding products
app.post('/admin/add-product', async (req, res) => {
  const { name, details, price, pros, cons, images, rating, links, articleId } = req.body;

  const newProduct = new Product({
    name,
    details,
    price,
    pros,
    cons,
    images,
    rating,
    links,
    articleId
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
