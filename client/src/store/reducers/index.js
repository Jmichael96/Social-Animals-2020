import { combineReducers } from 'redux';
import alert from './alert'
import auth from './auth';
import post from './post';
import user from './user';
import modal from './modal';
import like from './like';
import iteratingModal from './iteratingModal';
import chat from './chat';
import notification from './notification';
import postModal from './postModal';

const rootReducer = combineReducers({
    alert,
    modal,
    auth,
    post,
    user,
    like,
    iteratingModal,
    chat,
    notification,
    postModal
});

export default rootReducer;