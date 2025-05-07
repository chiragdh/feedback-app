const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./feedback.db');
require('./db'); // runs db.js to create the table

const app = express();
app.use(cors());
app.use(express.json());

app.post('/feedback', (req, res) => {
  const { message } = req.body;
  db.run('INSERT INTO feedback (message) VALUES (?)', [message], (err) => {
    if (err) {
      console.error("Insert error:", err.message);  // Add this line
      return res.status(500).send('DB error');
    }
    res.status(200).send('Feedback received');
  });
});

app.get('/feedback', (req, res) => {
  db.all('SELECT * FROM feedback', (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.json(rows);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));