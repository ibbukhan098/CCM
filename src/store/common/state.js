export default function () {
  return {
    licensFeeData:'',
    profileImage: "",
    role: [],
    accountName : "",
    closePopup:false,
    promptUser:false,
    usersTableData: {
      roleOptions: ["Viewer", "Admin", "Editor", "Billing"],
      columns: [
        { id: "0", name: "firstName", required: true, label: "Firstname", field: "firstName", align: "left" },
        { id: "0", name: "lastName", field: "lastName", required: true, label: "Lastname", align: "left" },
        { id: "1", name: "email", align: "left", label: "Email" },
        { id: "2", name: "role", label: "Role",align: "left" },
        { id: "3", name: "status", label: "Status",align: "center" },
        { id: "4", name: "delete", label: "Delete", align: "center" },
      ],
      rows: [],
    },
    userName:'',
    rolesTableData: {
      pages: [],
      pagesAccessible:[],
      status: false,
      columns: [
        { id: "0", name: "name", required: true, field:"name", label: "Name", align: "left", sortable: true, },
        { id: "1", name: "selectedPages", align: "left", label: "Pages Accessible"},
        { id: "2", name: "createdDate", label: "Created Date", align: "left",},
        { id: "3", name: "status", label: "Status", align:"center" },
        { id: "4", name: "deleted", label: "Delete", align: "center" },
      ],
      rows: [],
    },
    CustomerTableData : {
      columns: [
        // {id:"0", name: "invoiceNumber", required: true, label: "Invoice Number", field:"invoiceNumber", align: "center"},
        {id:"1", name: "name", required: true, label: "Plan", field:"name",align: "center"},
        {id:"2", name: "createdDate", required: true, label: "Date of Purchase",field:"createdDate", align: "center"},
        {id:"3", name: "paidThrough", required: true, label: "Paid Through",field:"paidThrough", align: "center"},
        {id:"4", name: "monthlyPrice", required: true, label: "Amount Paid", field:"monthlyPrice", align: "center"},
        {id:"5", name: "download", required: true, label: "Download", field:"download", align: "center"}
      ],

      rows: []
    },
    apiDetails: [
      { id: 0, title: "Get Products", apiname: "https://ccm.sellerscommerce.com/api/getproducts" },
      { id: 1, title: "Get Skus", apiname: "https://ccm.sellerscommerce.com/api/getskus" },
      { id: 2, title: "Get Product Details", apiname: "https://ccm.sellerscommerce.com/api/getproductDetails" },
      { id: 3, title: "Get Suppliers", apiname: "https://ccm.sellerscommerce.com/api/getsuppliers" },
      { id: 4, title: "Get Rows", apiname: "https://ccm.sellerscommerce.com/api/getrows" },
      { id: 5, title: "Get Files", apiname: "https://ccm.sellerscommerce.com/api/getfiles" },
    ],
    apiCredentials: {
      apiUsername: "",
      apiPassword: "",
    },
    columnFilter: {
      type: ["Starts with", "Contains", "Not Contains", "Ends with", "Equals", "Not Equals"]
    },
    FTPTime: ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM",
     "08:00 AM", "09:00 AM", "10:00 AM",
      "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
       "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM", "12:00 PM"],
    exportFileName:"",
    enableTime:false,
    timezone:[]
  }
}
