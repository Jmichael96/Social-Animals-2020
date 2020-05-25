import * as types from '../actions/types';
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    serverMsg: null
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case types.SET_FOLLOWING:
        case types.UNSET_FOLLOWING:
            return {
                ...state,
                user: payload.user,
                serverMsg: payload.serverMsg,
                isAuthenticated: true,
                loading: false
            }
        case types.UPDATE_PROFILE:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case types.REGISTER_FAIL:
        case types.LOGIN_FAIL:
        case types.AUTH_ERROR:
        case types.NOT_AUTHENTICATED:
        case types.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state;
    }
}
