import * as types from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.FETCH_USER_PROFILE:
        case types.CREATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case types.FOLLOW_PROFILE:
        case types.UNFOLLOW_PROFILE:
            return {
                ...state,
                profile: state.profile.map((item) => 
                    item._id === payload.id ? { ...item, followers: payload.followers } : item
                ),
                loading: false
            }
        case types.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };
        case types.CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
            }
        default:
            return state;
    }
}