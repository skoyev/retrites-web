export const reportService = {
    fetchReportSummary
};

const requestGetOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }        
}

function fetchReportSummary(){
    return fetch(`/report/summary`, requestGetOptions);
}