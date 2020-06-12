import axios from 'axios';
import { getAuthKey } from '../helpers';
const URL = '/api/common';

export const commonService = {
    getAllSubcategories,
    getAllCategories,
    getAllCountries,
    getFacilitatorTypes,
    sendEmail,
    fetchItemTypes,
    forgotPassword,
    resetPassword
};

/**
 * Reset password
 */
function resetPassword(email, password, activateCode) {
    const headers = {
        'Content-Type': 'application/json'
    }

    return axios.post(`${URL}/reset-password`, {email, password, activateCode}, {headers:headers});    
}

function forgotPassword(email) {

    const headers = {
        'Content-Type': 'application/json'
    }

    return axios.post(`${URL}/forgot-password`, {email}, {headers:headers});    
}

function fetchItemTypes() {
    return axios.get(`${URL}/item-status`);
}

function sendEmail(itemId, details, name, email) {
    if(!details ){
        console.error(`Wrong send email params`)
        return
    }

    const headers = {'Content-Type': 'application/json'}

    return axios.post(`/api/common/email`, {itemId, details, name, from: email}, {headers: headers});
}

function getAllSubcategories(){
    return axios.get(`${URL}/sub-category`);
}

function getAllCategories(){
    return axios.get(`${URL}/category`);
}

function getAllCountries() {
    return axios.get(`${URL}/country`);
}

function getFacilitatorTypes() {
    return axios.get(`${URL}/facilitator-types`);
}