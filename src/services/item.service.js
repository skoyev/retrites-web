import axios from 'axios';
import { configConstants } from '../constants';

// SET FOR LOCAL ENV
if(configConstants.ENVIRONMENT === configConstants.ENV_LOCAL){
    axios.defaults.baseURL = configConstants.API_LOCAL_SERVER_URL;
}

export const itemService = {
    loadItems,
    loadPopularItems,
    updateItem,
    deleteItem,
    addItem,
    loadItemByID,
    findBySubCategory,
    fetchAmenitySummary,
    fetchRetreatByCountries,
    fetchRetreatSubCategories,
    fetchCountries,
    search,
    fetchUserAmenities,
    fetchSummary
};

const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }        
};

function fetchSummary(userID) {
    return axios.get(`/api/items/summary/owner/${userID}`);
}

function fetchUserAmenities(userID) {
    return axios.get(`/api/items/user/${userID}`);
}

function loadPopularItems(categoryId, count) {
    return axios.get(`/api/items?categoryId=${categoryId}&popular=1&count=${count}`);
}

function search(subCategoryID, duration, name, startDate, countryId, count, fromPrice, toPrice) {
    let params = {subCategoryId:subCategoryID, duration:duration, name:name, startDate:startDate, 
                  countryId:countryId, count: count, priceFrom: fromPrice, priceTo: toPrice};
    return axios.get('api/items', {params:params});
}

function fetchCountries () {
    return axios.get('api/common/country', {});
}

function findBySubCategory (subCategoryId, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate) {
    const params = {subCategoryId:subCategoryId, count:count, startFromCount:startFromNum, name:searchByName, priceFrom: priceFrom, priceTo: priceTo, fromDate: fromDate, toDate: toDate};
    return axios.get('api/items', {params:params});
}

function fetchAmenitySummary(){
    return fetch(`/amenity/summary`, requestOptions);
}

function fetchRetreatSubCategories() {
    return axios.get(`api/common/retreat-sub-category`);
}

function fetchRetreatByCountries() {
    return axios.get(`api/common/country`);
}

function loadItems(categoryId){
    return axios.get(`/api/items?categoryId=${categoryId}`);
}

function deleteItem(id, authKey) {
    if(!id || !authKey){
        console.log('id/authKey is null')
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'auth_key': authKey
    }

    return axios.delete(`/api/items/${id}`,{headers:headers});
}

function updateItem(item, authKey) {
    if(!item || !authKey)
        return Promise.reject(`Auth key or item is invalid.`);

    const headers = {
        'Content-Type': 'application/json',
        'auth_key': authKey
    }
    return axios.put(`/api/items/${item.get('id')}`, item, {headers: headers});
}

function addItem(item, authKey){
    if(!item || !authKey)
        return Promise.reject(`Auth key or item is invalid.`);

    const headers = {
        //'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        'auth_key': authKey
    }
    return axios.post(`/api/items`, item, {headers: headers});
}

function loadItemByID(id){
    return axios.get(`/api/items/${id}`);
}