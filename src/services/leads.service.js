export const leadsService = {
    loadLeads,
    createLead,
    deleteLead
};

const requestGetOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }        
}

const requestDeleteOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }        
}

function loadLeads(){
    return fetch(`/leads`, requestGetOptions);
}

function createLead(name, email, details){
    const requestPostOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, details })
    };

    return fetch(`/leads`, requestPostOptions);
}

function deleteLead(id){
    return fetch(`/leads/${id}`, requestDeleteOptions);
}