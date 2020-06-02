import axios from 'axios'
import * as types from './types';
import { setAlert } from './alert';
import { loadUser } from './auth';

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

// update user
export const updateProfilePicture = ({ id, profilePicture }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const data = new FormData();
    data.append('image', profilePicture);

    axios.put(`/api/user/update_profile_pic/${id}`, data, config)
        .then((res) => {
            dispatch({
                type: types.UPDATE_PROFILE_PIC,
                payload: res.data
            })

        })
        .catch((err) => {
            dispatch({
                type: types.USER_ERROR,
                payload: err
            });
        });
};

// update profile
export const updateProfile = ({ id, profilePicture, name, bio, location, email }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const data = new FormData();
    if (!profilePicture) {
        data.append('profilePicture', profilePicture);
        data.append('name', name);
        data.append('bio', bio);
        data.append('location', location);
        data.append('email', email);
    } else if (profilePicture) {
        data.append('image', profilePicture);
        data.append('name', name);
        data.append('bio', bio);
        data.append('location', location);
        data.append('email', email);
    }

    axios.put(`/api/user/update_profile/${id}`, data, config)
        .then((res) => {
            dispatch({
                type: types.UPDATE_PROFILE,
                payload: res.data
            });
            dispatch(loadUser())
            dispatch(setAlert('Updated profile', 'success'));
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.USER_ERROR,
                payload: err
            });
        });
}

// fetching user profile by ID
export const fetchProfileById = (id) => dispatch => {
    console.log('fetching user profile in actions')
    axios.get(`/api/user/user_profile/${id}`)
        .then((res) => {
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
        });
};


// follow profile
export const followProfile = (id) => dispatch => {
    axios.put(`/api/user/follow/${id}`)
        .then((res) => {
            dispatch({
                type: types.FOLLOW_PROFILE,
                payload: res.data.user
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.PROFILE_ERROR,
                payload: err
            });
        });
};

// unfollow profile
export const unfollowProfile = (id) => dispatch => {
    axios.put(`/api/user/unfollow/${id}`)
        .then((res) => {
            dispatch({
                type: types.FOLLOW_PROFILE,
                payload: res.data.user
            });
            dispatch(setAlert('You have successfully unfollowed this user', 'success'));
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.PROFILE_ERROR,
                payload: err
            });
        });
};

// set following array for current authenticated user
export const setFollowing = (userId, username) => dispatch => {
    axios.put(`/api/user/set_following/${userId}/${username}`)
    .then((res) => {
        dispatch({
            type: types.SET_FOLLOWING,
            payload: { user: res.data.user, serverMsg: res.data.serverMsg }
        });
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: types.PROFILE_ERROR,
            payload: err
        });
    });
}

// unset following array for current authenticated user
export const unsetFollowing = (userId) => dispatch => {
    axios.put(`/api/user/unset_Following/${userId}`)
    .then((res) => {
        dispatch({
            type: types.SET_FOLLOWING,
            payload: { user: res.data.user, serverMsg: res.data.serverMsg }
        });
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: types.PROFILE_ERROR,
            payload: err
        });
    });
}

// set chat room up
export const setChat = (id) => dispatch => {
    // axios.post(`/api/user/set_chat/${id}`)
    // .then((res) => {
    //     dispatch({
    //         type: types.SET_CHAT
    //     });
    // })
    // .catch((err) => {
    //     console.log(err);
    //     dispatch({
    //         type: types.PROFILE_ERROR,
    //         payload: err
    //     });
    // });
}