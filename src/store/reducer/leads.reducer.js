import {leadsConstants} from '../../constants';

const INITIAL_STATE = {
  leads: []
};

export function leads(state = INITIAL_STATE, action) {
    switch (action.type) {
        case leadsConstants.LEADS_FETCH_SUCCESS:
          return {
            ... state,
            leads: action.leads
          };             
        default:
          return state
    }
}