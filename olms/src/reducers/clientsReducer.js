import { GET_CLIENTS} from '../actions/types';

export default function (state = [], action = {}) {
    switch (action.type) {
        //Get the clients from the getClients action
        case GET_CLIENTS:
            return action.clients

        default:
            return state;
            break;
    }
}