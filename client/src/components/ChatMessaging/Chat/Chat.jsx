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


const Chat = ({ fetchRoomData, fetchRoom, location, sendMessage, auth, chat: { loading, createdId, room, users, userMessages }, history }) => {
  const [roomData, setRoomData] = useState('');
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const [userData, setUserData] = useState();
  const [typingStr, setTypingStr] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  let timeout;

  useEffect(() => {
    // getting room name from query string
    const outerRoom = queryString.parse(location.search);
    // fetching data on the chat room to dispatch to initial state
    if (!auth.loading && !isEmpty(auth.user)) {
      let obj = {
        userId: auth.user._id,
        roomId: outerRoom.roomid
      }
      fetchRoom(socket, obj)
    }

    // ones fetch-room-data receives data about the chat room 
    // dispatch it to the reducers state
    socket.on('fetch-room-data', (res) => {
      let roomObj = {
        createdId: res.roomId,
        room: res.room,
        users: res.users,
        userMessages: res.userMessages
      }
      fetchRoomData(roomObj)
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
      setRoomData(createdId);
      setUserData(users);
      if (userMessages) {
        setMessageData((messages) => [...messages, ...userMessages]);
      }
      // check to see if authenticated user id is in the users array. 
      // if not then push them to the home page
      // if (users) {
      //   for (let i = 0; i < users.length; i++) {
      //     if (users[i].userId.toString() === auth.user._id) {
      //       return;
      //     }
      //     else {
      //       // history.push('/')
      //     }
      //   }
      // }
    }
  }, [loading, room, users, userMessages]);

  useEffect(() => {
    // checking if the user is typing and displaying the message
    if (!auth.loading && !isEmpty(auth.user)) {
      socket.on('display', (data) => {
        if (data.typing == true) {
          let user = data.user.toString();
          if (user === auth.user.username) {
            setTypingStr('');
          } else if (user !== auth.user.username) {
            setTypingStr(`${data.user} is typing...`);
          }
        } else {
          setTypingStr('')
        }
      })
    }
  }, [auth]);

  //roomId, userId1, userId2, messageUserId, username, message
  const submitMessage = (e) => {
    e.preventDefault();
    if (message) {
      if (!auth.loading && !isEmpty(auth.user)) {
        let msgObj = {
          roomId: createdId,
          userId1: users[0].userId,
          userId2: users[1].userId,
          messageUserId: auth.user._id,
          username: auth.user.username,
          message: message
        }
        sendMessage(socket, msgObj);
        setMessage('');
      }
    }
  }
  

  const typingStopped = () => {
    setIsTyping(false);
    socket.emit('typing', { user: auth.user.username, typing: false });
  }

  const onKeyUp = () => {
    if (isTyping == false) {
      setIsTyping(true)
      socket.emit('typing', { user: auth.user.username, typing: true });
      clearTimeout(timeout);
      timeout = setTimeout(typingStopped, 4000);
    }
  }

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <InfoBar users={userData} chatLoading={loading} auth={auth} />
        <Messages messages={messageData} />
        <div style={{ height: '90px', backgroundColor: 'grey' }}>{typingStr}</div>
        <Input message={message} setMessage={setMessage} sendMessage={submitMessage} onKeyUp={onKeyUp} />
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