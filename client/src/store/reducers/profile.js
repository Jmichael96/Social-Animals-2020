// import * as types from '../actions/types';

// const initialState = {
//     profile: null,
//     profiles: [],
//     loading: true,
//     error: {}
// };

// export default function (state = initialState, action) {
//     const { type, payload } = action;

//     switch (type) {
//         case types.FETCH_USER_PROFILE:
//         case types.CREATE_PROFILE:
//             return {
//                 ...state,
//                 profile: payload,
//                 loading: false
//             };
//         case types.FOLLOW_PROFILE:
//         case types.UNFOLLOW_PROFILE:
//             return {
//                 ...state,
//                 profile: (profile) => {
//                     if (profile._id === payload.id) {
//                         return { ...profile, followers: payload.followers };
//                     }
//                     return profile;
//                 },
//                 loading: false
//             }
//         case types.PROFILE_ERROR:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false,
//                 profile: null
//             };
//         case types.CLEAR_PROFILE:
//             return {
//                 ...state,
//                 profile: null,
//                 loading: true
//             }
//         default:
//             return state;
//     }
// }