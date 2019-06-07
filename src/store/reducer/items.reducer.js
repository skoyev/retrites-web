import {itemConstants} from '../../constants';

const INITIAL_STATE = {
  items: []
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
        default:
          return state
    }
}