import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { sendMessage, fetchRoom, fetchRoomData } from '../../../store/actions/chat';
import './chat.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';
import { withRouter } from 'react-router-dom';

let socket = io.connect('http://localhost:8080');


const Chat = ({ fetchRoomData, fetchRoom, location, sendMessage, auth, chat: { loading, room, users, userMessages }, history }) => {
  const [roomData, setRoomData] = useState('');
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    // getting room name from query string
    const outerRoom = queryString.parse(location.search);

    // fetching data on the chat room to dispatch to initial state
    if (!auth.loading && !isEmpty(auth.user)) {
      fetchRoom(outerRoom.room, socket)
    }

    // ones fetch-room-data receives data about the chat room 
    // dispatch it to the reducers state
    socket.on('fetch-room-data', (res) => {
      fetchRoomData(res.room, res.users, res.userMessages)
    });

  }, [location.search, fetchRoom, fetchRoomData, auth]);

  useEffect(() => {
    // add message to messages array upon sending a message
    socket.on('receive-message', (message) => {
      setMessageData(messages => [...messages, message]);
    });
  }, []);


  useEffect(() => {
    // wait for chat data in the store and assign it with the useState methods
    if (!loading && !isEmpty(room)) {
      setRoomData(room);
      setMessageData((messages) => [...messages, ...userMessages]);
      setUserData(users);
      
      // check to see if authenticated user id is in the users array. 
      // if not then push them to the home page
      if (users) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].userId.toString() === auth.user._id) {
            return;
          }
          else {
            history.push('/')
          }
        }
      }
    }
  }, [loading, room, users, userMessages]);


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
        <InfoBar room={roomData} users={userData} chatLoading={loading} auth={auth} />
        <Messages messages={messageData} />
        <Input message={message} setMessage={setMessage} sendMessage={submitMessage} />
      </div>
    </div>
  );
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  fetchRoom: PropTypes.func.isRequired,
  fetchRoomData: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  history: PropTypes.any,
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (room, userId, username, message, socket) => dispatch(sendMessage(room, userId, username, message, socket)),
    fetchRoom: (room, socket) => dispatch(fetchRoom(room, socket)),
    fetchRoomData: (room, users, userMessages) => dispatch(fetchRoomData(room, users, userMessages))
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat
});

const exportChat = withRouter(Chat);
export default connect(mapStateToProps, mapDispatchToProps)(exportChat);