import {commonConstants} from '../../constants';
import moment from 'moment';

const INITIAL_STATE = {
  categories: [],
  countries: [],
  subCategories: [],  
  selectedItem: {accomodation: {}, document:{}, facilitators: [{}], events:[{duration:1, from: moment().format('YYYY-MM-DD'), to: moment().add(1,'days').format('YYYY-MM-DD')}]},
  isNextStepValid: false,
  fascilitatorTypes: []
};

export function common(state = INITIAL_STATE, action) {
    switch (action.type) {
        case commonConstants.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: [...action.data]
            };             
        case commonConstants.FETCH_SUB_CATEGORIES_SUCCESS:
            return {
                ...state,
                subCategories: [...action.data]
            }; 
        case commonConstants.FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                countries: [...action.data]
            }; 
        case commonConstants.FETCH_FASCILITATOR_TYPES_SUCCESS:
            return {
                ...state,
                fascilitatorTypes: [...action.data],
            }
        case commonConstants.ADD_SELECTED_ITEM_INTO_STORE:
            return {
                ...state,
                selectedItem: action.item,
            }
        case commonConstants.ADD_SELECTED_ITEM_INTO_STORE:
            return {
                ...state,
                selectedItem: action.item,
            }
        case commonConstants.IS_NEXT_STEP_VALID:
            return {
                ...state,
                isNextStepValid: action.isValid,
            }
        case commonConstants.SET_SELECTED_ITEM_FIELD:
                return {
                    ...state,
                    selectedItem: {
                        ... state.selectedItem,
                        //[action.fieldName] : Array.isArray( action.fieldValue ) ? action.fieldValue[0] : action.fieldValue
                        [action.fieldName] : action.fieldValue
                    }
                }
        default:
            return state
    }
}