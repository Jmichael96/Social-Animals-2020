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
            console.log(res);
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
    console.log(formData)
    axios.post('/api/auth/register', formData, config)
        .then((res) => {
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(setAlert('Successfully registered!', 'success'))
            console.log(res.data + ' this is the data action!')

        })
        .catch((err) => {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((err) => {
                    dispatch(setAlert(err.msg, 'danger'));
                })
            }
            console.log(err)
            dispatch({
                type: types.REGISTER_FAIL
            });
        });
}

// login
export const login = ({ ...formData }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.post('/api/auth/login', formData, config)
    .then((res) => {
        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: res.data
        });
        // dispatch(setAlert('Successfully logged in!', 'success'))
    })
    .catch((err) => {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(err.msg, 'danger')));
        }
        dispatch({
            type: types.LOGIN_FAIL
        });
    })

}
