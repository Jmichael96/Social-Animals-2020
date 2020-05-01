import * as types from '../actions/types';
const initialState = {
    posts: [],
    post: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.FETCH_ALL_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case types.CREATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case types.POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}