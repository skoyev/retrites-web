import { leadsService, commonService } from '../../services';
import { leadsConstants } from '../../constants';

export const leadsActions = {
    fetchLeads,
    createLead,
    deleteLead,
    fetchLeadSummary
};

function successLeadSummary(leadSummary){ return { type: leadsConstants.LEAD_SUMMARY_FETCH_SUCCESS, leadSummary } }
function success(leads) { return { type: leadsConstants.LEADS_FETCH_SUCCESS, leads } }
function failure(error) { return { type: leadsConstants.LEADS_FETCH_FAILURE, error } }

export function fetchLeadSummary() {
    return dispatch => {
        leadsService.fetchLeadSummary()
            .then(
                data => { 
                    dispatch(successLeadSummary(data.leadSummary));
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

export function fetchLeads(ownerId) {
    return dispatch => {
        leadsService.loadLeads(ownerId)
            .then(
                res => { 
                    dispatch(success(res.data.leads));
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

export function createLead(amenityID, name, email, description){
    return dispatch => {
        leadsService.createLead(amenityID, name, email, description)
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

