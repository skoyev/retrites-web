import axios from 'axios';
import { getAuthKey } from '../helpers';
const URL = '/api';

export const messageService = {
    fetchMessageGroups,
    fetchMessagesByGroupID,
    createMessage,
    createMessageGroup,
    deleteMessageGroup
};

function deleteMessageGroup(msgGroupID) {
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
    
        return axios.delete(`${URL}/message/group/${msgGroupID}`, {headers:headers});    
    } else {
        Promise.reject({error:'Invalid data'});
    }
}

/**
 * Create message group
 */
function createMessageGroup(itemID) {
    let authKey = getAuthKey();

    if(!authKey || !itemID){
        console.log('authKey or itemID is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key'  : authKey
    }

    return axios.post(`${URL}/message/group`, {itemID}, {headers:headers});    
}

/**
 * Create a new message.
 */
function createMessage(message, msgGroupID) {
    let authKey = getAuthKey();

    if(!authKey){
        console.log('authKey is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key'  : authKey
    }

    return axios.post(`${URL}/message/group/${msgGroupID}`, {content:message}, {headers:headers});    
}

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