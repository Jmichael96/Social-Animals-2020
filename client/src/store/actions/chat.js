import * as types from './types';

// set the chat room when creating a new message
export const setChat = (room, userObj, socket) => dispatch => {

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

// send a message 
export const sendMessage = (socket, msgObj) => dispatch => {
    socket.emit('sendMessage', msgObj.roomId, msgObj.userId1, msgObj.userId2, msgObj.messageUserId, msgObj.username, msgObj.message);
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