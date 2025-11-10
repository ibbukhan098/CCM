import  { wooCommerceAPI,api } from 'boot/axios'
import axios from 'axios'
import { exportFile } from 'quasar'

import { Notify} from 'quasar'



export const getProductData = async ({ commit }, payload) => {       
    const products = await wooCommerceAPI.get('getProducts')

   return products
}


export const storeCredentials = async ({commit}, payload) => {
    const storedCredentials = await wooCommerceAPI.post('storeConfigurations', payload)
    if(!storedCredentials){
              Notify.create({
                        type: 'negative',
                        position: 'top',
                        message: 'Error when storing the credentials',
                })
        return
    }
    if(storedCredentials.data == "Invalid"){
        Notify.create({
            type: 'negative',
            position: 'top',
            message: 'Credentials are not valid',
        })
        return
    }
    Notify.create({
            type: 'positive',
            position: 'top',
            message: 'Stored credentials successfully',
        })        
    return storedCredentials
}

export const getCredentials = async ({commit,state}) => {

    let data = {
        accountId: localStorage.getItem("accountId"),
    }
    
    const credentials = await wooCommerceAPI.post('getCredentials', data);
    commit('storeWoocommerceCredentials',credentials)
    // if(!credentials){
    //     Notify.create({
    //         type: 'negative',
    //         position: 'top',
    //         message: 'Error When Getting The Credentials',
    //     })
    //     return
    // }
    return credentials

}

export const getMapData = async ({ commit }, payload) => {
    let data = {
        accountId : parseInt(localStorage.getItem('accountId'))
    }
    const mapData = await wooCommerceAPI.post('getMapData', data)
    if(mapData){
        return mapData.data
    }
    else{
        return []
    }    
}

export const download= async({ commit }, payload) =>{
    
    let {catalogId,catalogName}=payload;
    let ip
    let acntId = localStorage.getItem('accountId');
   let userId = localStorage.getItem('userId');

   try{
        ip=await axios.get("https://api.ipify.org")
   }
   catch(error){
       console.log(error.message)
   }
    let data={
            id  : 0,
            programID: 1,
            catalogID:catalogId,
            referrer: "https://app-ccm.sellerscommerce.com/woocommerce",
            accessType: 6,
            status: true,
            fileName: `SC_WOO_${catalogName}.csv`,
            apiRequest: "/downloadCat",
            requestBy:parseInt(userId),
            accountId:parseInt(acntId),
            requestIp: ip.data,
            requestedDate:new Date().toUTCString(),
            requestPayload: "string",
            resposePayload: "string",
            responseTime: "string",
        } 
        try{
            const downloadCatlog = await wooCommerceAPI.post('downloadCat', data);

            // if(downloadCatlog){
            //     let postData= await api.post('download/loghistory', data) 
            // }

            let status

            

            if(downloadCatlog.response!==true){

                status = exportFile(`SC_WOO_${catalogName}.csv`, downloadCatlog.response)
                if (status) {
                    Notify.create({
                    type: 'positive',
                    position: 'top',
                    message: 'File downloaded successfully',
                })
                }else {
                    Notify.create({
                        color: 'negative',
                        position: 'top',
                        message: 'Error while downloading the file',
                    })
                }

            }
            else{
                Notify.create({
                    position: 'top',
                    message: 'No Data Available',
                    type:"warning"
                })
            }
    }
    catch(err){
        console.log(err)
    } 
 }


export const saveMap = ({ commit, state }, payload) => {
    const savedData = wooCommerceAPI.post('storeSchedule', payload)
    commit('setShopifyKey', payload);
}

export const saveAll = async ({ commit }, payload) => {

    const saveAll = await wooCommerceAPI.post('storeSchedule', payload)
    if(saveAll){
        Notify.create({
            type: 'positive',
            position: 'top',
          message: 'Your catalog will schedule soon'
        }) 
    }


}

// export const getScheduleStatus = async ({ commit }, payload) => {
//     let account = {  accountId : localStorage.getItem('accountId')}
//     const mapData = await wooCommerceAPI.post('getBulkStatus', account)
//     return mapData  
// }

export const getProgressStatus = async ({ commit,dispatch }, payload) => {
    try {
        const checkProgress = await wooCommerceAPI.post('getBulkStatus', payload)        
        return checkProgress
    } catch (error) {
        console.log(error.response)
    }      
}



export const storeScheduleTime = async ({ commit }, payload) => {
    const mapData = await wooCommerceAPI.post('storeScheduleTime', payload)
    if(mapData.status == "Success"){
        Notify.create({
            type: 'positive',
            position: 'top',
            message: 'Schedule time saved successfully',
        })    
    }
    else{
        Notify.create({
            type: 'negative',
            position: 'top',
            message: 'Error while saving schedule time',
        })    
    }
}

