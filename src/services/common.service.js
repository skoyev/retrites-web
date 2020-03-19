import axios from 'axios';

const URL = '/api/common';

export const commonService = {
    getAllSubcategories,
    getAllCategories,
    getAllCountries,
    getFacilitatorTypes
};

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