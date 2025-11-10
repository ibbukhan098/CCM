export const storeSuppliers = (state, payload) => {
    state.suppliers = (payload)
}
export const storeOptions = (state, payload) => {
    state.options = (payload)
}
export const storeShopifyCredentials = (state, payload) => {
    payload = JSON.parse(payload.configuration)
    state.shopName = payload.shopname
    state.shopKey = payload.shopkey
}
export const setShopifyName = (state, payload) => {
    state.shopName = (payload)
}
export const setShopifyKey = (state, payload) => {
    state.shopKey = (payload)
}

export const storeSuppliername = (state, payload) => {
    state.suppliername = (payload)
}

export const storeSelectedSuppliers = (state, payload) => {
    state.selectedSuppliers = payload
}

// export const setname = (state, payload) => {
//     state.name = (payload)
// }