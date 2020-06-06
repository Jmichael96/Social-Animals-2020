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
import { withRouter } from 'react-router-dom';

let socket = io.connect('http://localhost:8080');


const Chat = ({ fetchRoom, location, sendMessage, auth, history }) => {
  const [roomData, setRoomData] = useState('');
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const [userData, setUserData] = useState();
  const [typingStr, setTypingStr] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [outerRoom, setOuterRoom] = useState('');

  let timeout;

  useEffect(() => {
    // getting room name from query string
    const roomStr = queryString.parse(location.search);
    setOuterRoom(roomStr);
  }, [location.search]);

  useEffect(() => {
    // fetching data on the chat room to dispatch to initial state
    if (!auth.loading && !isEmpty(auth.user)) {
      let obj = {
        userId: auth.user._id,
        roomId: outerRoom.roomid
      }
      fetchRoom(socket, obj)
    }
  }, [auth]);

  // fetch all the room data and assigning it to the variables with useState()
  useEffect(() => {
    socket.on('fetch-room-data', (res) => {
      setMessageData(res.userMessages);
      setUserData(res.users);
      setRoomData(res.roomId)
    })
  }, []);

  useEffect(() => {
    // add message to messages array upon sending a message
    socket.on('receive-message', (message) => {
      // setMessageData(messages => [...messages, message]);
    });
  }, []);

  // fetch all messages after a new one is submitted
  useEffect(() => {
    socket.on('fetched-new-messages', (res) => {
      setMessageData(res.userMessages);
    });
  }, []);

  // fetch all messages after deleting one
  useEffect(() => {
    socket.on('fetched-deleted-messages', (res) => {
      setMessageData(res.userMessages);
    });
  }, []);

  // used for if the user is typing the render the appropriate message
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
    if (!auth.loading && !isEmpty(auth.user) && !isEmpty(userData) && !isEmpty(roomData)) {
      let authUser = '';
      let otherUser = '';
      // getting the specific user id's to assign in the msgObj
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].userId.toString() === auth.user._id) {
          authUser = userData[i].userId;
        }
        otherUser = userData[i].userId;
      }

      let msgObj = {
        roomId: roomData,
        userId1: userData[0].userId,
        userId2: userData[1].userId,
        messageUserId: auth.user._id,
        username: auth.user.username,
        message: message
      }
      sendMessage(socket, msgObj);
      setMessage('');
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

  const renderMessages = () => {
    if (!isEmpty(userData) && !isEmpty(roomData)) {
      return <Messages messages={messageData} users={userData} socket={socket} roomId={roomData} />
    }
  }

  
  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <InfoBar users={userData} auth={auth} />
        {renderMessages()}
        <div style={{ height: '90px', backgroundColor: 'grey' }}>{typingStr}</div>
        <Input message={message} setMessage={setMessage} sendMessage={submitMessage} onKeyUp={onKeyUp} />
      </div>
    </div>
  );
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  fetchRoom: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.any,
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (room, userId, username, message, socket) => dispatch(sendMessage(room, userId, username, message, socket)),
    fetchRoom: (room, socket) => dispatch(fetchRoom(room, socket)),
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const exportChat = withRouter(Chat);
export default connect(mapStateToProps, mapDispatchToProps)(exportChat);