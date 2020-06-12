import { commonService } from '../../services';
import { commonConstants } from '../../constants';

export const commonActions = {
    fetchCategories,
    fetchCountries,
    fetchFacilitatorTypes,
    fetchSubCategories,
    fetchItemTypes,
    addIntoStoreSelectedItem,
    setSelectedItemField,
    setIsNextStepValid,
    sendEmail,
    forgotPassword,
    resetPassword
};

function success(type, data) { return { type: type, data } }
function failure(type, error) { return { type: type, error } }

function addIntoStoreSelectedItem(item){
    return {type: commonConstants.ADD_SELECTED_ITEM_INTO_STORE, item}
}

function setIsNextStepValid(isValid){
    return {type: commonConstants.IS_NEXT_STEP_VALID, isValid}
}

function fetchItemTypes(){
    return dispatch => {
        commonService.fetchItemTypes()
            .then(
                res => { 
                    dispatch(success(commonConstants.FETCH_ITEM_TYPES_SUCCESS, res.data.data));
                },
                error => {
                    console.error(`There was an error while fetching item types - ${error}`)
                    dispatch(failure(error));                    
                }
            );
    };
}

/**
 * Reset Password action.
 */
function resetPassword(email, password, activateCode) {
    return dispatch => {
        commonService.resetPassword(email, password, activateCode)
                     .then(
                         res   => dispatch(success(commonConstants.RESET_PASSWORD_SUCCESS)),
                         error => dispatch(failure(commonConstants.RESET_PASSWORD_FAILURE))
                     );                     
    }
}

/**
 * Forgot user password.
 */
function forgotPassword(email) {
    if(!email){        
        return dispatch => dispatch(failure(commonConstants.FORGOT_PASSWORD_FAILURE))
    }

    return dispatch => {
        commonService.forgotPassword(email)
                     .then(
                         res   => dispatch(success(commonConstants.FORGOT_PASSWORD_SUCCESS)),
                         error => dispatch(failure(commonConstants.FORGOT_PASSWORD_FAILURE))
                     );                     
    }
}

function sendEmail(itemId, details, name, email) {
    return dispatch => {
        commonService.sendEmail(itemId, details, name, email)
            .then(
                res => { 
                    dispatch(success(commonConstants.SEND_EMAIL_SUCCESS));
                },
                error => {
                    console.error(`There was an error while sending an email - ${error}`)
                    dispatch(failure(error));                    
                }
            );
    };
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