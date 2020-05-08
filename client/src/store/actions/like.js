import * as types from './types';
import axios from 'axios';

// fetch likes in a desired post
export  const fetchLikes = (id) => dispatch => {
    axios.get(`/api/posts/fetch_likes/${id}`)
    .then((res) => {
        dispatch({
            type: types.FETCH_LIKES,
            payload: res.data
        });
    })
    .catch((err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        dispatch({
            type: types.LIKE_ERROR,
            payload: err
        });
    })
}