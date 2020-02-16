import axios from 'axios';

const URL = '/api/common';

export const commonService = {
    getAllSubcategories,
    getAllCategories
};

function getAllSubcategories(){
    return axios.get(`${URL}/sub-category`);
}

function getAllCategories(){
    return axios.get(`${URL}/category`);
}

