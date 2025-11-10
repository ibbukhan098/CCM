import { api, shopifyAPI, utilityAPI , stripeAPI} from 'boot/axios'
import { Notify } from "quasar";


export const createUserStateActions = ({ commit, state }, payload) => {
    let userTableData = state.usersTableData.rows
    let isAlreadyExist = (userTableData.filter(val => val.email == payload.email)).length
    if (isAlreadyExist > 0) {
        return "exist"
    }
    payload['id'] = userTableData.length - 1;
    payload['status'] = true;
    commit('createUserState', payload)
}

export const closePopup = ({commit},payload) => {
    commit('closePopup',payload)
}

export const closePrompt = ({commit},payload) => {
    commit('closePrompt',payload)
}

export const updateUserStateActions = ({ commit }, payload) => {
    commit('updateUserState', payload)
}

export const deleteUserStateActions = ({ commit }, id) => {
    commit('deleteUserState', id)
}

export const deleteRoleStateActions = ({ commit }, id) => {
    commit('deleteRoleState', id)
}

export const addRole = async ({ commit,dispatch }, payload) => {
    try {
        const roles = await api.post('/user/save', payload)
        if (roles.status == 'Success') {
            commit('addRoles', payload);
            dispatch('getRoles')
            return roles
        }
    } catch (error) {
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while adding the role",
        });
    }
}

export const getRole = async ({commit, state}, payload) => {
    try {
        const roles = await api.get('user/get');
        let role = roles.filter(element => (
            element.id === parseInt(payload)
       ))
       commit('storeRole', role)
       return role
    } catch (error) {
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while getting the roles",
        });
    }

} 

export const getFtpConfigDetails = async ({commit}, payload)=>{

        try {
            const config = await api.get('config/get')
            commit('addFTP', config);
            return config;
        } catch (error) {
           console.log(error)
        }
    }

export const addFTP = async ({ commit, state }, payload) => {
    try {
        const ftp = await api.post('config/ftp', payload)
        if (ftp) {
            Notify.create({
                type: "positive",
                position: "top",
                message: "FTP configuration successful",
            });
        }
        else {
            Notify.create({
                type: "warning",
                position: "top",
                message: "Could not update FTP details",
            });
        }
    } catch (error) {
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while saving the FTP details",
        });
    }
    // .then(res => {
    //     Notify.create({
    //         color: "positive",
    //         position: "top",
    //         message: "Updated Successfully",
    //     });
    // })
    //     .catch((err) => {
    //         Notify.create({
    //             type: "negative" ,
    //             position: "top",
    //             message: "Error When Update The User",

    //         });
    //     })
}

export const testFTP = async ({commit}, payload) => {
    const ftp = await utilityAPI.post('ftpTest', payload);
    return ftp
}

export const getConfigDetails = async ({commit}, payload)=>{
    try {
        const config = await api.get('config/get')
        commit('addExportData', config);
        return config;
    } catch (error) {
       console.log(error)
    }
}

export const addExportData = ({ commit, state }, payload) => {
    api.post('config/export', payload).then(res => {
        Notify.create({
            type: "positive",
            position: "top",
            message: "Filename saved successfully",
        });
    })
        .catch((err) => {
            Notify.create({
                type: "negative" ,
                position: "top",
                message: "Error while adding the name",
            });
        })
}


export const getUser = async ({ commit, state, dispatch }, payload) => {
    try {
        let users = await api.get('user/get-user')
        let user = users.filter(element => (
             element.id === parseInt(payload)
        ))
        users=users.filter(val => val.deleted == false)
        // dispatch('getRoles')
        commit('storeUsers', users);
        return user
    } catch (error) {
        // Notify.create({
        //     type: "negative" ,
        //     position: "top",
        //     message: "Error while getting the user",
        // });
    }
}

export const getUsers = async ({ commit, state, dispatch }, payload) => {
    try {
        let users = await api.get('user/get-user')
        const accountUserId = users.filter(val=>parseInt(val.id) == parseInt(localStorage.getItem('userId')))
        let userObject = accountUserId[0]
      let user = users.filter(element => (
            element.id != userObject.id
        ))
        user=user.filter(val => val.deleted == false)
        dispatch('getRoles')
        commit('storeUsers', user);
        commit('setAccountName', userObject)
        return user
    } catch (error) {
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while getting the user",
        });
    }
}


export const updatePassword = async ({ commit }, payload) => {
    try {
        try {
            const changePassword = await api.post('user/change-password', payload);
            if(changePassword){
                Notify.create({
                    type: "positive" ,
                    position: "top",
                    message: "Successfully changed the password",
                });
            }
            return changePassword
        } catch (error) {
            Notify.create({
                type: "negative" ,
                position: "top",
                message: "Error while getting the roles",
            });
        }
    } catch (error) {

    }
}

export const getRoles = async ({ commit, state, dispatch }, payload) => {
    try {
        const roles = await api.get('user/get');
        dispatch('bindRoles', roles)
        commit('storeRoles', roles);
        return roles
    } catch (error) {
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while getting the roles",
        });
    }
}

