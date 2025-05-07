import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  // Handle input change for feedback
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle feedback form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send feedback to the backend
    axios
      .post('http://localhost:3000/feedback', { message })
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

  // Fetch feedback history from the backend
  const handleGetHistory = () => {
    axios
      .get('http://localhost:3000/feedback')
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

      {/* Feedback Form */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={handleChange}
          placeholder="Enter your feedback here"
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>

      {/* Show Feedback History Button */}
      <button onClick={handleGetHistory}>Show Feedback History</button>

      {/* Display Feedback History */}
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