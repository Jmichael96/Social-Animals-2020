import React from 'react';
import './input.css';

const Input = ({ setMessage, sendMessage, message, onKeyUp }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      onKeyUp={onKeyUp}
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;