import axios from 'axios';
import { getAuthKey } from '../helpers';
const URL = '/api';

export const messageService = {
    fetchMessageGroups,
    fetchMessagesByGroupID,
    createMessage,
    createMessageGroup,
    deleteMessageGroup,
    updateMessageStatus
};

function updateMessageStatus(msgId, statusId) {
    if (msgId && statusId) {
        let authKey = getAuthKey();

        if (!authKey) {
            console.log('authKey is null')
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-key': authKey
        }

        return axios.put(`${URL}/message/${msgId}`, { statusId: statusId }, { headers: headers });
    } else {
        console.error(`msgId ${msgId} or statusId ${statusId} - is null `);
        throw Error(`msgId ${msgId} or statusId ${statusId} - is null `);
    }
}

function deleteMessageGroup(msgGroupID) {
    if (msgGroupID) {
        let authKey = getAuthKey();

        if (!authKey) {
            console.log('authKey is null')
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-key': authKey
        }

        return axios.delete(`${URL}/messageGroup/${msgGroupID}`, { headers: headers });
    } else {
        Promise.reject({ error: 'Invalid data' });
    }
}

/**
 * Create message group
 */
function createMessageGroup(itemID) {
    let authKey = getAuthKey();

    if (!authKey || !itemID) {
        console.log('authKey or itemID is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key': authKey
    }

    return axios.post(`${URL}/messageGroup`, { itemID }, { headers: headers });
}

/**
 * Create a new message.
 */
function createMessage(message, msgGroupID) {
    let authKey = getAuthKey();

    if (!authKey || !msgGroupID) {
        console.log('authKey or msgGroupID is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key': authKey
    }

    return axios.post(`${URL}/message/group/${msgGroupID}`, { content: message }, { headers: headers });
}

/**
 * Fetch messages by msg group id
 */
function fetchMessagesByGroupID(msgGroupID) {
    if (msgGroupID) {
        let authKey = getAuthKey();

        if (!authKey) {
            console.log('authKey is null')
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-key': authKey
        }

        return axios.get(`${URL}/message/group/${msgGroupID}`, { headers: headers });
    }
}

function fetchMessageGroups(name, state) {
    let authKey = getAuthKey();

    if (!authKey) {
        console.log('authKey is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key': authKey
    }

    let params = {
        name: name && name.length > 0 ? name : undefined,
        state: state
    };

    return axios.get(`${URL}/messageGroup`, { headers: headers, params: params });
}