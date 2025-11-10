import { api,utilityAPI } from 'boot/axios'
import { useRoute,useRouter } from 'vue-router'
import jwt_decode from 'jwt-decode'

import { Notify } from 'quasar'
import { date } from 'quasar'
var axios = require('axios');

export const checkZipcode=async({commit},payload)=>{
    let zipCode = payload.zipCode
    let countryCode=payload.countryCode
    let result = await axios.get(`https://api.worldpostallocations.com/pincode?postalcode=${zipCode}&countrycode=${countryCode}`)
    return result.data
      
}

export const closeFreePopup = ({commit},payload) => {
    commit('closeFreePopup',payload)
}

//Login Authentication
export const login = async({ commit }, payload) => {
let timeout;

    function myLogin() {
        localStorage.removeItem("token")
        window.location.reload()
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Login session expired login again',
          })
    }


    let loginResult=await api.post("login",payload)
    if(loginResult?.initial_login){
        commit('storeLoginStatus', true)
    }
    if(loginResult?.isEmailValidated==0){
        return{isValidate:false}
    }
    if(loginResult.access_token !== null){
        localStorage.setItem('token', loginResult.access_token)
        let token = jwt_decode(loginResult.access_token)
        localStorage.setItem('roleId', token.RoleID)
        localStorage.setItem('accountId' , token.AccountID);
        localStorage.setItem('userId', token.UserID)
        localStorage.setItem('userType', token.UserType)
        timeout = setTimeout(myLogin, 3600000);
        return "success"
    }else{
        Notify.create({
            type: 'negative',
            classes : "notifyClass",
            position: 'top',
            message: 'Enter valid username and password',
          })
    }
}

export const createUser = async ({commit, dispatch}, payload) =>{
    try {
        const createdUser = await api.post('common/registeraccount', payload)
        commit('storeUserDetials', createdUser)
        return createdUser
    } catch (error) {
        return "error"
    }
}

export const resendMails=async({commit,dispatch},payload)=>{
    try{
        const resend=await api.post('common/resend-activation-link',payload)
        const message=resend.mailSent
        return message
    } catch (error) {
        return "error"
    }
}
export const storeBasicDetails = ({commit}, payload) =>{
    commit('storeBasicDetails', payload)
}

export const forgotMail = ({commit}, payload) =>{
    api.post('sendmail', payload)
    .then(val=>{

    })
    .catch(()=>{
         return "error"
    })
}

export const getAccount = async ({ commit,dispatch, state }, payload) => {
    try {
        let accDetails = await api.get('customer/alldetails')
        let allplans = await dispatch('getPlans')
        allplans = allplans.filter(x=>x.id == accDetails.planID)
        accDetails.plan = allplans[0]
        let timeStamp = Date.now()
        let validityDays = parseInt(accDetails.plan.detail.validityDays)
        timeStamp = date.formatDate(timeStamp, 'YYYY-MM-DD')
        let accountCreated = accDetails.createdDate
        accountCreated = date.formatDate(accountCreated, 'YYYY-MM-DD')
        let diff = date.getDateDiff(timeStamp, accountCreated)
        let totalDaysRemaining = validityDays - diff
        commit('storeAccount', accDetails);
        commit('storeDaysRemaining', totalDaysRemaining)
        return accDetails
    } catch (error) {
    }
}

export const forgotPassword = async({commit}, payload) =>{
    try{
    let value=await api.post('common/resetPassword', payload)
    return value
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while changing password',
          })
    }
}

export const payment = async ({commit}, payload) =>{
    try {
     const payment = await api.post('payment/create-subscription', payload);
     if(payment==undefined){
        Notify.create({
            color: 'negative',
            position: 'top-right',
            message: 'Invalid card details ',
          })
     } else {
     return payment
     }
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while doing payments',
          })
    }
}

export const updatepayment = async ({commit}, payload) =>{
    try {
     const updatepayment = await api.post('payment/update-subscription', payload);
     if(updatepayment==undefined){
      Notify.create({
          color: 'negative',
          position: 'top',
          message: 'Invalid card details ',
        })
   } else {
   return updatepayment
   }
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while doing payments',
          })
    }
}
export const updateCard = async ({commit}, payload) =>{
  try {
   const payment = await api.post('payment/update-payment-method', payload);
   if(payment==undefined){
      Notify.create({
          color: 'negative',
          position: 'top',
          message: 'Invalid card details.',
        })
   } else {
   return payment
   }
  } catch (error) {
      Notify.create({
          color: 'negative',
          position: 'top',
          message: 'There was an error while saving the card details.',
        })
  }
}
export const getPlanDetails = async ({commit, state}, payload) => {
    try {
        let pID = payload.planID
        let Plans = await api.get('customer/updateaccountplan/'+pID)
        commit('setPlans', Plans)
    } catch (error) {

    }
}
export const getPages = async ({ commit, state, dispatch }, payload) => {
   let pages = await api.get('user/get/true')
    commit('storePages', pages);
    dispatch('getAccount')
    return pages
}

