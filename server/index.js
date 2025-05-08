const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./feedback.db');
require('./db'); // runs db.js to create the table

const app = express(); // Initialize the express app

// CORS configuration
const corsOptions = {
  origin: 'https://chiragdh.github.io',  // Make sure this matches your GitHub Pages URL (no trailing slash)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));  // Use the CORS middleware with the specified options
app.use(express.json());  // Middleware to parse JSON request bodies

// POST route to submit feedback
app.post('/feedback', (req, res) => {
  const { message } = req.body;
  db.run('INSERT INTO feedback (message) VALUES (?)', [message], (err) => {
    if (err) {
      console.error("Insert error:", err.message);  // Detailed logging for any database insertion error
      return res.status(500).send('DB error');
    }
    res.status(200).send('Feedback received');
  });
});

// GET route to fetch all feedback
app.get('/feedback', (req, res) => {
  db.all('SELECT * FROM feedback', (err, rows) => {
    if (err) {
      console.error("Database read error:", err.message);  // Detailed logging for read errors
      return res.status(500).send('DB error');
    }
    res.json(rows);  // Send the feedback data as JSON
  });
});

// Start the server on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
