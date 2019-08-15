import axios from "axios";
import { client, ROOT_URL } from './';
import {itemConstants} from '../../constants/item.constants';
import { itemService } from '../../services';
import { history } from '../../helpers';

export const itemActions = {
    fetch,
    fetchByID,
    add,
    update,
    deleteItem,
    addItemsSuccess,
    fetchItemsSuccess,
    fetchItemSuccess,
    findByType,
    fetchAmenitySummary
};

export function fetchAmenitySummary() {
    return dispatch => {
        return itemService.fetchAmenitySummary().then(res => {
            dispatch(fetchAmenitySummarySuccess(res.amenitySummary))    
        }).catch(error => {
            throw(error);
        });
    }
}

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
    history.push('/dashboard');    
    return { 
        type: 'ADD_ITEM_SUCCESS',
        shouldReloadItems: true
    }     
}

export function itemsSuccess() { 
    return { 
        type: 'ITEM_SUCCESS',
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

export function fetchAmenitySummarySuccess(amenitySummary) {
    return { 
        type: itemConstants.FETCH_AMENITY_SUMMARY_SUCCESS, 
        amenitySummary
    } 
}

/** 
 * Update Item action
 * @param {*} item 
 */
export function update(item) {
    return dispatch => {
        return itemService.updateItem(item).then(res => {
            if(res.ok){
                dispatch(itemsSuccess())    
            } else {
                throw('Error while create a new item.');
            }
        }).catch(error => {
            throw(error);
        });
    }
}

/** 
 * Delete Item action
 * @param {*} item 
 */
export function deleteItem(id) {
    return dispatch => {
        return itemService.deleteItem(id).then(res => {
            if(res.ok){
                dispatch(itemsSuccess())    
            } else {
                throw('Error while delete a new item.');
            }
        }).catch(error => {
            throw(error);
        });
    }
}

/** 
 * Create a new Item action
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