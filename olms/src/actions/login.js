import axios from 'axios';
import setToken from '../utils/setToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function logout() {
    return dispatch => {
        //Remove User from cache
        localStorage.removeItem('jwtToken');
        setToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function login(data){
    return dispatch => {
        return axios.post('http://localhost:8082/login',data).then(
            (data)=>{
                const token = data.data.token;
                localStorage.setItem('jwtToken', token);
                setToken(token);
                dispatch(setCurrentUser(jwt.decode(token)));
            }
        )
    }
}