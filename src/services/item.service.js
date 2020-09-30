import axios from 'axios';
import { configConstants } from '../constants';
import { getAuthKey } from '../helpers';

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
    fetchItemsByNameStatus
};

export const ITEM_STATUS = {
    CREATED: 1,
    PUBLISHED: 2,
    REJECTED: 3
};

const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }        
};

function fetchItemsByNameStatus(name, statusID) {
    let params = {status:statusID, name:name};
    return axios.get('api/items', {params:params});
}

function fetchUserAmenities(userID) {
    return axios.get(`/api/items/user/${userID}`, getHeader());
}

function loadPopularItems(count) {
    return axios.get(`/api/items?popular=1&count=${count}&status=${ITEM_STATUS.PUBLISHED}`);
}

function search(categoryId, subCategoryID, duration, name, startDate, countryId, count, fromPrice, toPrice, status) {
    let params = {categoryId:categoryId, subCategoryId:subCategoryID, duration:duration, name:name, startDate:startDate, 
                  countryId:countryId, count: count, priceFrom: fromPrice, priceTo: toPrice,
                  status: status};
    return axios.get('api/items', {params:params});
}

function fetchCountries () {
    return axios.get('api/common/country', {});
}

function findBySubCategory (subCategoryId, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate) {
    const params = {subCategoryId:subCategoryId, count:count, startFromCount:startFromNum, name:searchByName, 
                    priceFrom: priceFrom, priceTo: priceTo, fromDate: fromDate, toDate: toDate,
                    status: ITEM_STATUS.PUBLISHED};
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
        'x-auth-key': authKey
    }

    return axios.delete(`/api/items/${id}`, {headers:headers});
}

function getHeader() {
    return {headers: { 'Content-Type': 'application/json',
                       'x-auth-key'  :  getAuthKey() }};
}

function updateItem(item, authKey) {
    if(!item || !authKey)
        return Promise.reject(`Auth key or item is invalid.`);

    const headers = {
        'Content-Type': 'application/json',
        'x-auth-key': authKey
    }
    return axios.put(`/api/items/${item.get('id')}`, item, {headers: headers});
}

function addItem(item, authKey){
    if(!item || !authKey)
        return Promise.reject(`Auth key or item is invalid.`);

    const headers = {
        //'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-auth-key': authKey
    }
    return axios.post(`/api/items`, item, {headers: headers});
}

function loadItemByID(id){
    return axios.get(`/api/items/${id}`);
}