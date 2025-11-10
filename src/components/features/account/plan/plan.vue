<template>
<div class="  q-gutter-md card">
     <div class="text-h6 q-mb-md text1">Billing</div>
           <div class=" plan">
             <div class=" text-h6 text1" style="padding-top: 12px; padding-bottom:12px" >
            Plan Details 
             </div>
            <div class="col text-caption text1">
         <q-item-label class="text-caption text">  {{plan}} </q-item-label>
           <q-item-label class="text-caption text">${{monthlyPrice}}/month</q-item-label>
            <q-btn
           label="Upgrade Current Plan"
           color="primary"
           class="q-mb-md q-mt-md"
           @click="popup = true"
         >
         <q-dialog v-model="popup">
          <select-plans-dialog/>
        </q-dialog>  
           </q-btn>
           </div>
       
         
          <q-separator/>
          <div class="row text-h6 q-mb-md text1" style="padding-top: 16px; padding-bottom:14px">
            Company Details 
            <div class="pop-up">             
            </div>
          </div>
            <div class="row flex-space-between">
              <q-item-label class="text-caption text">
                Company Name </q-item-label>
                <q-item-label class="text-caption text">
                    {{customerallDetails.companyName}} </q-item-label>
                  </div>
                   <div class="row flex-space-between">
              <q-item-label class="text-caption text">
                Notification E-mail </q-item-label>
                <q-item-label class="text-caption text">
                    {{customerallDetails.email}} </q-item-label>
                  </div>
                   <div class="row flex-space-between">
              <q-item-label class="text-caption text">
                Country </q-item-label>
                <q-item-label class="text-caption text" >
                  {{Address.countryName}} </q-item-label>
                  </div>
                   <div class="row flex-space-between">
              <q-item-label class="text-caption text">
                Address </q-item-label>
                <q-item-label class="text-caption text">
                  {{Address.addressName}} </q-item-label>
                  </div>
                   <div class="row flex-space-between">
              <q-item-label class="text-caption text">
                City </q-item-label>
                <q-item-label class="text-caption text">
                  {{Address.city}} </q-item-label>
                  </div>
                   <div class="row flex-space-between">
              <q-item-label class="text-caption text">
                State </q-item-label>
                <q-item-label class="text-caption text">
                  {{Address.stateName}} </q-item-label>
                  </div>
                  <div class="row flex-space-between q-pb-md">
              <q-item-label class="text-caption text">
                Zip Code </q-item-label>
                <q-item-label class="text-caption text" >
                  {{Address.zipCode}} </q-item-label>
                  </div>
              </div>
           </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'


export default {  

//   components: {
//     users: require("src/components/features/profile/users/users.vue").default,
//   },
  setup() {
      const $store = useStore()
      const $q = useQuasar()
      const customerallDetails = ref({})
      const plan=ref('')
      const monthlyPrice = ref('')
      const Address = ref({})
      const showSkeleton = ref(true)
       
      onBeforeMount(() => {
        $store.dispatch('common/getcustomerallDetails')
        .then(response=>{
          (customerallDetails.value) = response;
            plan.value=(customerallDetails.value)["plan"]["name"]
            monthlyPrice.value=(customerallDetails.value)["plan"]["monthlyPrice"]
            showSkeleton.value = false
        }),
         $store.dispatch('common/getaddress')
         .then(response=> {
               Address.value = response
         })

      })
      return{
        popup:ref(false),
        showSkeleton,
        customerallDetails,
        account: computed(()=> $store.getters["auth/getAccountData"]),
        Address,
        plan,
        card: ref(false),
        monthlyPrice,
      
      }
  },

  components: {
    "plan-popup":
      require("src/components/features/account/plan/planPopup.vue")
      .default,
      "select-plans-dialog": require("src/components/features/account/plan/getPlan.vue").default,
  },
}
</script>

<style scoped>
.card {
     box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%) !important;
      margin-left: 10px !important;
      padding-left:5px;
      padding-top: 10px;
}

.text {
  max-width: 200px !important;
  width: 100% !important;
  padding: 5px;
  margin-left: 2px;
}
.text1 {
      margin-bottom: 1px;     
}
.q-gutter-md {
    margin-top: -26px;
}

.plan {
  padding-right: 10px
}
/* .q-tab-panel {
    padding: 26px;
    padding-top: 10px !important;
} */

</style>