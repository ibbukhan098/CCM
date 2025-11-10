<template>
  <div class="q-pa-md q-gutter-y-md background-color">
    <overview></overview>
    <catalogs></catalogs>

    
    <div class="mobile_message" v-if="!mobileClose">
      <p>This tool is best viewed on desktop screens. Please switch to desktop to take advantage of CatalogManager.</p> 
    <button @click = "mobileClose=!mobileClose">Close</button></div>
  </div>
</template>
<script>
import { ref, computed, onBeforeMount } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useStore } from "vuex";
  
export default {
  setup(){
    let $store = useStore();
     const router = useRouter();
    let $accountId;
    let $userId;
    let $userType;  
    let mobileClose = ref(false); 
    onBeforeMount(() => {
       let token=$store.getters['auth/getToken'];
       if(token == 'null'){
        router.push('/login')
        return  
      }
    let base64Url=token.split('.')[1];  
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var tokenData=JSON.parse(jsonPayload);
    var AccountId=tokenData.AccountID;
    let user_Id=tokenData.UserID
    let user_Type = tokenData.UserType 
    let Role_Id = tokenData.RoleID
    localStorage.setItem('roleId', Role_Id)
    localStorage.setItem('accountId' , AccountId);
    localStorage.setItem('userId', user_Id)
    localStorage.setItem('userType', user_Type)
    })
    return{
      mobileClose
    }
  },

  components: {
    overview: require("src/components/features/home/overview/overview.vue")
      .default,
    catalogs: require("src/components/features/home/catalogs/catalogs.vue")
      .default,
  },
};
</script>

<style lang="scss" scoped>
.overview-num {
  font-weight: bolder;
  font-size: 20px;
}
.overview-text {
  font-size: 14px;
}
.mobile_message{
  display: none;
}
@media(max-width:767px){
 
.mobile_message {
    background: #5a68c2;
    position: fixed;
    top: 10%;
    z-index: 9999;
    left: 0;
    color: #fff;
    padding: 10px;
    font-weight: 500;
    text-align: center;
    display:block;
    p{

      margin-bottom:0;
    }
    button{
      margin-top: 10px;
    }
}

}

</style>