import * as types from './types';

// fetching chat room data
export const fetchRoom = (socket, obj) => dispatch => {
    socket.emit('fetchRoom', obj.userId, obj.roomId);
};

// send a message 
export const sendMessage = (socket, msgObj) => dispatch => {
    socket.emit('sendMessage', msgObj.roomId, msgObj.userId1, msgObj.userId2, msgObj.messageUserId, msgObj.username, msgObj.message);
}

// delete a message [userId, roomId, msgId]
export const deleteMessage = (socket, deleteObj) => dispatch => {
    // just assigning the deleteObj to a shorter variable because... SCIENCE & REASONS
    let dObj = deleteObj;
    socket.emit('deleteMessage', dObj.userId1, dObj.userId2, dObj.roomId, dObj.msgId);
}

// clear the chat data in store state
export const clearChat = () => dispatch => {
    dispatch({
        type: types.CLEAR_CHAT
    });
}