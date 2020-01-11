import axios from 'axios';

export const leadsService = {
    loadLeads,
    createLead,
    deleteLead,
    fetchLeadSummary
};

const requestGetOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }        
}

const requestDeleteOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }        
}

function loadLeads(ownerId){
    return axios.get(`/api/leads/${ownerId}`);
}

function fetchLeadSummary(){
    return fetch(`/leads/summary`, requestGetOptions);
}

function createLead(amenityID, name, email, details){
    return axios.post(`/api/leads`, {amenityID, name, email, details});
}

function deleteLead(id){
    if(!id){
        console.log('Error. Lead id is requered');
        return;
    }
    return fetch(`/leads/${id}`, requestDeleteOptions);
}