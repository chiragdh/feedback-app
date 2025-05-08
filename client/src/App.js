import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  // LIVE BACKEND URL
  const BASE_URL = 'https://feedback-app-qxrj.onrender.com'; // <-- Replace with your actual URL

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${BASE_URL}/feedback`, { message })
      .then((response) => {
        if (response.status === 200) {
          alert('Feedback received!');
          setMessage('');
        }
      })
      .catch((error) => {
        alert('Error: Could not submit feedback.');
        console.error('Error:', error);
      });
  };

  const handleGetHistory = () => {
    axios
      .get(`${BASE_URL}/feedback`)
      .then((response) => {
        setFeedbackHistory(response.data);
      })
      .catch((error) => {
        alert('Error: Could not fetch feedback history.');
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <h1>Feedback App</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={handleChange}
          placeholder="Enter your feedback here"
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>

      <button onClick={handleGetHistory}>Show Feedback History</button>

      <div>
        {feedbackHistory.length > 0 && (
          <ul>
            {feedbackHistory.map((feedback, index) => (
              <li key={index}>{feedback.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
