import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, } from 'redux';
import setToken from './utils/setToken';
import rootReducer from './rootReducer';
import jwt from 'jsonwebtoken';

//Components
import App from './App';
import { setCurrentUser } from './actions/login';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

if(localStorage.jwtToken){
    setToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
    <Provider store={store}>
     <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
