import {itemConstants} from '../../constants';

const INITIAL_STATE = {
  reportSummary: [],
  leadSummary: [],
  itemSummary: []
};

export function summary(state = INITIAL_STATE, action) {
    switch (action.type) {
        case itemConstants.SUMMARY_FETCH_SUCCESS:
          return {
            ...state,
            reportSummary: action.summary.reportSummary,
            itemSummary: action.summary.itemSummary,
            leadSummary: action.summary.leadSummary
          };             
        default:
          return state
    }
}