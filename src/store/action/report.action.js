import { reportService } from '../../services';
import { reportConstants } from '../../constants';

export const reportActions = {
    fetchReportSummary,
    fetchTotalPageVisists,
    fetchTotalPageRequests,
    clickPageVisits,
    clickPageRequests,
};

function success(type, data) { return { type, data } }
function failure(type, error) { return { type, error } }

export function clickPageVisits(itemID) {
    return dispatch => {
        reportService.clickPageVisits(itemID)
    }
}

export function clickPageRequests(itemID) {
    return dispatch => {
        reportService.clickPageClicks(itemID)
    }    
}

export function fetchReportSummary() {
    return dispatch => {
        reportService.fetchReportSummary()
            .then(
                data => { 
                    dispatch(success(data.summaryReports));
                },
                error => {
                    dispatch(failure(error));                    
                }
            );
    };
}

/**
 * Total Page Visits
 */
export function fetchTotalPageVisists() {
    return dispatch => {
        reportService.fetchTotalPageVisists()
            .then(
                data => { 
                    dispatch(success(reportConstants.TOTAL_PAGE_VISITS_SUCCESS, data.data));
                },
                error => {
                    dispatch(failure(reportConstants.TOTAL_PAGE_VISITS_FAILED, error));                    
                }
            );
    };
}

/**
 * Total Page Requests
 */
export function fetchTotalPageRequests() {
    return dispatch => {
        reportService.fetchTotalPageRequests()
            .then(
                data => { 
                    dispatch(success(reportConstants.TOTAL_PAGE_REQUESTS_SUCCESS, data.data));
                },
                error => {
                    dispatch(failure(reportConstants.TOTAL_PAGE_REQUESTS_SUCCESS, error));                    
                }
            );
    };
}