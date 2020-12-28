import axios from 'axios';
import { getAuthKey } from '../helpers';
const URL = '/api';

export const reportService = {
    fetchTotalPageVisists,
    fetchTotalPageRequests,
    clickPageVisits,
    clickPageClicks: clickPageRequests
};

function clickPageVisits(itemID) {
    if(!itemID){
        console.log('itemID is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json'
    }

    return axios.post(`${URL}/report/page-visits`, {itemId:itemID}, {headers:headers});        
}

function clickPageRequests(itemID) {
    let authKey = getAuthKey();

    if(!authKey || !itemID){
        console.log('authKey or itemID is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key'  : authKey
    }

    return axios.post(`${URL}/report/page-requests`, {itemId:itemID}, {headers:headers});            
}

/**
 * Total page visits
 */
function fetchTotalPageVisists() {
    let authKey = getAuthKey();

    if(!authKey){
        console.log('authKey is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key'  : authKey
    }

    return axios.get(`${URL}/report/page-visits`, {headers:headers});        
}

/**
 * Total page requests
 */
function fetchTotalPageRequests() {
    let authKey = getAuthKey();

    if(!authKey){
        console.log('authKey is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key'  : authKey
    }

    return axios.get(`${URL}/report/page-requests`, {headers:headers});        
}