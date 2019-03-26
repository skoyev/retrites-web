import {userService} from './user.service'
import axios from 'axios';

export const itemService = {
    loadItems,
    addItem,
    loadItemByID
};

function loadItems(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }        
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
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }        
    };

    return fetch(`/items/${id}`, requestOptions);
}