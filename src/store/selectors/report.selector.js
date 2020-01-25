import { createSelector } from 'reselect'

const reportsSelector = state => state.report.reports

export const getSummaryReportsSelector = createSelector(
    reportsSelector,
    reports => reports.reduce((acc, item) => acc + item.value, 0)
)