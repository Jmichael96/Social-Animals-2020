import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth';
import post from './post';

const rootReducer = combineReducers({
    alert,
    auth,
    post
});

export default rootReducer;