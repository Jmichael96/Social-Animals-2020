import * as types from './types';

// set the chat room when creating a new message
export const setChat = (room, userObj, socket) => dispatch => {
    console.log(room);
    socket.emit('join', room, userObj);

    socket.on('chat-created', (res) => {
        console.log(res);
        dispatch({
            type: types.SET_CHAT,
            payload: {
                room: res.room,
                users: res.users,
                userMessages: res.userMessages
            }
        });
        window.location.href = `/chat?room=${res.room}`;
    })
}

// send a message
export const sendMessage = (room, userId, username, message, socket) => dispatch => {
    dispatch({
        type: types.SEND_MESSAGE
    });
    socket.emit('sendMessage', room, userId, username, message);
}

// fetching chat room data
export const fetchRoom = (room, socket) => dispatch => {
    socket.emit('fetchRoom', room);
};

// fetch all the chat data and store it in the stores state
export const fetchRoomData = (room, users, userMessages) => dispatch => {
    dispatch({
        type: types.FETCH_CHAT_DATA,
        payload: {
            room: room,
            users: users,
            userMessages: userMessages
        }
    });
}

// clear the chat data in store state
export const clearChat = () => dispatch => {
    dispatch({
        type: types.CLEAR_CHAT
    });
}