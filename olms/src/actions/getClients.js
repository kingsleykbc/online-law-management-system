import {GET_CLIENTS} from './types';
import axios from 'axios';

export function sendClients(clients){
    return {
        type: GET_CLIENTS,
        clients
    }
}

export function getClients(lawID){
    //Fetch and return all the lawyer's clients
    return dispatch=>{
        return axios.get('http://localhost:8082/getClients/'+lawID).then(
            (clients)=>{
                //Dispatch result since it is an async function
                dispatch(sendClients(clients.data.clients));
            }
        ).catch(
            (error)=>{
                alert("error here o!");
                console.log(error);
            }
        );
    }
}