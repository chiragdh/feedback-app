import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element

root.render( // Use the 'render' method on the root
  <React.StrictMode>
    <App />
  </React.StrictMode>
);