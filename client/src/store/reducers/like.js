import * as types from '../actions/types';
const initialState = {
    likes: [],
    loading: true,
    error: {}
}
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.FETCH_LIKES:
            return {
                ...state,
                likes: payload,
                loading: false
            }
        case types.REMOVE_LIKES:
            return {
                ...state,
                likes: [],
                loading: false
            }
        case types.LIKE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
} 