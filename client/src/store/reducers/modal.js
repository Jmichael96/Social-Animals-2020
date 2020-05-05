import * as types from '../actions/types';

const initialState = {
    isOpen: false,
    modalData: {
        modalContent: null,
        modalActionText: null,
        modalAction: () => {}
    }
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SET_MODAL:
            return {
                ...state,
                modalData: payload,
                isOpen: true
            };
        case types.REMOVE_MODAL:
            return {
                ...state,
                isOpen: false,
                modalData: {
                    modalContent: null,
                    modalActionText: null,
                    modalAction: () => {}
                }
            }
        default:
            return state;
    }
}