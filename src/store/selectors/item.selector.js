import { createSelector } from 'reselect'

const itemsSelector = state => state.items.items

export const getSummaryItemsSelector = createSelector(
    itemsSelector,
    items => items.reduce((acc, item) => {
        console.log(acc);
        return acc + item.value, 0;
    })
)