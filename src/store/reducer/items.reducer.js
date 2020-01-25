import {itemConstants, pageConstants, commonConstants} from '../../constants';

const INITIAL_STATE = {
  items: [],
  shouldReloadItems: false,
  summaryAmenity: [],
  retreatByCountries: [],
  retriteTypes: [],
  pageName: '',
  searchLength: ['3', '7', '14', '14>']
};

const itemFetchSuccess = (state, action) => {
  return {
    ... state,
    pageName: '',
    items: action.items
  };
}

export function items(state = INITIAL_STATE, action) {
    switch (action.type) {
        case itemConstants.ITEMS_FETCH_SUCCESS 
              || itemConstants.SUMMARY_FETCH_SUCCESS:
          return itemFetchSuccess(state, action);
        
        case itemConstants.ITEM_FETCH_SUCCESS:
          return {
            ... state,
            pageName: '',
            item: action.item
          }; 
          
        case itemConstants.FETCH_RETRITE_BY_COUNTRY_SUCCESS:
          return {
            ... state,
            pageName: '',
            retreatByCountries: action.retreatByCountries.map(d => {
              return {id : d.id, name : `label.${d.name.toLowerCase()}`, type: `${d.name.toLowerCase().replace(" ", "-")}`, picture : d.picture};
            })
          }

        case itemConstants.FETCH_RETRITE_TYPES_SUCCESS:
          return {
            ... state,
            pageName: '',
            retriteTypes: action.retriteTypes.map(d => {
              return {id : d.id, name : `label.${d.name.toLowerCase()}`, type: `${d.name.toLowerCase().replace(" ", "-")}`, picture : d.picture};
            })
          }

        case pageConstants.CLEAR_ITEMS_AND_REDIRECT_PAGE:
          return {
            ... state,
            items: [],
            pageName: action.pageName
          }
        default:
          return state
    }
}