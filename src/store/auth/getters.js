import jwt_decode from "jwt-decode";


export const getToken = state => localStorage.getItem('token') ? localStorage.getItem('token') : '';

export const getPlans =((state) =>{    
    return state.plans;
} ) 
export const getCustomPlans =((state) =>{    
    return state.customPlans;
} )

export const closePopup = state => state.closeFreePopup;

export const getPages = state => state.pages;

export const getCountries = state => state.countries;

export const getState = state => state.state;

export const getCities = state => state.cities;

export const getProgramID = state => localStorage.getItem('pID');

export const getUser = state => state.userData;

export const getActivePlan = state => state.activePlan;

export const getAccountData = state => state.accountData;

export const getAddress=state=>state.addressDetails

export const getSavedAddress=state=>state.UpdatedAddress

export const account = state => state.account;

export const getUserNameStatus = state => state.isUserNameExist;

export const getEmailStatus = state => state.isEmailExist;

export const getTotalUsers = state => parseInt(state.accountData.plan.detail.users) == 0 ? 100 : parseInt(state.accountData.plan.detail.users)

export const getRemainingDays = state => {    
    return state.totalDaysRemaining < 0 ? 0 : state.totalDaysRemaining
}

export const getLoginStatus = state => state.isFirstTimeLoggedIn;

export const getIsTrailEnded = state => {
    let token  = localStorage.getItem('token')
    let expiryTime = parseInt(jwt_decode(token).FreeDays)
    if(expiryTime < 0){
        return true
    }
    return false
};

export const idleCount = state => {
    let timer, currSeconds = 0;
        function resetTimer() {
            clearInterval(timer);
  
            /* Reset the seconds of the timer */
            currSeconds = 0;
  
            /* Set a new interval */
            timer = 
                setInterval(startIdleTimer, 1000);            
        }
  
        // Define the events that
        // would reset the timer
        window.onload = resetTimer;
        window.onmousemove = resetTimer;
        window.onmousedown = resetTimer;
        window.ontouchstart = resetTimer;
        window.onclick = resetTimer;
        window.onkeypress = resetTimer;
  
        function startIdleTimer() {
            currSeconds++;   
            state.idleCounts = currSeconds         
        }
        return timer
}

