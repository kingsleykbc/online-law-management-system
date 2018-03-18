import axios from 'axios';
import { GET_LAST_CASE } from './types';

export function addCase(data) {
    return dispatch => {
        return axios.post('http://localhost:8082/cases', data).then(
            (data) => {
           //    dispatch(getCases(data.data));
            }
        )
    }
}