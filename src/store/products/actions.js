/*
export function someAction (context) {
}
*/
import { api, imageURL, utilityAPI ,catalogAPI} from 'boot/axios'
import { exportFile, Loading } from 'quasar'
import { Notify, date } from 'quasar'

export const subscribeData = async ({ commit ,dispatch}, payload) => {
    try {
        let isSubscribed = await api.post('catalog/subscribe', payload);
        dispatch('getAllSuppliers')
        return isSubscribed
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while subscribing to the catalog',
        })
    }
}

export const subscribePartial = async ({ commit ,dispatch}, payload) => {
    try {
        let subscribed = await catalogAPI.post('storeCatalogMap', payload);
        Loading.hide()
        return subscribed
        
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while subscribing to the catalog',
        })
    }
}


export const getSubscribedSuppliers = async ({ commit, state }) => {
    try {
        // let isSubscribed = await api.get('catalog/getsubscribed/?$orderby=name asc');
        const isSubscribed = await catalogAPI.post('getCatalogs', {
            AccountID : parseInt(localStorage.getItem('accountId'))
        })            
        return isSubscribed.data
    } catch (error) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Error while getting the data',
        })
    }

    return new Promise((resolve, reject) => {
        api.get('catalog/getsubscribed/?$orderby=name asc')
            .then((response) => {
                // resolve(response)
                commit('storeSubSuppliers', response);
            })
            .catch((err) => {
                resolve(err.response)
            })
    })
}



export const getAllSuppliers = async ({ commit, state }) => {
    try {
        const getAllSuppliers = await api.get('catalog/getall/')
        commit('storeAllSuppliers', getAllSuppliers);
        return getAllSuppliers
    } catch (error) {
        Notify.create({
            type: 'negative',
            position: 'top',
            message: 'Error when getting the Suppliers',
        })
        return "error"

    }

}

// export const getHistory = async ({ commit, state }) => {
//     let arr=[]
//       const response = await api.get('catalog/downloadhistory')
//       response.forEach(element => {
//          if(element.fileName!=="Failed"){
//             arr.push(element)
//          }
//       });
//       commit('storeHistory', arr);
//       return arr;
// }

export const getHistoryNode = async ({ commit, state }) => {
    let arr=[]
    let accountId = parseInt(localStorage.getItem('accountId'))
      const response = await catalogAPI.post('getHistory', { accountId })      
      commit('storeHistory', response.data);
      return arr;
}


export const downloadSampleFile= async ({ commit,state }, payload)=>{
    let link = document.createElement('a');
    link.href = "https://ccmweb.blob.core.windows.net/ccm/ccm-common/Catalog%20Manager%20Sample%20File.xlsx"
    link.setAttribute('download', 'Catalog Manager Sample File.xlsx');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const uploadFile= async ({ commit,state }, payload)=>{
    Notify.create({
        type: 'positive',
        position: 'top',
        message: 'Your FTP upload will begin shortly',
    })
    let AccountID = localStorage.getItem('accountId')
    let data = {
        "cID" : payload.catalogID,
        "accountId": AccountID,
        "supplierName": payload.supplierName,
        "fileName": payload.fileName
    };
    let filename = payload?.fileName 
         
    var found = [],          // an array to collect the strings that are found
       rxp = /{([^}]+)}/g,
       str = filename ?? payload.supplierName,
       curMatch;

   while( curMatch = rxp.exec( str ) ) {
       found.push(curMatch[1]);
   }
   
   found.forEach(val => {
       let text
       let timeStamp = Date.now()
       if(val == 'supplier_name'){
           text = payload.supplierName
       }
       else if(val == 'date_time'){
           text = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss')                 
       }
       else{
           text = date.formatDate(timeStamp, 'YYYY-MM-DD')
       }
       val = '{'+val+'}'
       filename = filename.replace(val, text)            
   });
    let data1 = {
        "cID" : payload.catalogID,
        "accountId": AccountID,
        "supplierName": payload.supplierName,
        "fileName": filename
    };
    const upload = await utilityAPI.post("/uploadFileToFTPandSFTP", data1)
    if(upload.message == "Success"){
      Notify.create({
        type: 'positive',
        position: 'top',
        message: 'File Uploaded Successfully',
    })
    return 'Success'
    }
    else{
        Notify.create({
            type: 'negative',
            position: 'top',
            message: 'Error while uploading the file',
        })
        return 'Fail'
    }
}

export const getCategories=async({state},payload)=>{
    try{
        let catalog={
            CatalogID:payload,
            AccountID : parseInt(localStorage.getItem("accountId"))
        }
        const response=await catalogAPI.post('getCatagories',catalog)
        const getCatalogs=response
        return getCatalogs
    } catch (error){

    }
}

