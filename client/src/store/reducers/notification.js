import * as types from '../actions/types';

const initialState = {
    notifications: [],
    loading: true    
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case types.FETCH_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload,
                loading: false
            }
        case types.NOTIFY_ERROR:
            return {
                ...state,
                notifications: [],
                loading: false
            }
        default: 
        return state;
    }
}
