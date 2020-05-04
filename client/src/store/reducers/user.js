import * as types from '../actions/types';

const initialState = {
    users: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.FETCH_USERNAMES:
            return {
                ...state,
                users: payload,
                loading: false
            };
        case types.USER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };
        default:
            return state;
    }
}