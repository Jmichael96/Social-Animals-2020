import axios from 'axios';
import { setAlert } from './alert';
import * as types from './types';

// fetching current users profile
export const fetchCurrentProfile = () => dispatch => {
    axios.get('/api/profile/me')
        .then((res) => {
            dispatch({
                type: types.FETCH_USER_PROFILE,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.PROFILE_ERROR,
                payload: err
            });
        });
};

// create profile
export const createProfile = ({ ...formData }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log(formData);

    axios.post('/api/profile/create_profile', formData, config)
    .then((res) => {
        dispatch({
            type: types.CREATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Profile updated!', 'success'));
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: types.PROFILE_ERROR,
            payload: err
        });
    })
}

// fetching user profile by ID
export const fetchProfileById = (id) => dispatch => {
    axios.get(`/api/profile/user_profile/${id}`)
    .then((res) => {
        console.log(res.data);
        
        dispatch({
            type: types.FETCH_USER_PROFILE,
            payload: res.data
        })
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: types.PROFILE_ERROR,
            payload: err
        });
    })
}

