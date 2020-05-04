import axios from 'axios'
import * as types from './types';

// fetch all usernames
export const fetchUsernames = () => dispatch => {
    axios.get('/api/user/usernames')
    .then((res) => {
        dispatch({
            type: types.FETCH_USERNAMES,
            payload: res.data
        });
        dispatch({
            type: types.CLEAR_PROFILE
        });
    })
    .catch((err) => {
        dispatch({
            type: types.USER_ERROR,
            payload: err
        });
    });
};