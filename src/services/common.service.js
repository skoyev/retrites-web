import axios from 'axios';
import { getAuthKey } from '../helpers';
const URL = '/api/common';

export const commonService = {
    getAllSubcategories,
    getAllCategories,
    getAllCountries,
    getFacilitatorTypes,
    sendEmail
};

function sendEmail(amenityID, description) {
    if(!amenityID || !description ){
        console.error(`Wrong send email params`)
        return
    }

    const headers = {
        'Content-Type': 'application/json',
        'auth_key': getAuthKey()
    }

    return axios.post(`/api/common/email`, {itemId:amenityID, content:description}, {headers: headers});
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