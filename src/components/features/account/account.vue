<template>
  <div>
   <!-- <q-drawer v-model="leftDrawerOpen" width="200" side="left" bordered> -->
  <div class="q-py-lg splitterDiv q-px-md q-gutter-lg">  
        <q-splitter v-model="splitterModel">
 <template v-slot:before>
    <q-tabs
        v-model="tab"
        dense
        vertical
        inline-label
        active-color="primary"
        indicator-color="primary"
        class="text-color bg-white border"
        
              >
       <q-route-tab
          :ripple="{ color: 'primary' }"
          name="addressDetails"
          label="Accounts"
          v-if="!isTrailEnd"
          class="q-py-md plan-tab" 
          icon="mdi-account-circle"         
          to="/account/settings"
          no-caps
        />
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="plan"
          label="plans"
          class="q-py-md plan-tab"
          icon="mdi-credit-card"
          to="/account/plan"
          no-caps
        />
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="roles"
          v-if="!isTrailEnd"
          label="roles"
          class="q-py-md plan-tab"
           icon="mdi-account-star"
          to="/account/roles"
          no-caps
        />
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="users"
          v-if="!isTrailEnd"
          label="users"
          class="q-py-md plan-tab"
           icon="mdi-account-group"
          to="/account/users"
          no-caps
        />
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="invoices"
          v-if="!isTrail"
          label="Invoices"
          class="q-py-md plan-tab"
           icon="mdi-file-table"
           to="/account/invoice"
          no-caps
        />
    </q-tabs>
 </template>
     <template v-slot:after>
     <q-tab-panels class="transparent" vertical v-model="tab" animated >

        <q-tab-panel
          name="addressDetails"
          class="accounts-tab"
        >
          <addressDetails></addressDetails>
        </q-tab-panel>

        <q-tab-panel name="plan"  class="accounts-tab" >
          <plan></plan>
        </q-tab-panel>
        <q-tab-panel name="roles"  class="accounts-tab">
          <roles></roles>
        </q-tab-panel>
        <q-tab-panel name="users"  class="accounts-tab">
          <users></users>
        </q-tab-panel>
        <q-tab-panel name="invoices"  class="accounts-tab">
          <invoices></invoices>
        </q-tab-panel>
      </q-tab-panels>
     </template>
        </q-splitter>

    </div>
   
  </div> 
</template>

<script>

import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
 import { useRouter, useRoute } from 'vue-router'

export default {
  components: {
    info: require("src/components/features/account/info/info.vue").default,
    addressDetails:require("src/components/features/account/address/address.vue").default,
    plan:require("src/components/features/account/plan/new-plan.vue").default,
   contactus: require("src/components/features/contact-us/contactus.vue").default,
   users: require("src/components/features/settings/users/users.vue").default,
    roles: require("src/components/features/settings/roles/roles.vue").default,
    invoices:require("src/components/features/account/invoice/invoice.vue").default,

  },
  setup() {
         const $store = useStore()
         const customerallDetails = ref({})
         const user = ref()  
            let isTrailEnd = computed(()=>$store.getters["auth/getIsTrailEnded"])
            let isTrail = ref(true)
          const router = useRouter();
          // const planDetails = ref('') 
       onBeforeMount(async() => {
         let payload = localStorage.getItem('userId')
        //  planDetails.value =  $store.getters["auth/getAccountData"];
        $store.dispatch('common/getcustomerallDetails').then(response=>{
          (customerallDetails.value) = response;
           }),
           $store.dispatch('common/getUser',payload)
           .then(response => {
             (user.value) = response[0].name
           })

            let account = await $store.dispatch('auth/getAccount')
            isTrail.value = account.plan.isTrail
       })       
    
     return {
      isTrail,
       active: ref(true),
       isTrailEnd,
      //  leftDrawerOpen,
      //  activeTab,
      //  changeTab(tabName){
      //     activeTab.value = tabName
      //  },
       showForm(event){
            if (window.hbspt) {
             window.hbspt.forms.create({
                region: "na1",
                portalId: "1839515",
                formId: "119d7b95-57c0-4857-9ca0-4639cc28e99b",
                target: "#hubspotForm"                
            });
           }
       },
          tab: ref("info"),
          customerallDetails,
          user,  
          card: ref(false),
     };
  },
}
</script>

<style lang="scss" scoped>
.splitterDiv {
  border-radius: $border-radius;
  background: $white;
  height: 50px !important;
  :deep(.q-splitter__before){
      min-width: 10% !important;
        .q-tabs--vertical .q-tab__indicator {
            width: 2px;
        }
        .q-tab{
          text-transform: capitalize;
        }  
        .q-tabs--dense .q-tab {
     min-height: 50px; 
}    
  }
}
.plan-tab :deep(.q-tab__label){
  min-width: 75px !important;
    text-align: left !important;
}

.accounts-tab {
  padding-top: 0px;
  padding-left: 10px;
 
}
    // .link {
    //   position: relative;
    //   padding: 4px 0;
    //   transition: 0.5s;

    //   &::after {
    //     position: absolute;
    //     content: "";
    //     top: 100%;
    //     left: 0;
    //     width: 70%;
    //     height: 3px;
    //     background: $primary;
    //     transform: scaleX(0);
    //     transform-origin: right;
    //     transition: transform 0.5s;
    //   }

    //   &:hover {
    //     color: #95a5a6;
    //   }

    //   &:hover::after {
    //     transform: scaleX(1);
    //     transform-origin: left;
    //   }
    // }

</style>


