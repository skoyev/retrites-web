import axios from 'axios';
import { getAuthKey } from '../helpers';
const URL = '/api';

export const messageService = {
    fetchMessageGroups,
    fetchMessagesByGroupID
};

/**
 * Fetch messages by msg group id
 */
function fetchMessagesByGroupID(msgGroupID) {
    if(msgGroupID) {
        let authKey = getAuthKey();

        if(!authKey){
            console.log('authKey is null')
            return;
        }
    
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-key'  : authKey
        }
    
        return axios.get(`${URL}/message/group/${msgGroupID}`, {headers:headers});    
    }
}

function fetchMessageGroups() {
    let authKey = getAuthKey();

    if(!authKey){
        console.log('authKey is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key': authKey
    }

    return axios.get(`${URL}/message/group`,{headers:headers});
}