import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth';
import post from './post';
import profile from './profile';

const rootReducer = combineReducers({
    alert,
    auth,
    post,
    profile
});

export default rootReducer;