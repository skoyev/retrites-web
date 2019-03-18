import {itemConstants} from '../../constants';

export function items(state = {}, action) {
    switch (action.type) {
        case itemConstants.ITEM_FETCH_SUCCESS:
          return {
            ... state,
            items: action.items
        };
        /*
        case ADD_ITEM_SUCCESS:
          return {
            ... state,
            shouldReloadItems: action.shouldReloadItems
        };
        */
        default:
          return state
    }
}