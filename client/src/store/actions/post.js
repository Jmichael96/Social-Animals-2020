import axios from 'axios';
import * as types from './types';
import { setAlert } from './alert';

// create post
export const createPost = ({ content, imagePath, postType, animalType }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const data = new FormData();
    for (let i = 0; i < imagePath.length; i++) {
        data.append('image', imagePath[i]);
    }
    data.append('content', content);
    data.append('postType', postType);
    data.append('animalType', animalType);

    axios.post('/api/posts/create_post', data, config)
        .then((res) => {
            dispatch({
                type: types.CREATE_POST,
                payload: res.data.createdPost
            });
            dispatch(fetchAllPosts())
            dispatch(setAlert(res.data.serverMsg, 'success'))
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
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
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
            // dispatch({
            //     type: types.CLEAR_CHAT
            // });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
            }

            dispatch({
                type: types.POST_ERROR,
                payload: err
            });
        });
}

// fetch adoption posts only and render it on adoption page
export const fetchAdoptionPosts = () => dispatch => {
    axios.get('/api/posts/fetch_adoption_posts')
    .then((res) => {
        dispatch({
            type: types.FETCH_ADOPTION_POSTS,
            payload: res.data
        });
        dispatch({
            type: types.CLEAR_PROFILE
        });
        dispatch({
            type: types.CLEAR_CHAT
        });
    })
    .catch((err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            dispatch(setAlert(error, 'danger'));
        }

        dispatch({
            type: types.POST_ERROR,
            payload: err
        });
    });
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
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
            }

            dispatch({
                type: types.POST_ERROR,
                payload: err
            });
        });
}

// like a post
export const likePost = (id, type) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.put(`/api/posts/like/${id}`, { type }, config)
        .then((res) => {
            dispatch({
                type: types.UPDATE_LIKES,
                payload: { id, likes: res.data }
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
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
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
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
                payload: { id, comments: res.data.comments }
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
            }

            dispatch({
                type: types.POST_ERROR,
                payload: err
            });
        });
};

// delete comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios.put(`/api/posts/delete_comment/${postId}/${commentId}`)
        .then((res) => {
            const id = postId;
            dispatch({
                type: types.DELETE_COMMENT,
                payload:  { id, comments: res.data.comments }
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
            }
            dispatch({
                type: types.POST_ERROR,
                payload: err
            });
        });
};

// update comment 
export const updateComment = (id, formData) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.put(`/api/posts/update_comment/${id}`, formData, config)
        .then((res) => {
            dispatch({
                type: types.UPDATE_COMMENT,
            });
            dispatch(fetchAllPosts())
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
            }
            dispatch({
                type: types.POST_ERROR,
                payload: err
            });
        });
};

// fetching posts from the users that the authenticated user is following
export const fetchFollowingPosts = (followingArr) => dispatch => {
    // sorting through following array in user profile to send query params of id's
    let userIdArr = [];
    for (let i = 0; i < followingArr.length; i++) {
        userIdArr.push(followingArr[i].userId.toString());
    }

    axios.get('/api/posts/fetch_following_posts', {
        params: {
            userIdArr: userIdArr
          }
    })
        .then((res) => {
            dispatch({
                type: types.FETCH_FOLLOWING_POSTS,
                payload: res.data
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
            }
            dispatch({
                type: types.POST_ERROR,
                payload: err
            });
        });
}

// fetching posts that were created by the current authenticated user to render in their profile
export const fetchMyPosts = () => dispatch => {
    axios.get('/api/posts/fetch_my_posts')
    .then((res) => {
        dispatch({
            type: types.FETCH_MY_POSTS,
            payload: res.data
        });
    })
    .catch((err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            dispatch(setAlert(error, 'danger'));
        }
        dispatch({
            type: types.POST_ERROR,
            payload: err
        });
    });
}

// fetching user profile posts to render in another users profile when viewing it
export const fetchUserProfilePosts = (userId) => dispatch => {
    axios.get('/api/posts/fetch_user_profile_posts', {
        params: {
            userId: userId
        }
    })
    .then((res) => {
        dispatch({
            type: types.FETCH_USER_PROFILE_POSTS,
            payload: res.data
        })
    })
    .catch((err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            dispatch(setAlert(error, 'danger'));
        }
        dispatch({
            type: types.POST_ERROR,
            payload: err
        });
    });
}

// delete an image in a post
export const deleteImage = (postId, imageId) => dispatch => {
    
    axios.put(`/api/posts/delete_image/${postId}/${imageId}`)
    .then((res) => {
        console.log(res.data);
        dispatch({
            type: types.DELETE_IMAGE,
            payload: { postId, imagePath: res.data.imagePath }
        });
        dispatch(setAlert(res.data.serverMsg, 'success'));
    })
    .catch((err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            dispatch(setAlert(error, 'danger'));
        }
        dispatch({
            type: types.POST_ERROR,
            payload: err
        });
    })
}