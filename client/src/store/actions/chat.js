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
};

// fetch all the chat data and store it in the stores state
export const fetchRoomData = (room, users, userMessages) => dispatch => {
    console.log(room, users, userMessages)
        dispatch({
            type: types.FETCH_CHAT_DATA,
            payload: {
                room: room,
                users: users,
                userMessages: userMessages
            }
        });       
}

// fetch all chat messages for authenticated user
export const fetchAllChatMessages = (userId, socket) => dispatch => {
    socket.emit('fetchChatMessages', userId);

    socket.on('fetch-chat-messages', (res) => {
        dispatch({
            type: types.FETCH_ALL_CHAT_MESSAGES,
            payload: res.messages
        })
    })
}