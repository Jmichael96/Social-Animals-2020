import * as types from '../actions/types';

const initialState = {
    user: null,
    users: [],
    loading: true,
    serverMsg: null,
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
        case types.FETCH_USER_PROFILE:
        case types.CREATE_PROFILE:
            return {
                ...state,
                user: payload,
                loading: false
            };
        case types.FOLLOW_PROFILE:
        case types.UNFOLLOW_PROFILE:
            return {
                ...state,
                user: (user) => {
                    if (user._id === user.id) {
                        return { ...user, followers: payload.followers };
                    }
                    return user;
                },
                loading: false
            }
        case types.CLEAR_PROFILE:
            return {
                ...state,
                user: null,
                loading: true
            }
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