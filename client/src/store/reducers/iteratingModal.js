import * as types from '../actions/types';

const initialState = {
    isOpen: false,
    iteratingModalData: {
        data: null
    }
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_ITERATING_MODAL:
            return {
                ...state,
                iteratingModalData: payload,
                isOpen: true
            }
        case types.REMOVE_ITERATING_MODAL:
            return {
                ...state,
                isOpen: false,
                iteratingModalData: {
                    data: null
                }
            }
        default:
            return state;
    }
}