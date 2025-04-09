import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/query", {
        query,
      });

      const { summary } = response.data;

      const newConversation = [
        ...conversation,
        { role: "user", content: `Summarize Article (Topic: ${query})` },
        { role: "agent", content: `Summary: ${summary}` },
      ];

      setConversation(newConversation);
    } catch (error) {
      console.error("Error communicating with the backend:", error);
      alert("An error occurred while processing your request.");
    } finally {
      setQuery("");
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Lab 5 Summarizer</h1>

      <div className="conversation-box">
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <strong>{message.role === "user" ? "You" : "Agent"}:</strong>{" "}
            {message.content}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query..."
          disabled={loading}
        />
        <button onClick={sendQuery} disabled={loading}>
          {loading ? "Processing..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default App;
