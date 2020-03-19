import { commonService } from '../../services';
import { commonConstants } from '../../constants';

export const commonActions = {
    fetchCategories,
    fetchCountries,
    fetchFacilitatorTypes,
    fetchSubCategories,
    addIntoStoreSelectedItem,
    setSelectedItemField,
    setIsNextStepValid
};

function success(type, data) { return { type: type, data } }
function failure(type, error) { return { type: type, error } }

function addIntoStoreSelectedItem(item){
    return {type: commonConstants.ADD_SELECTED_ITEM_INTO_STORE, item}
}

function setIsNextStepValid(isValid){
    return {type: commonConstants.IS_NEXT_STEP_VALID, isValid}
}

function fetchFacilitatorTypes() {
    return dispatch => {
        commonService.getFacilitatorTypes()
            .then(
                res => { 
                    dispatch(success(commonConstants.FETCH_FASCILITATOR_TYPES_SUCCESS, res.data.data));
                },
                error => {
                    console.error(`There was an error while fetchFacilitatorTypes - ${error}`)
                    dispatch(failure(error));                    
                }
            );
    };
}

function fetchCategories() {
    return dispatch => {
        commonService.getAllCategories()
            .then(
                res => { 
                    dispatch(success(commonConstants.FETCH_CATEGORIES_SUCCESS, res.data.data));
                },
                error => {
                    console.error(`There was an error while fetchCategories - ${error}`)
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
                    console.error(`There was an error while fetchCountries - ${error}`)
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
                    console.error(`There was an error while fetchSubCategories - ${error}`)
                    dispatch(failure(error));                    
                }
            );
    };
}

function setSelectedItemField(fieldName, fieldValue){
    return {type: commonConstants.SET_SELECTED_ITEM_FIELD, fieldName, fieldValue}
}