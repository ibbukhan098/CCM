export default function () {
  return {
    closeFreePopup:false,
    // drawerState: true,
    loginForm: {
      Name : 'Saravanan',
      Email : 'saravanan@gmail.com',
      Password : '123'
    },
    userData: {},
    token: '',
    isLocalForgot: true,
    activePlan: {},
    plans: [],
    customPlans:{},
    pages: [],
    basicDetails: {},
    addressDetails:{},
    UpdatedAddress:{},
    countries: [],
    state:'',
    cities:[],
    accountData: {},
    isUserAccess: true,
    isDownloadAccess : false,
    totalDaysRemaining : 0,
    isUserNameExist : true,
    isEmailExist: true,
    account: {
      isAPI: false,
      isDownload : false
    },
    idleCounts: 0,
    isFirstTimeLoggedIn: false
  }
}
