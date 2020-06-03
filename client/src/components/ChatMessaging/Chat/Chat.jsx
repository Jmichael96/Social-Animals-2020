import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { sendMessage, fetchRoom } from '../../../store/actions/chat';
import './chat.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';

let socket = io.connect('http://localhost:8080');


const Chat = ({ fetchRoom, location, sendMessage, auth, chat }) => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // getting room name from query string
    const { room } = queryString.parse(location.search);
    // setting room name in component state to pass as props
    setRoom(room);
    if (room) {
      // fetching room data from action
      fetchRoom(room, socket);
    }

    // add message to messages array upon sending a message
    socket.on('receive-message', (message) => {
      setMessages(messages => [...messages, message]);
    });

    // fetch room data and messages
    socket.on('fetched-room', (res) => {
      setMessages(messages => [...messages, ...res.userMessages]);
      setUsers((users) => [...users, ...res.users]);
    });


  }, [location.search, fetchRoom, chat.loading, chat.userMessages]);

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
  fetchRoom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (room, userId, username, message, socket) => dispatch(sendMessage(room, userId, username, message, socket)),
    fetchRoom: (room, socket) => dispatch(fetchRoom(room, socket))
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);