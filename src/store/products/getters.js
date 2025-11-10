/*
export function someGetter (state) {
}
*/
export const getSuppliersTableColumns = state => state.suppliersTableData.columns;
export const getSuppliersTableRows = state => state.suppliersTableData.rows;

export const getHistoryTableColumns = state => state.historyTableData.columns;
export const getHistoryTableRows = state => state.historyTableData.rows;

export const getSubscriptionCol = state => state.subscriptionCol;
export const getSubscriptionRow = state => state.subscriptionRow;
export const getSubscriptionCat = state => state.industry;