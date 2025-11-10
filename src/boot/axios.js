import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { QSpinnerClock, Loading, Notify } from 'quasar'
// import { CCMAPI, WooCommerceAPI, ShopifyAPI, UtilityAPI  } from process.en
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.CCMAPI })

const stripeAPI = axios.create({ baseURL: process.env.StripeAPI })

const wooCommerceAPI = axios.create({ baseURL: process.env.WooCommerceAPI })

const shopifyAPI = axios.create({ baseURL: process.env.ShopifyAPI })

const utilityAPI=axios.create({ baseURL: process.env.UtilityAPI})

const catalogAPI=axios.create({ baseURL: process.env.CatalogAPI})

const imageURL = process.env.ImageURL

export default boot(({ app, store, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api

  app.config.globalProperties.$wooCommerceAPI = wooCommerceAPI  

  app.config.globalProperties.$shopifyAPI = shopifyAPI  

  app.config.globalProperties.$utilityAPI= utilityAPI

  app.config.globalProperties.$catalogAPI= catalogAPI

  app.config.globalProperties.$imageURL = imageURL
  api.interceptors.request.use(async req=>{
    if(store.state.auth.idleCounts > 3600){
      router.push('/login')
    }
    if(req.url == 'common/registeraccount'
    || req.url.includes('common/isusernameoremailexist')
    || req.url == 'common/getCountries'
    || req.url.includes('common/getallstatesbyzipcode')
    ){
      return req
    }
    //Attaching the ProgramID for every API calls
    if(req.method == 'POST' || req.url == 'login'){ 
      req.data.programID = parseInt(localStorage.getItem('pID'))
    }
    //Adding the token for every api calls
    const token = store.getters['auth/getToken']
    req.headers.Authorization = `Bearer ${token}`
      return req
  })

  api.interceptors.response.use(async res=>{
    if((res.config.url).includes('download/catalog')){
      let data = {
         fileName : res.headers['content-disposition'] ? res.headers['content-disposition'].split("filename=")[1].split(';')[0]: '',
         data : res.data
      } 
      return data
    }
    if (res.status == 503) {
      router.push('/maintenance')
    }
    Loading.hide()
    return res.data
  },
  err=>{
    Loading.hide()
    if(err?.response?.status == 401){
      if((err.response.config.url).includes('resetPassword')){
        return 'Expired'
      }
      localStorage.removeItem("token")      
      router.push('/login')  
      return
    }
    if(err?.response?.status == 500){
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Server error. Please contact support',
      })
    }
    if (err.response.status == 503) {
      router.push('/maintenance')
    }
    if(err.response.status == 400){
      if(!(err.response.config.url).includes('null')){
      Notify.create({
        color: 'negative',
        position: 'top',
        message: err.response.data?.errors[0]?.message,
      })
    }
    }
  })

  utilityAPI.interceptors.request.use(async req=>{
    if(!req.url.includes("uploadFileToFTPandSFTP") && !req.url.includes("ftpTest")){
      Loading.show({
        spinner: QSpinnerClock,
        spinnerColor: "indigo",
        backgroundColor: "black",         
      }) 
    }  
    const token = store.getters['auth/getToken']
    req.headers.Authorization = `Bearer ${token}`
    return req
  },  err=>{
    Loading.hide()
    console.log(err)
  })
 
  utilityAPI.interceptors.response.use(async res=>{
    if (res.status == 503) {
      router.push('/maintenance')
    }
    Loading.hide()
    return res.data
  },err=>{
    if (err?.response?.status == 503) {
      router.push('/maintenance')
    }
      Loading.hide()
      console.log(err)
    })

    

  wooCommerceAPI.interceptors.request.use(async req=>{
    if(store.state.auth.idleCounts > 3600){
      router.push('/login')
    }
    if(req.url.includes('bulkCreate')
    || req.url.includes('bulkUpdate')){
      return req
    }
    // Loading.show({
    //   spinner: QSpinnerClock,
    //   spinnerColor: "indigo",
    //   backgroundColor: "black",         
    // })   
    const token = store.getters['auth/getToken']
    req.headers.Authorization = `Bearer ${token}`
    return req
  },  err=>{
    Loading.hide()
    console.log(err)
  })


  wooCommerceAPI.interceptors.response.use(async res=>{
    if (res.status == 503) {
      router.push('/maintenance')
    }
    Loading.hide()
    return res.data
  },  err=>{
    if (err?.response?.status == 503) {
      router.push('/maintenance')
    }
    Loading.hide()
    console.log(err)
  })


  shopifyAPI.interceptors.request.use(async req=>{
    if(store.state.auth.idleCounts > 3600){
      router.push('/login')
    }
    if(req.url.includes('bulkCreate')
    || req.url.includes('bulkUpdate')){
      return req
    }
    if(!req.url.includes("storeSchedule") && !req.url.includes("ftpTest")){
      Loading.show({
        spinner: QSpinnerClock,
        spinnerColor: "indigo",
        backgroundColor: "black",         
      })
    }
    const token = store.getters['auth/getToken']
    req.headers.Authorization = `Bearer ${token}`
    return req
  },  err=>{
    Loading.hide()
    console.log(err)
  })

  shopifyAPI.interceptors.response.use(async res=>{
    if (res.status == 503) {
      router.push('/maintenance')
    }
    Loading.hide()
    return res.data
  },  err=>{
    if (err?.response?.status == 503) {
      router.push('/maintenance')
    }
    Loading.hide()
    console.log(err)
  })

  stripeAPI.interceptors.request.use(async req=>{
    if(store.state.auth.idleCounts > 3600){
      router.push('/login')
    }
  
    const token = store.getters['auth/getToken']
    req.headers.Authorization = `Bearer ${token}`
    return req
  },  err=>{
    Loading.hide()
    console.log(err)
  })


  catalogAPI.interceptors.request.use(async req=>{    
    const token = store.getters['auth/getToken']
    req.headers.Authorization = `Bearer ${token}`
    return req
  }, err=>{
    Loading.hide()
    console.log(err)
  })

  catalogAPI.interceptors.response.use(async res=>{  
    return res.data
  }, err=>{
    Loading.hide()
    console.log(err)
  })


  router.beforeEach((val)=>{
    if(val.path == '/auth/forgot'){
       store.state.auth.isLocalForgot = true;
    }
    if(val.path == '/subscirptions'){
      // store.state.auth.
    }
  })
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, wooCommerceAPI, shopifyAPI ,utilityAPI, imageURL, stripeAPI, catalogAPI}
