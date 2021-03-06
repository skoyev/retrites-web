import { itemConstants, pageConstants, commonConstants } from '../../constants';
import { itemService } from '../../services';
import { history, getAuthKey } from '../../helpers';
import { reportActions } from './report.action';

export const itemActions = {
    fetchItemsByName,
    fetchItemsByNameStatus,
    fetchUserAmenities,
    fetch,
    fetchAllItems,
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
    search,
    clearItemsAndNavigateToPage,
    getCountrieFromStore,
    isItemExistWithName,

    updateItemStatus
};

function loading(isLoading) { return { type: commonConstants.IS_LOADING_SUCCESS, isLoading } }

export function getCountrieFromStore() {
    return { type: pageConstants.GET_COUNTRIES }
}

export function clearItemsAndNavigateToPage(pageName) {
    return {
        type: pageConstants.CLEAR_ITEMS_AND_REDIRECT_PAGE,
        pageName: pageName
    }
}

/**
 * Check if item with this name is exist.
 * @param {*} name 
 */
export function isItemExistWithName(name) {
    return dispatch => {
        return itemService.search('', '', '', name, '', '', '', '', '', '');
    }
}

/**
 * 
 * @param {*} id 
 * @param {*} statusId 
 */
export function updateItemStatus(id, statusId) {
    return dispatch => {
        return itemService.updateItemStatus(id, statusId).then(res => {
            dispatch(loading(commonConstants.END_LOADING));
            dispatch(fetchAllItems())
        }).catch(error => {
            throw (error);
        });
    }
}

/**
 * Home Page, Search by: subCategoryID, duration, name, startDate
 * @param {*} selectedRetreatTypeId 
 * @param {*} selectedDuration 
 * @param {*} selectedInputSearchBy 
 * @param {*} selectedStartDate 
 */
export function search(categoryId, subCategoryID, duration, name, startDate, countryId, count, fromPrice, toPrice, status) {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.search(categoryId, subCategoryID, duration, name, startDate, countryId, count, fromPrice, toPrice, status).then(res => {
            dispatch(loading(commonConstants.END_LOADING));
            dispatch(fetchItemsSuccess(res.data.items))
        }).catch(error => {
            throw (error);
        });
    }
}

/**
 * Fetch items by name
 * @param {*} name 
 * @param {*} status 
 */
export function fetchItemsByName(name) {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.fetchItemsByName(name)
            .then(res => {
                dispatch(fetchItemsSuccess(res.data.items))
                dispatch(loading(commonConstants.END_LOADING));
            }).catch(error => {
                dispatch(loading(commonConstants.END_LOADING));
                throw (error);
            });
    }
}


/**
 * Fetch items by name, status
 * @param {*} name 
 * @param {*} status 
 */
export function fetchItemsByNameStatus(name, status) {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.fetchItemsByNameStatus(name, status)
            .then(res => {
                dispatch(fetchItemsSuccess(res.data.items))
                dispatch(loading(commonConstants.END_LOADING));
            }).catch(error => {
                dispatch(loading(commonConstants.END_LOADING));
                throw (error);
            });
    }
}

/**
 * Get all user amenities.
 */
export function fetchUserAmenities(userID) {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.fetchUserAmenities(userID)
            .then(res => {
                dispatch(loading(commonConstants.END_LOADING));
                dispatch(fetchItemsSuccess(res.data.items))
            }).catch(error => {
                dispatch(loading(commonConstants.END_LOADING));
                throw (error);
            });
    }
}

export function fetchSearchRetreatTypes(categoryId) {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.fetchRetreatTypes(categoryId).then(res => {
            dispatch(fetchRetreatTypesSuccess(res.data.data))
        }).catch(error => {
            throw (error);
        });
    }
}

export function fetchRetreatSubCategories() {
    return dispatch => {
        return itemService.fetchRetreatSubCategories().then(res => {
            if (res.data.data && res.data.data.length > 0) {
                dispatch(fetchRetreatTypesSuccess(res.data.data[0].subCategories))
            } else {
                console.log('Error fetchRetreatSubCategories')
            }
        }).catch(error => {
            throw (error);
        });
    }
}


export function fetchRetreatByCountries() {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.fetchRetreatByCountries().then(res => {
            //dispatch(fetchRetreatByCountriesSuccess(res.retreatByCountries))    
            dispatch(loading(commonConstants.END_LOADING));
            dispatch(fetchRetreatByCountriesSuccess(res.data.data))
        }).catch(error => {
            throw (error);
        });
    }
}

