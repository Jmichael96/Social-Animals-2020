import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { sendMessage } from '../../../store/actions/chat';
import './chat.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';

let socket = io.connect('http://localhost:8080');

const Chat = ({ location, sendMessage, auth }) => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:8080';

  useEffect(() => {
    const { room } = queryString.parse(location.search);
    setRoom(room);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('receive-message', (message) => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const submitMessage = (e) => {
    e.preventDefault();
    if (message) {
      if (!auth.loading && !isEmpty(auth.user)) {
        sendMessage(room, auth.user._id, auth.user.username, message, socket);
        setMessage('');
      }
    }
  }

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <InfoBar room={room} />
        <Messages messages={messages} />
        <Input message={message} setMessage={setMessage} sendMessage={submitMessage} />
      </div>
    </div>
  );
}
Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { sendMessage })(Chat);