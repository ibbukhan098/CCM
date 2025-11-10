export const storeSubSuppliers = (state,payload) => {
    state.suppliersTableData.rows = payload
 }
 
 export const storeAllSuppliers = (state,payload) => {
    state.subscriptionRow = payload
 }

 export const storeHistory = (state,payload) => {
    
   state.historyTableData.rows = payload.reverse()
}