export const clearStateandCity = async ({ commit, state }, payload) => {
    commit('clearStateandCity')
}

export const getPlans = async ({ commit, state }, payload) => {
    try {
        let pID = localStorage.getItem('pID')
        let plans = await api.get('common/getplans/'+pID);
        plans.forEach(element => {
            element.detail = JSON.parse(element.detail)
        });
        let customerplan = plans
        let customPlans=plans.filter(val=>val.isCustomPlan === true)
        plans = plans.filter(val=> !val.isCustomPlan)
        commit('storePlans', plans);
        commit('customPlans',customPlans[0]);
        return customerplan
    } catch (error) {
    }
}


export const getPlansForPayment = async ({ commit, state }, payload) => {
    try {
        let pID = localStorage.getItem('pID')
        let plans = await api.get('common/getplans/'+pID);
        plans.forEach(element => {
            element.detail = JSON.parse(element.detail)
        });
        plans=plans.filter(val=>val.name != 'Free')
        return plans
    } catch (error) {
    }
}

export const getProgramID = async ({ commit, state }, payload) => {
        commit('storeProgramID', 1)
}

export const getCountries = async ({ commit, state }, payload) => {
    await api.get('common/getCountries').then(res=>{
        commit('storeCountries', res);
     })
     .catch((err)=>{
        return "error"
     })
}

export const validateUserdata = async ({commit, dispatch}, payload) =>{
    let isUserNameExist = await dispatch('validateUser', { programID : 1, type : 0, value: payload.userName })
    let isEmailExist = await dispatch('validateUser', { programID : 1, type : 1, value: payload.email })
    return { userNameStatus : isUserNameExist, emailStatus: isEmailExist  }
}

export const validateUser = async ({commit}, payload) =>{

    try {
        const validateUserorMail = await api.get('common/isusernameoremailexist?ProgramID='+payload.programID+'&Field='+payload.type+'&Value='+payload.value)
        return validateUserorMail
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while validating the username',
          })
    }
}

export const getStateandCities = async ({ commit, state }, payload) => {
    try {
      let stateCity = await api.get('common/getallstatesbyzipcode?ZipCode='+payload.zipCode+'&CountryCode='+payload.countryCode)
      commit('storeStateandCities', stateCity);
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while getting the state and cities',
          })
    }
}


export const addAddress = async ({commit}, payload) =>{
    try {
        // const address = await api.post('address/save', payload)
        const address = await api.post('customer/save-address', payload)
        return address
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while adding address',
          })
    }
}

export const getAddressId=async({commit},payload)=>{
    try{
        const addressdetails= await api.get('customer/get-address?isUser=false')
        commit('storeaddressId',addressdetails)
        return addressdetails
    } catch(error){
    }
}

export const saveAddress=async({commit},payload)=>{
    try{
        const saveAddress = await api.post('customer/save-address', payload)
    if(saveAddress){
        Notify.create({
            type: 'positive',
            position: 'top',
            message: 'Address saved successfully',
          })
        commit('storeSaveAddress',saveAddress)
    }
    return saveAddress
} catch(error) {
    Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Error while adding address',
      })
    }
}
export const storePlan = async ({commit}, payload)=>{
    try {
        commit('savePlan', payload)
        return payload
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while adding address',
          })
    }
}


export const sendResetMail = async ({commit}, payload)=>{
    try {
        const reset = await api.post('common/sendpasswordresetlink', payload)
        if(reset){
            Notify.create({
                type: 'positive',
                position: 'top',
                message: 'We have sent a password reset link to your registered email.',
              })
            }
        else{
            Notify.create({
                type: 'negative',
                position: 'top',
                message: 'Error while sending the mail',
              })
            }
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while sending a reset link',
          })
    }

    return "success"
}

export const contactapi=async({commit},payload)=>{
    try{
        const createdContact=await utilityAPI.post('contact-api',payload);
        // commit('storeContactDetials',createdContact)
        return createdContact.result
    } catch (error) {
        return error.ContactId
    }
}
 export const updatecontactapi=async({commit},payload)=>{
     try{
         const updatedContact=await utilityAPI.post('update-api',payload);
         return updatedContact.result
     } catch (error) {
         return "error"
     }
 }
export const logout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("userId")
    localStorage.removeItem("accountId")
    localStorage.removeItem("userType")
 
    return "success"
}

export const changeLoginStatus = async({commit},payload)=>{
  commit('storeLoginStatus', payload)
}
