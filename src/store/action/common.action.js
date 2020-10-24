import { commonService } from '../../services';
import { commonConstants, itemConstants } from '../../constants';
import { loadStripe } from '@stripe/stripe-js';

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
    resetPassword,
    setIsValidBillingForm,
    setBillingForm,
    loadRemoteStripe,
    fetchBillingProducts,
    fetchSummary,
    isMaintenance,
    subscribe,
    fetchUsers,
    fetchUsersByName,
    updateUser
};

function success(type, data) { return { type: type, data } }
function failure(type, error) { return { type: type, error } }

function setBillingForm(billingForm){
    return {type: commonConstants.SET_BILLING_FORM, billingForm}
}

function addIntoStoreSelectedItem(item){
    return {type: commonConstants.ADD_SELECTED_ITEM_INTO_STORE, item}
}

function setIsNextStepValid(isValid){
    return {type: commonConstants.IS_NEXT_STEP_VALID, isValid}
}

function setIsValidBillingForm(isValid) {
    return {type: commonConstants.IS_VALID_BILLING_FORM, isValid}
}

function updateUser(id, status){
    return dispatch => {
        commonService.updateUser(id, status)
                     .then(res  => dispatch(fetchUsers()))
                     .catch(err => console.log(err))
    }
}

function fetchUsersByName(name) {
    return dispatch => {
        commonService.fetchUsersByName(name)
                     .then(res  => dispatch(success(commonConstants.FETCH_USERS, res.data.result)))
                     .catch(err => console.log(err))
    }
}

function fetchUsers(){
    return dispatch => {
        commonService.fetchUsers()
                     .then(res  => dispatch(success(commonConstants.FETCH_USERS, res.data.result)))
                     .catch(err => console.log(err))
    }
}

function subscribe(name, email) {
    return dispatch => {
        commonService.subscribe(name, email)
                     //.then(res  => )
                     .catch(err => console.log(err))
    }
}

function isMaintenance(){
    return dispatch => {
        commonService.isMaintenance()
                     .then(res  => dispatch(success(commonConstants.IS_MAINTENANCE_MODE, res.data.result)))
                     .catch(err => console.log(err))
    }
}

function fetchBillingProducts() {
    return dispatch => {
        commonService.fetchBillingProducts()
                     .then(res  => dispatch(success(commonConstants.FETCH_BILLING_PRODUCTS, res.data.data)))
                     .catch(err => console.log(err))
    }
}

function loadRemoteStripe () {
    return dispatch => {
        loadStripe('pk_test_51GwbI2HoVViQEl0lRjMW3EcIVYg9nNQrdrehnFW0u2iLMLr2PDd1E4Y3CsdfHHoACID1nfMs5LNVrrJzOxROOHh300uPYfTGn7')
            .then(res  => dispatch(success(commonConstants.LOAD_STRIPE_LIB, res)))
            .catch(err => console.log(err))
    }
}

export function fetchSummary() {
    return dispatch => {
        return commonService.fetchSummary()
                          .then(res => dispatch(success(itemConstants.SUMMARY_FETCH_SUCCESS, res.data)))
                          .catch(error => {throw (error)})
    }
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
        return commonService
                .getAllCategories()
                .then(
                    res => { 
                        dispatch(success(commonConstants.FETCH_CATEGORIES_SUCCESS, res.data.data));
                        return res;
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

function fetchSubCategories(catID) {
    return dispatch => {
        commonService.getSubCategories(catID)
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