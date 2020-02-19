import {commonConstants} from '../../constants';

const INITIAL_STATE = {
  categories: [],
  countries: [],
  subCategories: [],
  selectedItem: {}
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
        default:
            return state
    }
}