import {reportConstants} from '../../constants';

const INITIAL_STATE = {
    summaryReports: []
};

export function report(state = INITIAL_STATE, action) {
    switch (action.type) {
        case reportConstants.REPORT_SUMMARY_FETCH_SUCCESS:
          return {
            ... state,
            summaryReports: action.summaryReports
          };             
        default:
          return state
    }
}