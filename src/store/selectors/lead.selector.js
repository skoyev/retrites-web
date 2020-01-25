import { createSelector } from 'reselect'

const leadsSelector = state => state.leads.leads

export const getSummaryLeadsSelector = createSelector(
    leadsSelector,
    items => items.reduce((acc, item) => acc + item.value, 0)
)