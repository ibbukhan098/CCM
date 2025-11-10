export default function () {
  return {
    shopName:"",
    shopKey:"",
    suppliername:"",
    configuration: {},
    suppliers: [],
    options:[],
    selectedSuppliers:[],
    defaultMapData:{
        "title": "Product_Name",
        "descriptionHtml": "Product_Description",
        "sku": "Supplier_SKU_ID",
        "price": "MSRP",
        "weight": "Weight",
        "categories": [
            "Category1_Name",
            "Category2_Name",
            "Category3_Name",
            "Category4_Name",
            "Category5_Name",
            "Category6_Name"
        ],
        "images": "Large_Image_Path"
    },
    shopifyProperties:[
      {
          "dataType": "string",
          "property": "title",
          "label": "Product Name*"
      },
      {
          "dataType": "string",
          "property": "descriptionHtml",
          "label": "Description"
      },
      {
          "dataType": "string",
          "property": "sku",
          "label": "Variant Code"
      },
      {
          "dataType": "string",
          "property": "price",
          "label": "Price"
      },
      {
          "dataType": "string",
          "property": "weight",
          "label": "Weight"
      },
      {
          "dataType": "array",
          "property": "categories",
          "label": "Collections"
      },
      {
          "dataType": "array",
          "property": "images",
          "label": "Images"
      }
  ],
  }
}
