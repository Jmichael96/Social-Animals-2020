import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { sendMessage, fetchRoom, join } from '../../../store/actions/chat';
import './chat.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../utils/isEmpty';
import { withRouter } from 'react-router-dom';

let socket = io.connect('http://localhost:8080');

const Chat = ({ fetchRoom, location, sendMessage, auth, join, history }) => {
  const [message, setMessage] = useState('');
  const [messageData, setMessageData] = useState([]);
  const [userData, setUserData] = useState();
  const [typingStr, setTypingStr] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [outerRoom, setOuterRoom] = useState();

  let timeout;

  useEffect(() => {
    // getting room name from query string
    const roomStr = queryString.parse(location.search);
    setOuterRoom(roomStr.roomid);
    socket.emit('subscribe', roomStr.roomid);
  }, [location.search]);

  useEffect(() => {
    socket.on('private-message', (data) => {
      console.log(data);
    })
  },[])
  // TESTING
  // useEffect(() => {
  //   if (!auth.loading && !isEmpty(auth.user) && !isEmpty(outerRoom)) {
  //     let joinObj = {
  //       name: auth.user._id,
  //       room: outerRoom
  //     }
  //     join(socket, joinObj);
  //   }
  // }, [auth, outerRoom]);
  
  // useEffect(() => {
  //   socket.on('roomData', (res) => {
  //     console.log(res);
  //   })
  // }, []);

  useEffect(() => {
    // fetching data on the chat room to dispatch to initial state
    if (!auth.loading && !isEmpty(auth.user) && !isEmpty(outerRoom)) {
      let obj = {
        userId: auth.user._id,
        roomId: outerRoom
      }
      
      fetchRoom(socket, obj)
    }
  }, [auth, outerRoom]);

  // fetch all the room data and assigning it to the variables with useState()
  useEffect(() => {
    socket.on('fetch-room-data', (res) => {
      
      setMessageData(res.userMessages);
      setUserData(res.users);
    })
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

  // submit the message func
  const submitMessage = (e) => {
    e.preventDefault();
    if (!auth.loading && !isEmpty(auth.user) && !isEmpty(userData) && !isEmpty(outerRoom)) {
      
      let recipientUser = '';
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].userId.toString() !== auth.user._id) {
          recipientUser = userData[i].userId;
        }
      }
      let msgObj = {
        roomId: outerRoom,
        userId1: userData[0].userId,
        userId2: userData[1].userId,
        messageUserId: auth.user._id,
        username: auth.user.username,
        message: message,
        recipientUser: recipientUser
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
    if (!isEmpty(userData) && !isEmpty(outerRoom)) {
      return <Messages messages={messageData} users={userData} socket={socket} roomId={outerRoom} />
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
  join: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.any,
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (room, userId, username, message, socket) => dispatch(sendMessage(room, userId, username, message, socket)),
    fetchRoom: (room, socket) => dispatch(fetchRoom(room, socket)),
    join: (name, room, socket) => dispatch(join(name, room, socket))
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const exportChat = withRouter(Chat);
export default connect(mapStateToProps, mapDispatchToProps)(exportChat);