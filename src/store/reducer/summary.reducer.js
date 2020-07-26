import {itemConstants} from '../../constants';

const INITIAL_STATE = {
  summary: {reports: {}, amenities: {}, deals: []},
};

export function summary(state = INITIAL_STATE, action) {
    switch (action.type) {
        case itemConstants.SUMMARY_FETCH_SUCCESS:
          return {
            ...state,
            summary: action.data.summary
          };             
        default:
          return state
    }
}