export const bindRoles = async ({ commit, state }, payload) => {
       let users = state.usersTableData.rows
       users.forEach(element => {
            let role = payload.filter(val => val.id == element.roleId)
            element.roleName = role.length > 0 ? role[0].name : ''
        });
        commit('storeUsers', users);
}


export const updateUser = async ({ commit, state, dispatch }, payload) => {
    try {
        const updatedUser = await api.post('user/save-user', payload)
        if(updatedUser != undefined){
            payload.id == 0 ? commit('createUserState', updatedUser) : commit('updateUser', updatedUser)
            dispatch('bindRoles', state.rolesTableData.rows)
            dispatch('getUsers')
            Notify.create({
                type: "positive",
                position: "top",
                message: "User updated successfully",
            });
            return updatedUser
        } else {
            Notify.create({
                type: "negative",
                position: "top",
                message: "Error while updating the user",
            });
        }
    } catch (error) {
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while update the user",
        });
    }
}

export const createUser = async ({ commit, state, dispatch }, payload) => {
    try {
        const updatedUser = await api.post('user/save-user', payload)
        if(updatedUser != undefined){
            payload.id == 0 ? commit('createUserState', updatedUser) : commit('updateUser', updatedUser)
            dispatch('bindRoles', state.rolesTableData.rows)
            dispatch('getUsers')
            Notify.create({
                type: "positive",
                position: "top",
                message: "User created successfully",
            });
            return updatedUser
        } else {
            Notify.create({
                type: "negative",
                position: "top",
                message: "Error while creating the user",
            });
        }
    } catch (error) {
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while creating the user",
        });
    }
}



export const deleteUser = async ({ commit, state, dispatch }, payload) => {
    try {
        const updatedUser = await api.post('user/save-user', payload)
        if(updatedUser!= undefined){
            payload.id == 0 ? commit('createUserState', updatedUser) : commit('updateUser', updatedUser)
            dispatch('bindRoles', state.rolesTableData.rows)
            dispatch('getUsers')
            Notify.create({
                type: "positive",
                position: "top",
                message: "User deleted successfully",
            });
        }

    } catch (error) {
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while update the user",
        });
    }
}

export const updateRole = async ({ commit}, payload) => {
    try {
        const updatedRole = await api.post('user/save', payload)
        commit('updateRole', payload);
        return updatedRole
    } catch (error) {
        console.log(error)
        Notify.create({
            type: "negative" ,
            position: "top",
            message: "Error while updating the role",
        });
    }
}


export const getPages = async ({ commit, state }, payload) => {
    let pages = await api.get('user/get/false')
        commit('storePages', pages);
        return pages
}

export const getAPIDetails = async ({ commit, state }, payload) => {
   const getapi = await api.get('apiuser/insert')
   commit('APICredentials', getapi);
   return true
}


export const getcustomerallDetails = async ({ state,commit })=>{
    try {
        const customer = await api.get('customer/alldetails')
        commit("setCustomerDetails", [customer])
        return customer
    } catch (error) {
        Notify.create({
            type: 'negative',
            position: 'top',
            message: 'Unable to get the customer details',
          })
    }
}

export const getaddress = async ({ state })=>{
    try {
        const customer = await api.get('customer/get-address')
        return customer
    } catch (error) {
        Notify.create({
            type: 'negative',
            position: 'top',
            message: 'Unable to get the address details',
          })
    }

}

export const getSubscription = async ({state}, payload) => {
    try {
        let getSubData = await api.get("payment/get-subscription?programID="+payload.programID+"&accountID="+payload.accountID+"")
        return getSubData;
    } catch (error) {
        return error.message;
    }
}

export const getInvoiceAndPaymentDetails = async({state, commit}, payload) => {
    try {
        const paymentDetails = await stripeAPI.post('invoices-and-payments', payload)
        return paymentDetails
    } catch (error) {
        // Notify.create({
        //     type: 'negative',
        //     position: 'top',
        //     message: 'Unable to get invoice details'
        // })
    }
    // commit("setInvoice",paymentDetails)

}

export const getTimeZone = async({commit}) => {
    try {
        const Timezone = await wooCommerceAPI.get('/getAllTimezones')
        commit("storeTimezone", Timezone.response)
        return Timezone
    } catch (error) {
        Notify.create({
            type: 'negative',
            position: 'top',
            message: 'Unable to get timezone details'
        })
    }
}

export const uploadProfileImage = async ({commit}, payload) => {
    const formData = new FormData();
    formData.append('image', payload,payload.name)
    const filePath = "userProfile/"
    const pathObject = {
        filePath,
        dir:'lsp',
        accountId : localStorage.getItem('accountId')
    }
    const uploadProfileImageResult = await utilityAPI.post('uploadProfileImage', formData, {params: pathObject})
    if(uploadProfileImageResult.status === 200){
        return uploadProfileImageResult
    }
}

export const saveProfileUrl =  async({commit}, payload) => {
    commit('updateLayoutProfile', payload)
}

export const downloadPDF = ({commit}, payload) => {
    commit('savePdf', payload)
}