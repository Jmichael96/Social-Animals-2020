import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import PropTypes from 'prop-types';

import './messages.css';

const Messages = ({ messages, roomId, socket, users }) => {
  console.log(messages);
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) =>
        <div key={i}>
          <Message message={message} socket={socket} users={users} roomId={roomId} />
        </div>
      )}
    </ScrollToBottom>
  );
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  socket: PropTypes.any,
};

export default Messages;