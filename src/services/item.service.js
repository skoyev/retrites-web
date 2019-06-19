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

function findByType (type, count, startFromNum, searchByName) {
    return fetch(`/items?type=${type}&count=${count}&startFromCount=${startFromNum}&name=${searchByName}`, requestOptions);
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