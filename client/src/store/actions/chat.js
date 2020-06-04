import * as types from './types';

// set the chat room when creating a new message
export const setChat = (room, userObj, socket) => dispatch => {
    // console.log(room);
    // socket.emit('join', room, userObj);

    // socket.on('chat-created', (res) => {
    //     console.log(res);
    //     dispatch({
    //         type: types.SET_CHAT,
    //         payload: {
    //             room: res.room,
    //             users: res.users,
    //             userMessages: res.userMessages
    //         }
    //     });
    //     window.location.href = `/chat?room=${res.room}`;
    // })
}

// fetching chat room data
export const fetchRoom = (socket, obj) => dispatch => {
    socket.emit('fetchRoom', obj.userId, obj.roomId);
};

// fetch all the chat data and store it in the stores state
export const fetchRoomData = (roomObj) => dispatch => {
    dispatch({
        type: types.FETCH_CHAT_DATA,
        payload: {
            roomId: roomObj.createdId,
            room: roomObj.room,
            users: roomObj.users,
            userMessages: roomObj.userMessages
        }
    });
}

// send a message [roomId, userId1, userId2, messageUserId, username, message]
export const sendMessage = (socket, msgObj) => dispatch => {
    dispatch({
        type: types.SEND_MESSAGE
    });
    console.log(msgObj);
    socket.emit('sendMessage', msgObj.roomId, msgObj.userId1, msgObj.userId2, msgObj.messageUserId, msgObj.username, msgObj.message);
}

// clear the chat data in store state
export const clearChat = () => dispatch => {
    dispatch({
        type: types.CLEAR_CHAT
    });
}