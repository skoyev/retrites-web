import { leadsService } from '../../services';
import { leadsConstants } from '../../constants';

export const leadsActions = {
    fetchLeads,
    createLead,
    deleteLead
};

function success(leads) { return { type: leadsConstants.LEADS_FETCH_SUCCESS, leads } }
function failure(error) { return { type: leadsConstants.LEADS_FETCH_FAILURE, error } }

export function fetchLeads() {
    return dispatch => {
        leadsService.loadLeads()
            .then(
                data => { 
                    dispatch(success(data.leads));
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

export function createLead(name, email, description){
    return dispatch => {
        leadsService.createLead(name, email, description)
            .then(
                data => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

export function deleteLead(id){
    return dispatch => {
        leadsService.deleteLead(id)
            .then(
                data => { 
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

