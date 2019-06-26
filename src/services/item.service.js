import {userService} from './user.service'
import axios from 'axios';

export const itemService = {
    loadItems,
    addItem,
    loadItemByID,
    findByType
};

const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }        
};

function findByType (type, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate) {
    return fetch(`/items?type=${type}&count=${count}&startFromCount=${startFromNum}&name=${searchByName}&priceFrom=${priceFrom}&priceTo=${priceTo}&fromDate=${fromDate}&toDate=${toDate}`, requestOptions);
}

function loadItems(){
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