export function fetchAmenitySummary() {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.fetchAmenitySummary().then(res => {
            dispatch(loading(commonConstants.END_LOADING));
            dispatch(fetchAmenitySummarySuccess(res.amenitySummary))
        }).catch(error => {
            throw (error);
        });
    }
}

export function findBySubCategory(subCategoryId, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate) {
    return dispatch => {
        return itemService.findBySubCategory(subCategoryId, count, startFromNum, searchByName, priceFrom, priceTo, fromDate, toDate).then(res => {
            if (res.status == 200) {
                dispatch(fetchItemsSuccess(res.data.items))
            } else {
                throw ('No data');
            }
        }).catch(error => {
            throw (error);
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

export function fetchItemSuccess(item) {
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

export function fetchRetreatTypesSuccess(retriteTypes) {
    return {
        type: itemConstants.FETCH_RETRITE_TYPES_SUCCESS,
        retriteTypes
    }
}

export function fetchRetreatByCountriesSuccess(retreatByCountries) {
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

function deleteItemsSuccess(id) {
    return {
        type: itemConstants.DELETE_ITEM_SUCCESS,
        id
    }
}

function deleteItemsFail(error) {
    return {
        type: itemConstants.DELETE_ITEM_FAIL,
        error
    }
}

function updateItemsSuccess(item) {
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
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.deleteItem(id, authKey)
            .then(res => {
                if (res.status === 200) {
                    dispatch(deleteItemsSuccess(id));
                } else {
                    console.error(res);
                }
                dispatch(loading(commonConstants.END_LOADING));
            }).catch(error => {
                console.error(error);
                dispatch(deleteItemsFail(error));
                dispatch(loading(commonConstants.END_LOADING));
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
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.addItem(item, authKey).then(res => {
            if (res.status === 200 || res.status === 201) {
                if (userId) {
                    // refresh items
                    dispatch(fetchUserAmenities(userId))
                } else {
                    dispatch(addItemsSuccess(item))
                }
            } else {
                dispatch(loading(commonConstants.END_LOADING));
                throw ('Error while create a new item.');
            }
            dispatch(loading(commonConstants.END_LOADING));
        }).catch(error => {
            dispatch(loading(commonConstants.END_LOADING));
            throw (error);
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
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.updateItem(item, authKey).then(res => {
            if (res.status === 200) {
                dispatch(updateItemsSuccess(item))
            } else {
                throw ('Error while update item.');
            }
            dispatch(loading(commonConstants.END_LOADING));
        }).catch(error => {
            throw (error);
            dispatch(loading(commonConstants.END_LOADING));
        });
    }
}

export function fetchByID(id) {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.loadItemByID(id).then(res => {
            dispatch(loading(commonConstants.END_LOADING));
            dispatch(reportActions.clickPageVisits(id));
            dispatch(fetchItemSuccess(res.data.item))
            return res;
        }).catch(error => {
            throw (error);
        });
    }
}

export function fetchPopularRedirectLoginIfNoData(count) {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.loadPopularItems(count).then(res => {
            if (res.status === 200) {
                if (res.data.items && res.data.items.length > 0) {
                    dispatch(fetchItemsSuccess(res.data.items))
                } else {
                    dispatch(clearItemsAndNavigateToPage(pageConstants.LOGIN))
                }
            } else {
                throw ('No data');
            }
            dispatch(loading(commonConstants.END_LOADING));
        }).catch(error => {
            throw (error);
        });
    }
}

export function fetch(categoryId) {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.loadItems(categoryId).then(res => {
            if (res.status === 200) {
                dispatch(fetchItemsSuccess(res.data.items))
            } else {
                throw ('No data');
            }
            dispatch(loading(commonConstants.END_LOADING));
        }).catch(error => {
            throw (error);
        });
    }
}

export function fetchAllItems() {
    return dispatch => {
        dispatch(loading(commonConstants.START_LOADING));
        return itemService.loadAllItems().then(res => {
            if (res.status === 200) {
                dispatch(fetchItemsSuccess(res.data.items))
            } else {
                throw ('No data');
            }
            dispatch(loading(commonConstants.END_LOADING));
        }).catch(error => {
            throw (error);
        });
    }
}