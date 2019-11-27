import {itemConstants, pageConstants} from '../../constants';

const INITIAL_STATE = {
  items: [],
  shouldReloadItems: false,
  summaryAmenity: [],
  retreatByCountries: [],
  retriteTypes: [],
  pageName: ''
};

export function items(state = INITIAL_STATE, action) {
    switch (action.type) {
        case itemConstants.ITEMS_FETCH_SUCCESS:
          return {
            ... state,
            pageName: '',
            items: action.items
          };
        
        case itemConstants.ITEM_FETCH_SUCCESS:
          return {
            ... state,
            pageName: '',
            item: action.item
          }; 
          
        case itemConstants.FETCH_AMENITY_SUMMARY_SUCCESS:
          return {
            ... state,
            pageName: '',
            summaryAmenity: action.amenitySummary
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