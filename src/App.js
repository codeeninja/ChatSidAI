import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBBMWbU9iDpiOZKz_izUfaNB_9LM6ccYqs');

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [initialMessage, setInitialMessage] = useState('Welcome to ChatAISid Developed by Shivam');

  const run = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = await response.text();
      setText(content);
    } catch (error) {
      console.error('Error generating content:', error);
      setText('An error occurred. Please try again.');
      setLoading(false); // Re-enable input and button if an error occurs
    }
  };

  const animateText = (text, selector, callback) => {
    const writingEl = document.querySelector(selector);
    if (writingEl) {
      let index = 0;
      writingEl.innerHTML = '';
      const interval = setInterval(() => {
        writingEl.innerHTML = text.substring(0, index++);
        if (index > text.length) {
          clearInterval(interval);
          if (callback) callback();
        }
      }, 80);
    }
  };

  useEffect(() => {
    animateText(initialMessage, '.initial-message', () => setLoading(false));
  }, []);

  useEffect(() => {
    if (text) {
      animateText(text, '.generated-content', () => setLoading(false));
    }
  }, [text]);

  return (
    <div className="container">
      <code className={`initial-message ${text ? 'hidden' : ''}`} style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>
        {initialMessage}
      </code>

      <img
        style={{ width: '17%' }}
        src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/7064f8105512449.5f7b1e51a8e7a.jpg"
        alt=""
      />

      <div className="content">
        <p className="generated-content">{text}</p>
      </div>
      <div className="controls">
        <input
          className="txtLarge"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          disabled={loading}
        />
        <button onClick={run} disabled={loading}>
          {loading ? 'Loading...' : 'Generate Content'}
        </button>
      </div>
      <footer className="footer">
        <p>Made with love in India. All rights reserved 2024-2025.</p>
      </footer>
    </div>
  );
}

export default App;
