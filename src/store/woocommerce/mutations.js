
export const storeProductJSON = (state, data) => {
    state.productJSON = data.response
}


export const storeMapData = (state, data) => {
    state.mapData = data     
  }

export const storeAllCategories = (state, data) => {
    state.allCatagories = data
  }

export const storeInsertedCategories = (state, data) => {
    state.insertedCategories = data
}

export const storeAllAttributes = (state, data) => {
    state.allAttributes = data
}

export const storeInsertedattributes = (state, data) => {
    state.insertedAttributes = data
}
  

export const storeWoocommerceCredentials = (state, payload) => {
    if(payload.message!=="No Configuration exists for this Account"){
    payload = JSON.parse(payload.configuration)
    state.shopUrl = payload.storeURL
    state.shopSecret = payload.consumerSecret
    state.shopKey = payload.consumerKey
}
}
  