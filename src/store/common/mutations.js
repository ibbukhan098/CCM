export const createUserState = (state, payload) => {
  state.usersTableData.rows.push(payload)
}

export const deleteUserState = (state, id) => {
  // 
  let index = state.usersTableData.rows.map(el => el.id).indexOf(id)
  state.usersTableData.rows.splice(index, 1);
  // 
}
export const saveUser = (state,payload) => {
  state.userName = payload
}

export const deleteRoleState = (state, id) => {
  let index = state.rolesTableData.rows.map(el => el.id).indexOf(id)
  state.rolesTableData.rows.splice(index, 1);
}

export const storeRole =  (state, payload) => {
  state.role = payload
}

export const updateUser = (state, row) => {
  let updateRow = state.usersTableData.rows.findIndex(a=> a.id == row.id);
  row.deleted ? state.usersTableData.rows.splice(updateRow, 1) : state.usersTableData.rows[updateRow] = row
}

export const updateRole = (state, row) => {
  let updateRow = state.rolesTableData.rows.findIndex(a=> a.id == row.id);
  row.deleted ? state.rolesTableData.rows.splice(updateRow, 1) : state.rolesTableData.rows[updateRow] = row
}

export const createRoleState = (state, payload) => {
  state.rolesTableData.rows.push(payload)
}

export const storeUsers = (state, payload) => {
  state.usersTableData.rows = payload
}

export const storeRoles = (state, payload) => {
  state.rolesTableData.rows = payload
}

export const addRoles = (state, payload) => {
   
  state.rolesTableData.rows.push(payload)
}

export const addNewUsers = (state, payload) => {
  state.usersTableData.rows.push(payload)
}

export const storePages = (state, payload) => {
  state.rolesTableData.pages = payload
}

export const addFTP = (state, payload) => {

}

export const closePopup = (state,payload) => {
  state.popup = payload
}

export const closePrompt = (state,payload) => {
  state.promptUser = payload
}

export const addExportData = (state, payload) => {
  state.exportFileName=payload.fileName
  state.enableTime=payload.enableTime
}

export const APICredentials = (state, payload) => {
  state.apiCredentials = payload
}

export const setCustomerDetails=(state,payload)=>{
  state.CustomerTableData.rows=payload
  state.name=payload[0]["name"]
}

export const storeTimezone = (state, data) => {
  state.timezone = data
}

export const setAccountName = (state, data) => {
  state.accountName = data
}

export const updateLayoutProfile = (state, payload) => {
  state.profileImage = payload
}

export const savePdf = (state, payload) => {
  state.licensFeeData = payload
}