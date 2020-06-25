import * as types from './types';


export const setPostModal = () => dispatch => {
    dispatch({
        type: types.SET_POST_MODAL,
    });
};

export const removePostModal = () => dispatch => {
    dispatch({
        type: types.REMOVE_POST_MODAL,
    });
    dispatch({
        type: types.CLEAR_POST_CONTENT
    });
};