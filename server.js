const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

// Route to handle form submissions
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
