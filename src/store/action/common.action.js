import { commonService } from '../../services';
import { commonConstants } from '../../constants';

export const commonActions = {
    fetchCategories,
    fetchCountries,
    fetchSubCategories,
    addIntoStoreSelectedItem,
    setSelectedItemField,
    setIsStep1Valid
};

function success(type, data) { return { type: type, data } }
function failure(type, error) { return { type: type, error } }

function addIntoStoreSelectedItem(item){
    return {type: commonConstants.ADD_SELECTED_ITEM_INTO_STORE, item}
}

function setIsStep1Valid(isValid){
    return {type: commonConstants.IS_STEP1_VALID, isValid}
}

function fetchCategories() {
    return dispatch => {
        commonService.getAllCategories()
            .then(
                res => { 
                    dispatch(success(commonConstants.FETCH_CATEGORIES_SUCCESS, res.data.data));
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

function fetchCountries() {
    return dispatch => {
        commonService.getAllCountries()
            .then(
                res => { 
                    dispatch(success(commonConstants.FETCH_COUNTRIES_SUCCESS, res.data.data));
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

function fetchSubCategories() {
    return dispatch => {
        commonService.getAllSubcategories()
            .then(
                res => { 
                    dispatch(success(commonConstants.FETCH_SUB_CATEGORIES_SUCCESS, res.data.data));
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

function setSelectedItemField(fieldName, fieldValue){
    return {type: commonConstants.SET_SELECTED_ITEM_FIELD, fieldName, fieldValue}
}