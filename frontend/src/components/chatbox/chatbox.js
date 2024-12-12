import React, { useState } from "react";
import "../../components/chatbox/chatbox.css";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle chatbox visibility
  const [messages, setMessages] = useState([]); // Store chat messages
  const [input, setInput] = useState(""); // Message input field

  const API_URL = "https://api.deepinfra.com/v1/openai/chat/completions";
  const API_TOKEN = "y1kop1133RbIpnPAqbDp1u6Y82T9mhXD";

  // Handle sending a message
  const sendMessage = async () => {
    if (!input.trim()) return; // Ignore empty messages

    // Add the user's message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input field

    // Send message to the API
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3.1-70B-Instruct",
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0]?.message?.content) {
        const botMessage = {
          sender: "bot",
          text: data.choices[0].message.content,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, I didn't understand that." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong!" },
      ]);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="chatbox-floating-button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        💬
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header">
            <span>Virtual Assistant</span>
            <button
              className="chatbox-close-button"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbox-message ${
                  msg.sender === "user" ? "chatbox-user" : "chatbox-bot"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
