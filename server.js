const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
