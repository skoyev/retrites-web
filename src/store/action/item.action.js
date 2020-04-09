import {itemConstants, pageConstants} from '../../constants';
import { itemService } from '../../services';
import { history, getAuthKey } from '../../helpers';

export const itemActions = {
    fetchSummary,
    fetchUserAmenities,
    fetch,
    fetchPopularRedirectLoginIfNoData,
    fetchByID,

    createItem,
    updateItem,
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
    clearItemsAndNavigateToPage,
    getCountrieFromStore
};

export function getCountrieFromStore() {
    return { type: pageConstants.GET_COUNTRIES}
}

export function clearItemsAndNavigateToPage(pageName) {
    return { 
        type: pageConstants.CLEAR_ITEMS_AND_REDIRECT_PAGE,
        pageName: pageName
    }
}

export function fetchSummary(userID) {
    return dispatch => {
        return itemService.fetchSummary(userID)
                          .then(res => dispatch(fetchSummarySuccess(res.data.summary)))
                          .catch(error => {throw (error)})
    }
}

/**
 * Home Page, Search by: subCategoryID, duration, name, startDate
 * @param {*} selectedRetreatTypeId 
 * @param {*} selectedDuration 
 * @param {*} selectedInputSearchBy 
 * @param {*} selectedStartDate 
 */
export function search(subCategoryID, duration, name, startDate, countryId, count, fromPrice, toPrice) {
    return dispatch => {
        return itemService.search(subCategoryID, duration, name, startDate, countryId, count, fromPrice, toPrice).then(res => {
            dispatch(fetchItemsSuccess(res.data.items))    
        }).catch(error => {
            throw(error);
        });
    }
}

/**
 * Get all user amenities.
 */
export function fetchUserAmenities(userID) {
    return dispatch => {
        return itemService.fetchUserAmenities(userID)
                          .then(res => {
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

export function addItemsSuccess(item) { 
    return { 
        type: itemConstants.ADD_ITEM_SUCCESS,
        item: item
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

export function fetchSummarySuccess(summary) {
    return { 
        type: itemConstants.SUMMARY_FETCH_SUCCESS, 
        summary
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

function deleteItemsSuccess(id){
    return { 
        type: itemConstants.DELETE_ITEM_SUCCESS, 
        id
    } 
}

function deleteItemsFail(error){
    return { 
        type: itemConstants.DELETE_ITEM_FAIL, 
        error
    } 
}

function updateItemsSuccess(item){
    return { 
        type: itemConstants.UPDATE_ITEM_SUCCESS, 
        item
    } 
}

/**-----------------------------  ITEM ACTIONS  --------------------------------------------------- */
/** 
 * Delete Item action
 * @param {*} item 
 */
export function deleteItem(id) {
    return dispatch => {
        let authKey = getAuthKey();
        return itemService.deleteItem(id, authKey)
                          .then(res => {
                              if(res.status === 200){
                                dispatch(deleteItemsSuccess(id));
                              } else {
                                  console.error(res);
                              }
                        }).catch(error => {
                            console.error(error);
                            dispatch(deleteItemsFail(error));
                        });
    }
}

/** 
 * Create a new Item action
 * @param {*} item 
 */
export function createItem(item, userId) {
    return dispatch => {
        let authKey = getAuthKey();
        return itemService.addItem(item, authKey).then(res => {
            if(res.status === 200 || res.status === 201){
                if(userId){
                    // refresh items
                    dispatch(fetchUserAmenities(userId))
                } else {
                    dispatch(addItemsSuccess(item))    
                }
            } else {
                throw('Error while create a new item.');
            }
        }).catch(error => {
            throw(error);
            //dispatch(addItemsFail(erro));    
        });
    }
}

/** 
 * Update an existing item action
 * @param {*} item 
 */
export function updateItem(item) {
    return dispatch => {
        let authKey = getAuthKey();
        return itemService.updateItem(item, authKey).then(res => {
            if(res.status === 200){
                dispatch(updateItemsSuccess(item))    
            } else {
                throw('Error while update item.');
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchByID(id){
    return dispatch => {
        return itemService.loadItemByID(id).then(res => {
                dispatch(fetchItemSuccess(res.data.item))    
        }).catch(error => {
            throw(error);
        });
    }
}

export function fetchPopularRedirectLoginIfNoData(categoryId, count) {
    return dispatch => {
        return itemService.loadPopularItems(categoryId, count).then(res => {
            if(res.status === 200){
                if(res.data.items.length > 0) {
                    dispatch(fetchItemsSuccess(res.data.items))    
                } else {
                    dispatch(clearItemsAndNavigateToPage(pageConstants.LOGIN))
                }
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