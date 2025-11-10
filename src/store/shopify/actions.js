import { api, shopifyAPI } from 'boot/axios'
import { Notify,exportFile,QSpinnerGears, Loading } from 'quasar'
import { cloneDeep, findIndex, uniqWith, isEqual, compact, differenceBy, spread, union } from 'lodash'

export const getAnalytics=async({commit,state})=>{
try{
    const response=await shopifyAPI.get('getAnalytics')
    return response
} catch (error) {
    console.log(error)
}
}
export const getShopifyCredentials = async ({ commit, state }) => {
    let data = {
        accountId: localStorage.getItem("accountId"),
    }
    try {
        const shopifyCreds = await shopifyAPI.post('getShopifyCredentials', data)
        if(shopifyCreds?.message!=="No Configuration exists for this Account"){
          commit('storeShopifyCredentials', shopifyCreds);
        }
        return shopifyCreds
    } catch (error) {
        console.log(error.response)
    }
}


export const getProductData = async ({ commit }, payload) => {

}

export const getProgressStatus = async ({ commit,dispatch }, payload) => {
    try {
        const checkProgress = await shopifyAPI.post('getBulkStatus', payload)
        return checkProgress
    } catch (error) {
        console.log(error.response)
    }
}


export const storeUpdatedMapData = async ({ commit, getters, dispatch, state }, payload) => {
    let productUpdate=payload.selectedFields;
    let productCols = cloneDeep(getters.getShopifyFields)
    let mappedCols = payload.propertyValues;
    let productData = {}
    productCols.forEach((cols, index) => {
        if (!mappedCols[index]) {
            return
        }
        if(productUpdate[index]){
            cols.value = mappedCols[index]
            productData[cols.property] = cols.value
        }
    });
    let productMap = {
        accountId: localStorage.getItem("accountId"),
        supplierId: state.selectedSuppliers,
        mappedData: productData
    }

    Notify.create({
        type: 'positive',
        position: 'top',
        message: 'Job scheduled successfully',
    })
    const jobCreate = await shopifyAPI.post('bulkUpdate', productMap)

    // if (jobCreate.type == "success") {
    //     Notify.create({
    //         type: 'positive',
    //         position: 'top',
    //         message: 'Job Scheduled Successfully',
    //     })

    // }
    // else {
    //     Notify.create({
    //         color: 'negative',
    //         position: 'top',
    //         message: 'Issue While Scheduling The Job',
    //     })
    // }
}

export const syncNow = async ({ commit }, payload) => {
    // const syncProduct = await shopifyAPI.post('bulkCreate', payload)
    Notify.create({
            type: 'positive',
            position: 'top',
            message: 'Sync started',
    })
}

export const schedule = async ({ commit }, payload) => {
    // const syncProduct = await shopifyAPI.post('bulkCreate', payload)
    Notify.create({
            type: 'positive',
            position: 'top',
            message: 'Job scheduled successfully.',
    })
}

export const storeMapData = async ({ commit, getters, dispatch, state }, payload) => {
    let productUpdate=payload.selectedFields;
    let productCols = cloneDeep(getters.getShopifyFields)
    let mappedCols = payload.propertyValues;
    let productData = {}
    productCols.forEach((cols, index) => {
        if (!mappedCols[index]) {
            return
        }
        if(productUpdate[index]){
            cols.value = mappedCols[index]
            productData[cols.property] = cols.value
        }
    });
    let productMap = {
        accountId: localStorage.getItem("accountId"),
        supplierId: state.selectedSuppliers,
        mappedData: productData
    }

    Notify.create({
        type: 'positive',
        position: 'top',
        message: 'Job scheduled successfully',
    })
    const jobCreate = await shopifyAPI.post('bulkCreate', productMap)
    // if (jobCreate.Message == "Success") {
    //     Notify.create({
    //         type: 'positive',
    //         position: 'top',
    //         message: 'Job Scheduled Successfully.',
    //     })

    // }
    // else {
    //     Notify.create({
    //         color: 'negative',
    //         position: 'top',
    //         message: 'Issue While Scheduling The Job',
    //     })
    // }
}

