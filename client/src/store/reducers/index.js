import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth';
import post from './post';
import profile from './profile';
import user from './user';
import modal from './modal';

const rootReducer = combineReducers({
    alert,
    modal,
    auth,
    post,
    profile,
    user
});

export default rootReducer;