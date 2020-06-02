import * as types from './types';

export const setChat = (room, userObj, socket) => dispatch => {
    dispatch({
        type: types.ADD_TEXT,
    });
    socket.emit('join', room, userObj);
}

export const sendMessage = (room, userId, username, message, socket) => dispatch => {
    dispatch({
        type: types.SEND_MESSAGE
    });
    socket.emit('sendMessage', room, userId, username, message);
}