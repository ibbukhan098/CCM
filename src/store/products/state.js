export default function () {
  return {
    suppliersTableData: {
      downloadOptions: ["CSV", "EXCEL"],
      // columns: [
      //   { id: "0", name: "logo", label: "Logo", align: "center" },
      //   { id: "1", name: "name", label: "Supplier Name", field: "name",align: "left",sortable: true },
      //   { id: "2", name: "subscribedDate", label: "Subscribed Date", align: "left" },
      //   { id: "2", name: "publishedDate", label: "Published Date", align: "left" },
      //   { id: "3", name: "isInventoryAvailable", label: "Inventory", field: "isInventoryAvailable", sortable: true, align: "left" },
      //   { id: "4", name: "isDropshipAvailable", label: "Dropship", field: "isDropshipAvailable", sortable: true,align: "left" },
      //   { id: "5", name: "canDownload", label: "Download", field: "canDownload", align: "left" },
      //   {id:"6",name:"canUpload",label:"Upload To FTP",field:"canUpload",align:"left"}
      // ],
      // columns: [
      //   { id: "0", name: "logo", label: "Logo", align: "center" },
      //   { id: "1", name: "catalogName", label: "Supplier Name", field: "catalogName", align: "left",sortable: true},
      //   { id: "2", name: "productCount", label: "Number of Products",sortable:false, align: "center"},
      //   { id: "3", name: "subscribedDate", label: "Subscribed Date", sortable:false, align: "center" },
      //   //{ id: "4", name: "publishedDate", label: "Published Date", sortable:false, align: "center" },
      //   { id: "5", name: "enableInventory", label: "Inventory", field: "enableInventory", align: "center",sortable: true },
      //   { id: "6", name: "enableDropship", label: "Dropship", field: "enableDropship", align: "center",sortable: true }
      // ],
      columns: [
        { id: "0", name: "logo", label: "Logo", align: "center" },
        { id: "1", name: "catalogName", label: "Supplier Name", field: "catalogName",align: "left",sortable: true },
        { id: "3", name: "subscribedDate", label: "Subscribed Date",field: "subscribedDate", sortable:false, align: "center" },
        // { id: "2", name: "publishedDate", label: "Published Date", align: "left" },
        { id: "5", name: "enableInventory", label: "Inventory", field: "enableInventory", align: "center",sortable: true },
        { id: "6", name: "enableDropship", label: "Dropship", field: "enableDropship", align: "center",sortable: true },
        { id: "5", name: "canDownload", label: "Download", field: "canDownload", align: "center" },
        {id:"6",name:"canUpload",label:"Upload To FTP",field:"canUpload",align:"center"}
      ],
      rows:[],
    },
    historyTableData: {
      columns: [
        { id: "0", name: "supplierName", label: "Supplier Name", field: "supplierName", sortable: true, align: "left" },
        { id: "1", name: "fileName", label: "File Name", field: "fileName", sortable: true, align: "center" },
        { id: "2", name: "requestedDate", label: "Date", field: "requestedDate", sortable: true, align: "center" },
        // { id: "3", name: "rows", label: "Email", field: "email", sortable: true, align: "center" },
        { id: "4", name: "connectionType", label: "Connection", field: "connectionType", sortable: true, align: "center" },
      ],
      // rows: [
      //   {
      //     id: "0",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "1",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "2",
      //     supplier: "Cutieful",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 12,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "3",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "4",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "5",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "6",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "7",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "8",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      //   {
      //     id: "9",
      //     supplier: "Adar",
      //     filename: "amanda02122022",
      //     date: "01/01/2022",
      //     rows: 5,
      //     connection: "FTP",
      //   },
      // ],
      rows:[],
    },
    subscriptionCol: [
      {
        name: 'providerLogo',
        required: true,
        label: 'Logo',
        align: 'center',
        // field: row => row.providerLogo,
        // format: val => `${val}`,
      },
      { name: 'name', align: 'center', label: 'Catalog Details',  align: 'left', field: 'name', sortable: true },
      { name: 'updatesType', label: 'Updates', align: 'left' },
      { name: 'enableInventory', label: 'Inventory', align: 'left' },
      { name: 'enableDropship', label: 'Dropship', align: 'left'},
      { name: 'subscription', label: 'Subscribe', align: 'left',  field: 'subscription', sortable: true },
      { name: 'approvalType', label: 'Auto Approval', align: 'left' }
    ],
    subscriptionRow: [],
    industry: [
      { id: 1, name: "Uniforms" },
      { id: 2, name: "Promotional" },
      { id: 3, name: "Fasteners" },
      { id: 4, name: "DME" }
    ]
  }
}
