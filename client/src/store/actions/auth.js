import axios from 'axios';
import { setAlert } from './alert';
import * as types from './types';
import setAuthToken from '../../utils/setAuthToken';

// Load User
export const loadUser = () => dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    axios.get('/api/auth/load_user')
    .then((res) => {
        dispatch({
            type: types.USER_LOADED,
            payload: res.data
        });
    })
    .catch((err) => {
        dispatch({
            type: types.AUTH_ERROR
        });
    });
};

// register
export const register = ({ ...formData }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(formData);

    dispatch({
        type: types.REGISTER_SUCCESS,
        payload: formData
    });
    dispatch(setAlert('Successfully registered!', 'success'))
}

// login
export const login = ({ ...formData }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log(formData);

    dispatch({
        type: types.LOGIN_SUCCESS,
        payload: formData
    });
    dispatch(setAlert('Successfully logged in!', 'success'))

}
