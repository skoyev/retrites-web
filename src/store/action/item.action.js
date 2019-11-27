import axios from "axios";
import { client, ROOT_URL } from './';
import {itemConstants, pageConstants} from '../../constants';
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
    findBySubCategory,
    fetchAmenitySummary,
    fetchRetreatByCountries,    
    fetchSearchRetreatTypes,
    fetchRetreatSubCategories,
    fetchCountries,
    search,
    clearItemsAndNavigateToPage
};

export function clearItemsAndNavigateToPage(pageName) {
    return { 
        type: pageConstants.CLEAR_ITEMS_AND_REDIRECT_PAGE,
        pageName: pageName
    }
}

/**
 * Home Page, Search by: subCategoryID, duration, name, startDate
 * @param {*} selectedRetreatTypeId 
 * @param {*} selectedDuration 
 * @param {*} selectedInputSearchBy 
 * @param {*} selectedStartDate 
 */
export function search(subCategoryID, duration, name, startDate) {
    return dispatch => {
        return itemService.search(subCategoryID, duration, name, startDate).then(res => {
            dispatch(fetchItemsSuccess(res.data.items))    
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchCountries() {
    return dispatch => {
        return itemService.fetchCountries().then(res => {
            dispatch(fetchRetreatByCountriesSuccess(res.data.data))    
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchSearchRetreatTypes(categoryId) {
    return dispatch => {
        return itemService.fetchRetreatTypes(categoryId).then(res => {
            dispatch(fetchRetreatTypesSuccess(res.data.data))    
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchRetreatSubCategories() {
    return dispatch => {
        return itemService.fetchRetreatSubCategories().then(res => {
            if(res.data.data && res.data.data.length > 0 ) {
                dispatch(fetchRetreatTypesSuccess(res.data.data[0].subCategories))    
            } else {
                console.log('Error fetchRetreatSubCategories')
            }
        }).catch(error => {
            throw(error);
        });
    }
}


export function fetchRetreatByCountries() {
    return dispatch => {
        return itemService.fetchRetreatByCountries().then(res => {
            //dispatch(fetchRetreatByCountriesSuccess(res.retreatByCountries))    
            dispatch(fetchRetreatByCountriesSuccess(res.data.data))    
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchAmenitySummary() {
    return dispatch => {
        return itemService.fetchAmenitySummary().then(res => {
            dispatch(fetchAmenitySummarySuccess(res.amenitySummary))    
        }).catch(error => {
            throw(error);
        });
    }
}

export function findBySubCategory(subCategoryId, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate){
    return dispatch => {
        return itemService.findBySubCategory(subCategoryId, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate).then(res => {
            if(res.status == 200){
                dispatch(fetchItemsSuccess(res.data.items))    
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

export function fetchRetreatTypesSuccess(retriteTypes){
    return { 
        type: itemConstants.FETCH_RETRITE_TYPES_SUCCESS, 
        retriteTypes
    } 
}


export function fetchRetreatByCountriesSuccess(retreatByCountries){
    return { 
        type: itemConstants.FETCH_RETRITE_BY_COUNTRY_SUCCESS, 
        retreatByCountries
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

export function fetch(categoryId) {
    return dispatch => {
        return itemService.loadItems(categoryId).then(res => {
            if(res.status === 200){
                dispatch(fetchItemsSuccess(res.data.items))    
            } else {
                throw('No data');
            }
        }).catch(error => {
            throw(error);
        });
    }
}