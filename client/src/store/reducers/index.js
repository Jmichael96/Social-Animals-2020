import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth';
import post from './post';
import profile from './profile';
import user from './user';

const rootReducer = combineReducers({
    alert,
    auth,
    post,
    profile,
    user
});

export default rootReducer;