import axios from 'axios';

export function userSignupRequest(userdata) {
    return dispatch => {
        return axios.post('http://localhost:8082/lawyers', userdata);
    }
}
