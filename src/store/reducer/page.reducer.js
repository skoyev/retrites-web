import {pageConstants} from '../../constants';

const INITIAL_STATE = {
  items: [],
  hasNextPage: false,
  nextPage: ''
};

export function page(state = INITIAL_STATE, action) {
    switch (action.type) {
      case pageConstants.REDIRECT_PAGE:
        return {
          ... state,
          hasNextPage: true,
          nextPage: action.pageName
        };

      default:
          return state
    }
}