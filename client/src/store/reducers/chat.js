import * as types from '../actions/types';

const initialState = {
    createdId: null,
    room: null,
    users: [],
    userMessages: [],
    loading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_CHAT:
        case types.FETCH_CHAT_DATA:
            return {
                ...state,
                createdId: payload.roomId,
                room: payload.room,
                users: payload.users,
                userMessages: payload.userMessages,
                loading: false
            };
        case types.DELETE_MESSAGE:
            return {
                ...state,
                userMessages: payload,
                loading: false
            }
        case types.SEND_MESSAGE:
            return {
                ...state,
                userMessages: payload,
                loading: false
            }
        case types.CLEAR_CHAT:
            return {
                ...state,
                room: null,
                users: [],
                userMessages: [],
                allMessages: [],
                loading: true
            };
        default:
            return state;
    }
}