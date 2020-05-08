import * as types from './types';

// set iterating modal
export const setIteratingModal = (data) => dispatch => {
    dispatch({
        type: types.SET_ITERATING_MODAL,
        payload: { data }
    });
};

// remove iterating modal
export const removeIteratingModal = () => dispatch => {
    dispatch({
        type: types.REMOVE_ITERATING_MODAL,
    });
};