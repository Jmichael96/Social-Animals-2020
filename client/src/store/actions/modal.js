import * as types from './types';

export const setModal = (modalContent, modalActionText, modalAction) => dispatch => {
    dispatch({
        type: types.SET_MODAL,
        payload: { modalContent, modalActionText, modalAction }
    });
};

export const removeModal = () => dispatch => {
    dispatch({
        type: types.REMOVE_MODAL,
    });
};