import axios from 'axios';
import * as types from './types';
import { setAlert } from './alert';

// create post
export const createPost = ({ ...formData }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.post('/api/posts/create_post', formData, config)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: types.CREATE_POST,
                payload: res.data
            });
            dispatch(setAlert('Your post has been created!', 'success'))
        })
        .catch((err) => {

            if (err) {
                console.log(err);
                throw err;
            }

            dispatch({
                type: types.POST_ERROR,
                payload: err
            });
        })
}
// fetch all posts
export const fetchAllPosts = () => dispatch => {
    axios.get('/api/posts/fetch_all')
        .then((res) => {
            dispatch({
                type: types.FETCH_ALL_POSTS,
                payload: res.data
            });
        })
        .catch((err) => {
            if (err) {
                console.log(err);
                throw err;
            }

            dispatch({
                type: types.POST_ERROR,
                payload: err
            });
        })
}