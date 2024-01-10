import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [inputData, setInputData] = useState('');
  const [result, setResult] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    // Call OpenAI API with inputData
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `#calculate OEE using the JSON provided ${inputData}`,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      });

      console.log(response.data.choices[0].text);
      // Process and display the result
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  }
   return (
    <div className="App">
      <header className="App-header">
        {/* Dropdown selection for plants */}
        <div className="dropdown">
          <label htmlFor="refinery-selector">Select your Refinery</label>
          <select id="plant-selector">
            <option value="refinery1">Refinery 1</option>
            <option value="refinery2">Refinery 2</option>
            <option value="refinery3">Refinery 3</option>
            <option value="refinery4">Refinery 4</option>
          </select>
        </div>

        {/* Cards for machinery */}
        <div className="card-container">
          <div className="card">Pipeline 1 </div>
          <div className="card">Pipeline 2</div>
        </div>
        
        <div className="oee-calculator">
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter JSON and text here"
        />
        <button type="submit">Calculate Flow Rate</button>
      </form>
    </div>
    <div className="result">
  {result && <p>OEE Result: {result}</p>}
</div>


      </header>
    </div>
    
      );

}

export default App;
