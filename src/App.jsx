import React, { useState, useEffect } from "react";
import "./App.css";
import Gemini from "./api/Gemini"; 

function App() {
  const [userInput, setUserInput] = useState("");
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);

  
  const generateAIText = async (text) => {
    try {
      setLoading(true);
      const gemini = new Gemini();
      const result = await gemini.generateContent({
        message: `Continue this sentence naturally: "${text}"`,
      });

    
      console.log("AI response =>", result);
      setAiText(result);
    } catch (err) {
      console.error("Error generating content:", err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (!userInput.trim()) {
      setAiText("");
      return;
    }

    const timer = setTimeout(() => {
      generateAIText(userInput);
    }, 1500);

    return () => clearTimeout(timer);
  }, [userInput]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setAiText(""); 
  };

  return (
    <div className="app">
      <h2>🤖 AI Fill The Blanks</h2>

      <textarea
        placeholder="Start typing..."
        value={userInput}
        onChange={handleChange}
      />

      {loading && <p className="loading">Thinking...</p>}

      {!loading && aiText && (
        <div className="output">
          <p>
            <span className="user-text">{userInput}</span>{" "}
            <span className="ai-text">{aiText}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
