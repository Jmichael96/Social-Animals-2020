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

// update post
export const updatePost = (id, formData) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.put(`/api/posts/update_post/${id}`, formData, config)
        .then((res) => {
            dispatch({
                type: types.UPDATE_POST,
                payload: res.data
            });
            dispatch(fetchAllPosts());
            dispatch(setAlert('Updated post successfully', 'success'));
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
            dispatch({
                type: types.CLEAR_PROFILE
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

// delete a post
export const deletePost = (id) => dispatch => {
    axios.delete(`/api/posts/delete_post/${id}`)
        .then((res) => {
            dispatch({
                type: types.DELETE_POST,
                payload: res.data
            });
            dispatch(fetchAllPosts());
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

// like a post
export const likePost = (id) => dispatch => {
    axios.put(`/api/posts/like/${id}`)
        .then((res) => {
            dispatch({
                type: types.UPDATE_LIKES,
                payload: { id, likes: res.data }
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

// unlike a post
export const unlikePost = (id) => dispatch => {
    axios.put(`/api/posts/unlike/${id}`)
        .then((res) => {
            dispatch({
                type: types.UPDATE_LIKES,
                payload: { id, likes: res.data }
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
        });
}

// add a comment
export const addComment = (id, formData) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.post(`/api/posts/comment/${id}`, formData, config)
        .then((res) => {
            dispatch({
                type: types.ADD_COMMENT,
                payload: res.data
            });
            dispatch(setAlert('Added comment', 'success'));
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
        });
};

// delete comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/delete_comment/${postId}/${commentId}`)
    .then((res) => {
        dispatch({
            type: types.DELETE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment removed', 'success'));
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
    });
};