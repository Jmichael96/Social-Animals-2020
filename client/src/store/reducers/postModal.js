import * as types from '../actions/types';

const initialState = {
    isOpen: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_POST_MODAL:
            return {
                ...state,
                isOpen: true,
            };
        case types.REMOVE_POST_MODAL:
            return {
                ...state,
                isOpen: false,
            }
        default:
            return state;
    }
}