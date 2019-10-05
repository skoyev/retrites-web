import axios from 'axios';
import { configConstants } from '../constants';

// SET FOR LOCAL ENV
if(configConstants.ENVIRONMENT === configConstants.ENV_LOCAL){
    axios.defaults.baseURL = configConstants.API_LOCAL_SERVER_URL;
}

export const itemService = {
    loadItems,
    updateItem,
    deleteItem,
    addItem,
    loadItemByID,
    findByType,
    fetchAmenitySummary,
    fetchRetreatByCountries,
    fetchRetreatTypes
};

const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }        
};

function findByType (type, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate) {
    return fetch(`/items?type=${type}&count=${count}&startFromCount=${startFromNum}&name=${searchByName}&priceFrom=${priceFrom}&priceTo=${priceTo}&fromDate=${fromDate}&toDate=${toDate}`, requestOptions);
}

function fetchAmenitySummary(){
    return fetch(`/amenity/summary`, requestOptions);
}

function fetchRetreatTypes() {
    //return fetch(`/items/retritetypes`, requestOptions); 
    return axios.get(`api/common/retrete-types`);
}

function fetchRetreatByCountries() {
    //return fetch(`/items/bycountries`, requestOptions);
    return axios.get(`api/common/countries`);
}

function loadItems(type){
    //return fetch(`/api/item?type=${type}`, requestOptions);
    return axios.get(`/api/item?type=${type}`);
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
    return fetch(`/items/${id}`, requestOptions);
}