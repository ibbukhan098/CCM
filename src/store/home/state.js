export default function () {
  return {
    catalogsTableData: {
      // columns: [
      //   { id: "0", name: "logo", label: "Logo", align: "center" },
      //   { id: "1", name: "name", label: "Supplier Name", field: "name", align: "left",sortable: true},
      //   { id: "2", name: "productCount", label: "Number of Products",sortable:false, align: "center"},
      //   { id: "3", name: "subscribedDate", label: "Subscribed Date", sortable:false, align: "center" },
      //   { id: "4", name: "publishedDate", label: "Published Date", sortable:false, align: "center" },
      //   { id: "5", name: "enableInventory", label: "Inventory", field: "enableInventory", align: "center",sortable: true },
      //   { id: "6", name: "enableDropship", label: "Dropship", field: "enableDropship", align: "center",sortable: true }
      // ],
      columns: [
        { id: "0", name: "logo", label: "Logo", align: "center" },
        { id: "1", name: "catalogName", label: "Supplier Name", field: "catalogName", align: "left",sortable: true},
        { id: "2", name: "productCount", label: "Number of Products",sortable:false, align: "center"},
        { id: "3", name: "subscribedDate", label: "Subscribed Date", sortable:false, align: "center" },
        //{ id: "4", name: "publishedDate", label: "Published Date", sortable:false, align: "center" },
        { id: "5", name: "enableInventory", label: "Inventory", field: "enableInventory", align: "center",sortable: true },
        { id: "6", name: "enableDropship", label: "Dropship", field: "enableDropship", align: "center",sortable: true }
      ],
      rows: []
    },
  }
}
