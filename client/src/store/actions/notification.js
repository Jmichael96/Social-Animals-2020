import * as types from './types';
import axios from 'axios';
import { setAlert } from './alert';

// send a notification to the specified user
export const notifyUser = (notifyObj) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.post('/api/notify/notify_user', notifyObj, config)
        .then((res) => {
            dispatch({
                type: types.NOTIFY_USER
            });
        })
        .catch((err) => {
            console.log(err);
            const error = err.response.data.serverMsg;
        });
};

// fetch authenticated user's notifications
export const fetchNotifications = () => dispatch => {
    axios.get('/api/notify/fetch_notifications')
    .then((res) => {
        dispatch({
            type: types.FETCH_NOTIFICATIONS,
            payload: res.data
        });
    })
    .catch((err) => {
        console.log(err);
        const error = err.response.data.serverMsg;
        dispatch(setAlert(error, 'danger'));
    });
};

// set has viewed for the authenticated users notifications
export const hasViewed = (id) => dispatch => {
    axios.put(`/api/notify/has_viewed/${id}`)
    .catch((err) => {
        console.log(err);
        const error = err.response.data.serverMsg;
        dispatch(setAlert(error, 'danger'));
    })
}