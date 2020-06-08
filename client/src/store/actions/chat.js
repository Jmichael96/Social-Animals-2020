import * as types from './types';
import { uuid } from 'uuidv4'

// TESTING 

export const join = (socket, joinObj) => dispatch => {

    socket.emit('join', joinObj.name, joinObj.room);
}




// TESTING


// fetching chat room data
export const fetchRoom = (socket, obj) => dispatch => {
    socket.emit('fetchRoom', obj.userId, obj.roomId);
};

// send a message 
export const sendMessage = (socket, msgObj) => dispatch => {
    let messageId = uuid();

    socket.emit('sendMessage', msgObj.roomId, msgObj.userId1, msgObj.userId2, msgObj.messageUserId, msgObj.username, msgObj.message, messageId, msgObj.recipientUser);
}

// delete a message [userId, roomId, msgId]
export const deleteMessage = (socket, deleteObj) => dispatch => {
    // just assigning the deleteObj to a shorter variable because... SCIENCE & REASONS
    let dObj = deleteObj;
    console.log(dObj)
    socket.emit('deleteMessage', dObj.userId1, dObj.userId2, dObj.roomId, dObj.msgId);
}

// clear the chat data in store state
export const clearChat = () => dispatch => {
    dispatch({
        type: types.CLEAR_CHAT
    });
}