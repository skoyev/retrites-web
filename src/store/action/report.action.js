import { reportService } from '../../services';
import { reportConstants } from '../../constants';

export const reportActions = {
    fetchReportSummary
};

function success(summaryReports) { return { type: reportConstants.REPORT_SUMMARY_FETCH_SUCCESS, summaryReports } }
function failure(error) { return { type: reportConstants.REPORT_SUMMARY_FETCH_FAILURE, error } }

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