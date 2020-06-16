import * as types from '../actions/types';
const initialState = {
    posts: [],
    post: [],
    myPosts: [],
    userProfilePosts: [],
    adoptionPosts: [],
    loading: true,
    serverMsg: null,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.FETCH_ALL_POSTS:
        case types.FETCH_FOLLOWING_POSTS:
            return {
                ...state,
                posts: payload,
                adoptionPosts: payload,
                loading: false
            }
        case types.FETCH_MY_POSTS:
            return {
                ...state,
                myPosts: payload,
                loading: false
            }
        case types.FETCH_USER_PROFILE_POSTS:
            return {
                ...state,
                userProfilePosts: payload,
                loading: false
            }
        case types.FETCH_ADOPTION_POSTS:
            return {
                ...state,
                adoptionPosts: payload,
                loading: false
            }
        case types.CREATE_POST:
        case types.UPDATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                adoptionPosts: [payload, ...state.adoptionPosts],
                loading: false
            }
        case types.UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
                adoptionPosts: state.adoptionPosts.map(post =>
                    post._id === payload.id ? { ...post, likes: payload.likes } : post
                ),
                loading: false
            }
        case types.ADD_COMMENT:
        case types.DELETE_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.comments } : post
                ),
                adoptionPosts: state.adoptionPosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.comments } : post
                ),
                loading: false
            }
        case types.DELETE_IMAGE:
            return {
                ...state,
                // posts: state.posts.map(post =>
                //     post._id === payload.postId ? payload.post : post
                // ),
                posts: state.posts.map(post =>
                    post._id === payload.postId ? { ...post, imagePath: payload.imagePath } : post
                ),
                adoptionPosts: state.adoptionPosts.map(post =>
                    post._id === payload.postId ? { ...post, imagePath: payload.imagePath } : post
                ),
                loading: false
            }
        case types.UPDATE_COMMENT:
            return {
                ...state,
                posts: { ...state.posts },
                loading: false
            }
        case types.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload),
                adoptionPosts: state.adoptionPosts.filter((post) => post._id !== payload),
                loading: false
            }
        case types.POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}