import {combineReducers} from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import clientsReducer from './reducers/clientsReducer';

export default combineReducers({
    flashMessages,
    auth,
    clientsReducer
});
