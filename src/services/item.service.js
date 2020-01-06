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
    search
};

const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }        
};

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

function deleteItem(id) {
    if(!id){
        console.log('id is null')
        return;
    }

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }        
    };

    return fetch(`/items/${id}`, requestOptions);    
}

function updateItem(item) {
    if(!item) {
        console.log('Error, item is null')
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(`/items`, requestOptions);    
}

function addItem(item){
    if(!item)
        return;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };

    return fetch(`/items`, requestOptions);    
}

function loadItemByID(id){
    return axios.get(`/api/items/${id}`);
}