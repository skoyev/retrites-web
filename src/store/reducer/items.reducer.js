import {itemConstants} from '../../constants';

export function items(state = {}, action) {
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
        default:
          return state
    }
}