import { api, catalogAPI } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { cloneDeep } from 'lodash'

export const getOverviewDetails = async ({ state })=>{
    try {
        // const overview = await api.get('catalog/getdashboardoverviewdetails/')
        const overview = await catalogAPI.post('getOverview', 
        {
            AccountID : parseInt(LocalStorage.getItem('accountId'))
        })
        return overview.data
    } catch (error) {
        console.log(error)
    }
        
}


export const getCatalogDetails = async({commit, state})=>{
    // return new Promise((resolve, reject) => {
        
    //     api.get('catalog/getsubscribed')
    //     .then((response) => {
            
    //         // resolve(response)
    //         commit('storeCatalogs', response);
    //     })
    //     .catch((err) => {
    //         reject(err.response)
    //     })
    // })
        try {
            // const subscribedData = await api.get('catalog/getsubscribed/?$orderby=name asc')           
            const subscribedData = await catalogAPI.post('getCatalogs', {
                AccountID : parseInt(localStorage.getItem('accountId'))
            })           
            commit('storeCatalogs', subscribedData.data);   
            return subscribedData.data       
        } catch (error) {
            console.log(error)
            // Notify.create({
            //     type: 'negative',
            //     position: 'top',
            //     message: 'Unable to get the subscribed catalog details',
            // })
        }    
}


export const sendData=({state,commit}, payload)=>{
    
    const {input,label,option}=payload
    let data
    let rowData = cloneDeep(state.catalogsTableData.rows)
   switch(option){
       case "Contains":
           data= rowData.filter(each=>{
           if(label == 'productCount'){
               return (each[label].toString()).includes(input)
           }            
           else{
          
            let date = new Date(each[label].toString());
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();

            if (dt < 10) {
            dt = '0' + dt;
            }
            if (month < 10) {
            month = '0' + month;
            }

            let d=(month+'-' + dt + '-'+year);
            return d==input

           }
       })
            break
        case "Starts With":              
            data= rowData.filter(each=>{
                if(label == 'productCount'){
                    return (each[label].toString()).includes(input)
                }    
                return (each[label].toLowerCase()).includes(input.toLowerCase())
        })
            break
        case "Ends With":
            data= rowData.filter(each=>{
                if(label == 'productCount'){
                    return (each[label].toString()).includes(input)
                }    
                return (each[label].toLowerCase()).includes(input.toLowerCase())
           
        })
            break
          
   }

   commit("changeData",data)

}

export const sendData1=({state,commit}, payload)=>{

    const {input,label,option}=payload
    let data
    let rowData = cloneDeep(state.catalogsTableData.rows)
   switch(option){
            case "Between":
            data= rowData.filter(each=>{
                if(label == 'productCount'){
                    return (each[label]>=input[0] && each[label]<=input[1])
                }
                else{
                    const start = new Date(input[0]).toISOString();
                    const end = new Date(input[1]).toISOString();
                    return each[label]>=start && each[label]<=end

                }    
           
        })
            break
   }
 
   commit("changeData",data)

}