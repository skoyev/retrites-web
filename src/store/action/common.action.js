import { commonService } from '../../services';
import { commonConstants } from '../../constants';

export const commonActions = {
    fetchCategories,
    fetchSubCategories,
    addIntoStoreSelectedItem
};

function success(type, data) { return { type: type, data } }
function failure(type, error) { return { type: type, error } }

function addIntoStoreSelectedItem(item){
    return {type: commonConstants.ADD_SELECTED_ITEM_INTO_STORE, item}
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