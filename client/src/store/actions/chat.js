import * as types from './types';

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

export const sendMessage = (room, userId, username, message, socket) => dispatch => {
    dispatch({
        type: types.SEND_MESSAGE
    });
    socket.emit('sendMessage', room, userId, username, message);
}

// fetching chat room data
export const fetchRoom = (room, socket) => dispatch => {
    socket.emit('fetchRoom', room);


    // socket.on('fetched-room', (res) => {
    //     dispatch({
    //         type: types.FETCH_CHAT_ROOM,
    //         payload: {
    //             room: res.room,
    //             users: res.users,
    //             userMessages: res.userMessages
    //         }
    //     });
    // })

};