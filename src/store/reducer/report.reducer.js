import {reportConstants} from '../../constants';

const INITIAL_STATE = {
  reports: [],
  totalPageVisists: [],
  totalPageRequests: []
};

export function report(state = INITIAL_STATE, action) {
    switch (action.type) {
      case reportConstants.TOTAL_PAGE_REQUESTS_SUCCESS:
        return {
          ...state,
          totalPageRequests: action.data.data
        };

      case reportConstants.TOTAL_PAGE_VISITS_SUCCESS:
        return {
          ...state,
          totalPageVisists: action.data.data
        };

      default:
        return state
    }
}