export const getProducts=async({state},payload)=>{
    try{
        const response =  await catalogAPI.post('getProducts',payload)
        const getProducts=response
        return getProducts
    } catch (error) {

    }
}

export const getOptions=async({state},payload)=>{
    try{
        const response=await catalogAPI.post('getSplitOptions',payload)
        const getOptions=response
        return getOptions
    } catch (error) {

    }
}
 
export const getCatalogMap=async({state},payload)=>{
    try {
        const response=await catalogAPI.post('getCatalogMap',payload)
        const getMappedProducts=response
        return getMappedProducts
    } catch(error){
        
    }
} 

export const checkCatalogId = async({commit},payload)=> {
    try {
     let result = await catalogAPI.post('checkCatalogPresent', payload)
     return result
    }catch(err) {

    }
}
export const downloadFileTest = async ({ commit, state, dispatch }, payload) => {
    try {
        let object = {
            CatalogID : payload.catalogData.catalogID,
            AccountID : parseInt(localStorage.getItem('accountId')),
            FileType : payload?.catalogData?.fileType,
            FileName : payload?.catalogData?.fileName,
            CatalogName : payload?.row?.catalogName
        }

         let filename = payload?.catalogData?.fileName 
         
         var found = [],          // an array to collect the strings that are found
            rxp = /{([^}]+)}/g,
            str = filename ?? object.CatalogName,
            curMatch;

        while( curMatch = rxp.exec( str ) ) {
            found.push(curMatch[1]);
        }
        
        found.forEach(val => {
            let text
            let timeStamp = Date.now()
            if(val == 'supplier_name'){
                text = object.CatalogName
            }
            else if(val == 'date_time'){
                text = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss')                 
            }
            else{
                text = date.formatDate(timeStamp, 'YYYY-MM-DD')
            }
            val = '{'+val+'}'
            filename = filename.replace(val, text)            
        });

        const blob = await catalogAPI.post('getCatalogDownload', object,
        {
            responseType: 'arraybuffer'
        })
        
        payload?.catalogData?.fileType == 1 ? exportFile(filename+'.csv', blob)  : exportFile(filename+'.xlsx', blob) 
        let data = {
            catalogId : payload?.catalogData.catalogID,
            accountId : localStorage.getItem('accountId'),
            fileName : payload?.catalogData?.fileType == 1 ? filename+'.csv' : filename+'.xlsx',
            supplierName : payload?.row.catalogName,
            connectionType : "download"
       }
        dispatch('saveDownloadHistory', data)

        Loading.hide()      
    } catch (error) {
        
    }
}

export const saveDownloadHistory = async ({ commit ,dispatch}, payload) => {
    try {
        const response=await catalogAPI.post('storeHistory',payload)        
    } catch(error){
        
    }
}

export const downloadFile = ({ commit, state }, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blob = await api.get('download/catalog?catalogID=' + payload?.catalogData?.catalogID + '&fileType=' + payload?.catalogData?.fileType, 
            {
               responseType: 'arraybuffer'
            });
            const status = exportFile(blob.fileName, blob.data)
            if (status) {
                Loading.hide()
                Notify.create({
                    type: 'positive',
                    position: 'top',
                    message: 'File downloaded successfully',
                })
            }
            else {
                Notify.create({
                    color: 'negative',
                    position: 'top',
                    message: 'Error while downloading '+payload?.row?.name+' catalog',
                })
            }
        }
        catch(err){
            Loading.hide()
            Notify.create({
                type: 'negative',
                position: 'top',
                message: 'Error while downloading '+payload?.row?.name+' catalog',
            })
        }

    })
}

// export const downloadFile = async ({ commit }, payload) => {
//     try {
//         const blob = await api.get('download/catalog?catalogID=' + payload.catalogID + '&fileType=' + payload.fileType)
//         let time = (payload.enableTime) ? time = (new Date()).toISOString() : time = '' ;
//         const status = exportFile(payload.fileName + time + '.' + payload.download, blob)
//         if (status) {
//             Notify.create({
//                 type: 'positive',
//                 position: 'top',
//                 message: 'Successfully Downloaded File',
//             })
//         }
//         else {
//             Notify.create({
//                 color: 'negative',
//                 position: 'top',
//                 message: 'Error When Downloading File',
//             })
//         }
//     } catch (error) {
//         Notify.create({
//             color: 'negative',
//             position: 'top',
//             message: 'Error When Downloading File',
//         })
//     }
// }
