import {commonConstants} from '../../constants';
import moment from 'moment';

const INITIAL_STATE = {
  categories: [],
  countries: [],
  subCategories: [],  
  //selectedItem: {accomodation: {}, document:{}, facilitators: [{}], events:[{duration:1, from: moment().format('YYYY-MM-DD'), to: moment().add(1,'days').format('YYYY-MM-DD')}]},
  selectedItem: {},
  isNextStepValid: false,
  fascilitatorTypes: [],
  itemTypes: [],
  leadStates: [{id:0, name:'ALL'}],
  isLoading: false,
  messageStates: [{id: 1, name: 'All'}, {id: 2, name: 'Unread'}],
  isValidBillingForm: false,
  billingForm: {},
  stripe: {},  
  isSelectedItemChanged: false,
  isMainteinMode: undefined,
  billingProducts: [
      //{id: '1', name: 'Free Trail 15 days'},
      //{id: 'price_1GyOYOHoVViQEl0lMf8u9JOZ', name: '1 Month - 15$'}      
  ]
};

export function common(state = INITIAL_STATE, action) {
    switch (action.type) { 
        case commonConstants.IS_MAINTENANCE_MODE:
            return {
                ...state,
                isMainteinMode: action.data
            }      
        case commonConstants.FETCH_BILLING_PRODUCTS:
            return {
                ...state,
                billingProducts: action.data
            }      
        case commonConstants.LOAD_STRIPE_LIB:
            return {
                ...state,
                stripe: action.data
            }
        case commonConstants.SET_BILLING_FORM:
            return {
                ...state,
                billingForm: action.billingForm
            };             
        case commonConstants.IS_VALID_BILLING_FORM:
            return {
                ...state,
                isValidBillingForm: action.isValid
            };             
        case commonConstants.IS_LOADING_SUCCESS:
            return {
                ...state,
                isLoading: action.isLoading
            };             
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
                isSelectedItemChanged: false,
                selectedItem: action.item,
            }
        case commonConstants.IS_NEXT_STEP_VALID:
            return {
                ...state,
                isNextStepValid: action.isValid,
            }
        case commonConstants.FETCH_ITEM_TYPES_SUCCESS:
            action.data.splice(0, 0, {'id':0, 'name':'ALL'});
            return {
                ...state,
                itemTypes: [... action.data],
            }    
        case commonConstants.SET_SELECTED_ITEM_FIELD:
                return {
                    ...state,
                    isSelectedItemChanged: true,
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