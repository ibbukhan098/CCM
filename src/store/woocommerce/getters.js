export const getProduct = state => state.productJSON;

export const getCSVCols = state => state.csvCols

export const getCatalogDetails = state => {
    // let val = groupBy(state.productData, val=> val.Product_Code)
    return state.productData
}

export const defaultMapData = state => state.defaultMapData;

export const getPropertyFields = state => state.propertyFields;

export const getWoocommerceKey = state => state.shopKey;
export const getWoocommerceSecret = state => state.shopSecret;
export const getWoocommerceUrl = state => state.shopUrl;