import * as types from '../actions/types';

const initialState = {
    room: null,
    users: [],
    userMessages: [],
    allMessages: [],
    loading: true,
    serverMsg: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_CHAT:
        case types.FETCH_CHAT_ROOM:
        case types.FETCH_CHAT_DATA:
            return {
                ...state,
                room: payload.room,
                users: payload.users,
                userMessages: payload.userMessages,
                loading: false
            };
        case types.FETCH_ALL_CHAT_MESSAGES:
            return {
                ...state,
                allMessages: payload,
                loading: false
            }
        case types.CLEAR_CHAT:
            return {
                ...state,
                room: null,
                users: [],
                userMessages: [],
                loading: true
            };
        default:
            return state;
    }
}