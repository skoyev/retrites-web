import {itemConstants} from '../../constants';

const INITIAL_STATE = {
  items: [],
  shouldReloadItems: false,
  summaryAmenity: [],
  retreatByCountries: [],
  retriteTypes: []
};

export function items(state = INITIAL_STATE, action) {
    switch (action.type) {
        case itemConstants.ITEMS_FETCH_SUCCESS:
          return {
            ... state,
            items: action.items
          };
        
        case itemConstants.ITEM_FETCH_SUCCESS:
          return {
            ... state,
            item: action.item
          }; 
          
        case itemConstants.FETCH_AMENITY_SUMMARY_SUCCESS:
          return {
            ... state,
            summaryAmenity: action.amenitySummary
          }; 

        case itemConstants.FETCH_RETRITE_BY_COUNTRY_SUCCESS:
          return {
            ... state,
            retreatByCountries: action.retreatByCountries.map(d => {
              return {id : d.id, name : d.name, picture : JSON.parse(d.attributes).picture};
            })
          }
        case itemConstants.FETCH_RETRITE_TYPES_SUCCESS:
          return {
            ... state,
            retriteTypes: action.retriteTypes.map(d => {
              return {id : d.id, name : `label.${d.name.toLowerCase()}`, typelink: `items/${d.name.toLowerCase()}`, picture : JSON.parse(d.attributes).picture};
            })
          }
      default:
          return state
    }
}