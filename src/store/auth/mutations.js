// export const updateDrawerState = (state, opened) => {
//     state.drawerState = opened
//     
//   }

export const storeAuth = (state, data) => {
  state.token = data
  localStorage.setItem('token', data)
}

export const storeUserDetials = (state, data) => {
  state.userData = data
}

export const closeFreePopup = (state,payload) => {
  state.closeFreePopup = payload
}

export const clearStateandCity = (state, data) => {
  state.state = '';
    state.cities=[];
}

// export const storeAccount = (state, payload) => {
//   state.account = {
//     isAPI : payload.plan.detail.aPI,
//     isDownload : payload.plan.detail.excel
//   }
// }

export const storeAccount=(state,payload)=>{
  state.accountData=payload
}
export const setPlans=(state,payload)=>{
  state.plans=payload
}
export const storePlans = (state, data) => {
  state.plans = data
for (let i=0;i<data.length;i++){
data[i].detail.sKUsLimit=kFormatter(data[i].detail.sKUsLimit)

}
} 
const kFormatter=(num)=>{
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

export const customPlans=(state,data)=>{
  state.customPlans=data
}

export const storePages = (state, data) => {
  // state.token = data
  // localStorage.setItem('token', data)
  state.pages = data
}

export const storeProgramID = (state, programID) => {
 localStorage.setItem('pID', programID)
}

export const savePlan = (state, payload) => {
state.activePlan = payload;
}

export const storeStateandCities = (state, data)=>{
  state.state = {
    stateName : data.stateName,
    stateCode : data.stateCode
  }
  data.stateName
  state.cities = data.cities
}

export const storeBasicDetails = (state, data)=>{
  state.basicDetails = data
}
export const storeaddressId=(state,data)=>{
  state.addressDetails=data
}

export const storeSaveAddress=(state,data)=>{
  state.UpdatedAddress=data
  state.addressDetails = data
}

export const storeCountries = (state, data)=>{
state.countries = data
}


export const storeIsDownloadAccess = (state, payload) => {
  state.isDownloadAccess = payload;
}

export const storeDaysRemaining = (state, payload) => {
  state.totalDaysRemaining = payload;
}


export const storeusernameValid = (state, payload) => {
  state.isUserNameExist = payload;
}

export const storeEmailValid = (state, payload) => {
  state.isEmailExist = payload;
}

export const storeLoginStatus = (state, payload) => {
  state.isFirstTimeLoggedIn = payload;
}
