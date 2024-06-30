import React, { useState } from 'react';
import './App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBBMWbU9iDpiOZKz_izUfaNB_9LM6ccYqs');

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
     <h1 className={text ? 'hidden' : ''} style={{ color: 'red' }}>This chat Bot is Design n Developed By Shivam</h1>
    <img style={{width:"10%"}} src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/7064f8105512449.5f7b1e51a8e7a.jpg" alt="" />

      <div className="content">
        <p>{text}</p>
      </div>
      <div className="controls">
        <input
        className='txtLarge'
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button onClick={run} disabled={loading}>
          {loading ? 'Loading...' : 'Generate Content'}
        </button>
      </div>
    </div>
  );
}

export default App;
