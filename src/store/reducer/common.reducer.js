import {commonConstants} from '../../constants';

const INITIAL_STATE = {
  categories: [],
  countries: [],
  subCategories: [],
  selectedItem: {},
  isStep1Valid: false
};

export function common(state = INITIAL_STATE, action) {
    switch (action.type) {
        case commonConstants.FETCH_CATEGORIES_SUCCESS:
            return {
                ... state,
                categories: [...action.data]
            };             
        case commonConstants.FETCH_SUB_CATEGORIES_SUCCESS:
            return {
                ... state,
                subCategories: [...action.data]
            }; 
        case commonConstants.FETCH_COUNTRIES_SUCCESS:
            return {
                ... state,
                countries: [...action.data]
            }; 
        case commonConstants.ADD_SELECTED_ITEM_INTO_STORE:
            return {
                ... state,
                selectedItem: action.item,
            }
        case commonConstants.ADD_SELECTED_ITEM_INTO_STORE:
            return {
                ... state,
                selectedItem: action.item,
            }

        case commonConstants.IS_STEP1_VALID:
            return {
                ... state,
                isStep1Valid: action.isValid,
            }
        case commonConstants.SET_SELECTED_ITEM_FIELD:
                return {
                    ... state,
                    selectedItem: {
                        ... state.selectedItem,
                        [action.fieldName] : Array.isArray( action.fieldValue ) ? action.fieldValue[0] : action.fieldValue
                    }
                }
        default:
            return state
    }
}