import {leadsConstants, itemConstants} from '../../constants';

const INITIAL_STATE = {
  leads: [],
  summaryLeads: []
};

export function leads(state = INITIAL_STATE, action) {
    switch (action.type) {
        case leadsConstants.LEADS_FETCH_SUCCESS 
              || itemConstants.SUMMARY_FETCH_SUCCESS:
          return {
            ... state,
            leads: action.leads
          };
        case leadsConstants.LEAD_SUMMARY_FETCH_SUCCESS:
          return {
            ... state,
            summaryLeads: action.leadSummary
          };            
        default:
          return state
    }
}