export const validateAPICredentials = async ({ commit }, shopDetails) => {
    let shopname = shopDetails.shopName;
    let shopkey = shopDetails.shopKey;
    let data = {
        "shopType": "SHOPIFY",
        "accountId": localStorage.getItem("accountId"),
        "configuration": {
            "shopname": shopname,
            "shopkey": shopkey
        }
    }
    const products = await shopifyAPI.post('validateStore', data)
    if (products.statusCode == 404) {
        Notify.create({
            color: 'negative',
            position: 'top',
            message: 'Invalid shopify credentials.',
        })
        return false
    }
    Notify.create({
        type: 'positive',
        position: 'top',
        message: 'Successfully saved shopify credentials.',
    })
    return true
}


export const storeSelectedSuppliers = ({ commit, state }, payload) => {
    commit('storeSelectedSuppliers', payload)
    return true
}


export const getSuppliersList = ({ commit, state }) => {
    return new Promise((resolve, reject) => {
        api.get('catalog/getsubscribed')
            .then((response) => {
                commit('storeSuppliers', response);
            })
            .catch((err) => {
                reject(err.response)
            })
    })
}

export const getOptions = ({ commit, state }) => {
    let suppliers = state.suppliers
    let options = []
    suppliers.forEach(element => {
        let name = element.name
        options.push(name)
    });
    commit('storeOptions', options);
}

export const setShopifyName = ({ commit, state }, payload) => {
    commit('setShopifyName', payload);
}

export const setShopifyKey = ({ commit, state }, payload) => {
    commit('setShopifyKey', payload);
}

export const saveMap = ({ commit, state }, payload) => {
    const savedData = shopifyAPI.post('storeSchedule', payload)
    commit('setShopifyKey', payload);
}

export const getCatalogDetails = async ({ commit, state }) => {
    try {
        const subscribedData = await api.get('catalog/getsubscribed')
        let filteredData = []
        subscribedData.forEach(el => {
            filteredData.push({
                label: el.name,
                value: `supplier_${el.name}`
            })
        })
        // let data = subscribedData.map(subscribedData => (subscribedData.name))
        commit('storeSuppliername', filteredData);
        return filteredData
    } catch (error) {
        console.log(error)
        // Notify.create({
        //     type: 'negative',
        //     position: 'top',
        //     message: 'Unable To Get The Subscribed Catalog Details',
        // })
    }
}

export const saveAll = async ({ commit,dispatch }, payload) => {
        if(payload.length == 1){
            const saveAll = await shopifyAPI.post('storeSchedule', payload)
            if(saveAll){
                Notify.create({
                    type: 'positive',
                    position: 'top',
                    message: 'Your catalog will schedule soon'
                })
                 return await dispatch('getProgressStatus', { supplierId :  payload[0].supplierId})
            }
        }
        else{
            const saveAll = shopifyAPI.post('storeSchedule', payload)
        }

}

export const getMapData = async ({ commit }, payload) => {
    let data = {
        accountId : localStorage.getItem('accountId')
    }
    const mapData = await shopifyAPI.post('getMapData', data)
    if(mapData){
        return mapData.data
    }
    else{
        return []
    }
}


export const getScheduleStatus = async ({ commit }, payload) => {
    let account = {  accountId : localStorage.getItem('accountId')}
    const mapData = await shopifyAPI.post('getBulkStatus', account)
    return mapData
}

export const storeScheduleTime = async ({ commit }, payload) => {
    const mapData = await shopifyAPI.post('storeScheduleTime', payload)
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
    // return mapData
}


export const download = async ({ commit }, payload) => {
    let { catalogId, catalogName } = payload
    let data = {
        supplierId: catalogId,
    }
    let downloadCatlog
    try {
        downloadCatlog = await shopifyAPI.post('csvExport', data);
        const status1 = exportFile(`SC_SHOPIFY_COLLECTIONS_${catalogName}.csv`, downloadCatlog.response.csvcollection)
        const status2 = exportFile(`SC_SHOPIFY_${catalogName}.csv`, downloadCatlog.response.csvdata)
        if (status1 && status2) {
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
                message: 'Error while downloading the file',
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}



