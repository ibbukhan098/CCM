export const getUserRows = state =>state.usersTableData.rows;
export const getUserCols = state => state.usersTableData.columns;
export const getRoleOptions = state => {
    let roles = []
    state.rolesTableData.rows.forEach(element => {
      if (element.deleted == false) {
        roles.push(element)
      }
    });
    return roles;
  }

  export const getActiveRoleOptions=state=>{
    let activeRoles=[]
    state.rolesTableData.rows.forEach(element=>{
      if (element.deleted == false && element.status == true) {
        activeRoles.push(element)
      }
    })
    return activeRoles;
  }
export const getRoles = state => {
  let roles = []
  state.rolesTableData.rows.forEach(element => {
    if (element.deleted == false) {
      roles.push(element.name)
    }
  });
  return roles
}


export const getRolename = state => state.role
export const getRoleCol = state => state.rolesTableData.columns;

export const getPages = state => state.rolesTableData.pages;

// export const getRolesWithPages = state => {
//   let roles = []
//   state.rolesTableData.rows.forEach(element => {
      

//   });
// }

export const getFTPTimes = state => state.FTPTime;

export const getExportFileName = state => state.exportFileName;
export const getEnableTime = state => state.enableTime;

export const getAPICredentials = state => state.apiCredentials;



// export const getInvoicesTableColumns = state => state.InvoiceTableData.columns;
// export const getInvoicesTableRows = state => state.InvoiceTableData.rows;
 export const getCustomerDetails = state =>  
    state.CustomerTableData.rows

 export const getCustomerDetailsCols =  state =>  state.CustomerTableData.columns 

//  export const getUsername = (state) => {
//    return state.usersTableData.rows.username;
//  }

//  export const saveaddress = (state) => {
//    return state.saveaddress
//  }

export const getUserName = (state) => {
  return state.userName
}

export const findUserName = (state) => {
  return state.usersTableData.rows
}

export const getTimezone = state => state.timezone

export const getAccountName = (state) => {
  return state.accountName
}

export const getProfileImage = (state) => {
  return state.profileImage
}