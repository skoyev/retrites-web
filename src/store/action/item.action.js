import axios from "axios";
import { client, ROOT_URL } from './';
import {itemConstants} from '../../constants/item.constants';
import { itemService } from '../../services';
import { history } from '../../helpers';

export const itemActions = {
    fetch,
    fetchByID,
    add,
    addItemsSuccess,
    fetchItemsSuccess,
    fetchItemSuccess,
    findByType
};

export function findByType(type, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate){
    return dispatch => {
        return itemService.findByType(type, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate).then(res => {
            if(res.ok){
                dispatch(fetchItemsSuccess(res.items))    
            } else {
                throw('No data');
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function addItemsSuccess() { 
    history.push('/');    
    return { 
        type: 'ADD_ITEM_SUCCESS',
        shouldReloadItems: true
    }     
}

export function fetchItemSuccess(item){
    return { 
        type: 'ITEM_FETCH_SUCCESS', 
        item 
    } 
}

export function fetchItemsSuccess(items) { 
    return { 
        type: 'ITEMS_FETCH_SUCCESS', 
        items
    } 
}

/**
 * Create a new Item
 * @param {*} item 
 */
export function add(item) {
    return dispatch => {
        return itemService.addItem(item).then(res => {
            if(res.ok){
                dispatch(addItemsSuccess())    
            } else {
                throw('Error while create a new item.');
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchByID(id){
    return dispatch => {
        return itemService.loadItemByID(id).then(res => {
            if(res.ok){
                dispatch(fetchItemSuccess(res.item))    
            } else {
                throw('No data');
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetch() {
    return dispatch => {
        return itemService.loadItems().then(res => {
            if(res.ok){
                dispatch(fetchItemsSuccess(res.items))    
            } else {
                throw('No data');
            }
        }).catch(error => {
            throw(error);
        });
    }
}