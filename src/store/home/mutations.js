/*
export function someMutation (state) {
}
*/

export const storeCatalogs = (state,payload) => {
    let filterArr = payload.filter((obj) => obj.isApprovalRequired != true)
    state.catalogsTableData.rows = (filterArr).reverse()
 }
export const changeData=(state,payload)=>{
    state.catalogsTableData.rows=payload
}