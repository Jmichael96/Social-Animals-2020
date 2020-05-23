import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth';
import post from './post';
import profile from './profile';
import user from './user';
import modal from './modal';
import like from './like';
import iteratingModal from './iteratingModal';

const rootReducer = combineReducers({
    alert,
    modal,
    auth,
    post,
    // profile,
    user,
    like,
    iteratingModal
});

export default rootReducer;