<template>
    <div class=" q-gutter-sm main" style="min-width: 70vw; ">
        <q-card>
    <q-stepper
    v-model="step"
    ref="stepper"
    alternative-labels
    color="primary"
    animated
    
    class="overflow-hidden"
  >
    <q-step
    :name="1"
    title="Select Your Plan"
    icon="mdi-currency-usd"
    :done="done1"
    autocorrect="off"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false"
  >

     <div class="q-pa-sm">
  <div class="row q-gutter-lg q-mb-xl plandetails justify-center">
  <!-- //First Plan -->
  <div
  v-for="plan in planDetails"
      :key="plan.id"
  >
   <div class="plan-table basic purple" v-if="!plan.isTrail">
    <div class="plan-table basic box purple plan-border plan_item " :style="activeAccountData.plan.name === plan.name ? ' background-color: rgb(80 95 201); color: white;transform: scale(1.06);box-shadow: rgb(1 22 18 / 32%) 0px 6px 9px 4px; ' : 'outline: none;'" >

      <div class="column justify-center">
        <p class="text-h6 text-nexa q-my-none q-mx-auto">{{ plan.name }} Plan</p>
        <!-- <p class="text-h6 text-weight-regular q-my-sm q-mx-auto">Made For Starters</p> -->
      </div>
      <!-- //Features -->
      <q-list class="q-pt-sm column">
        <q-item class="q-pa-none" v-ripple>
          <q-item-section class="q-pa-none" avatar>
            <q-icon color="green" name="mdi-check" :style="activeAccountData.plan.name === plan.name ? ' border-radius: 50%; background: #fff; padding: 3px;' : ''" />
          </q-item-section>
          <q-item-section class="q-pa-none"
            >Upto {{ plan.detail.CatalogLimit }} Catalogs</q-item-section
          >
        </q-item>
        <q-item class="q-pa-none" v-ripple>
          <q-item-section class="q-pa-none" avatar>
          <q-icon color="green" name="mdi-check" :style="activeAccountData.plan.name === plan.name ? ' border-radius: 50%; background: #fff; padding: 3px;' : ''" />
          </q-item-section>
          <q-item-section class="q-pa-none"
            >Upto {{ plan.detail.sKUsLimit }} SKUs</q-item-section
          >
        </q-item>
        <q-item class="q-pa-none" v-ripple  v-if="plan.name==='Basic'">
          <q-item-section class="q-pa-none" avatar>
             <q-icon color="green" name="mdi-check" :style="activeAccountData.plan.name === plan.name ? ' border-radius: 50%; background: #fff; padding: 3px;' : ''" />
          </q-item-section>
          <q-item-section class="q-pa-none"
           >Product Feed</q-item-section
          >
        </q-item>
        <q-item class="q-pa-none" v-ripple  v-if="plan.name!=='Basic'">
          <q-item-section class="q-pa-none" avatar>
            <q-icon color="green" name="mdi-check" :style="activeAccountData.plan.name === plan.name ? ' border-radius: 50%; background: #fff; padding: 3px;' : ''" />
          </q-item-section>
          <q-item-section class="q-pa-none"
           >Product Feed, Inventory</q-item-section
          >
        </q-item>
     
        <q-item class="q-pa-none" v-ripple v-if="plan.name==='Premium'">
          <q-item-section class="q-pa-none" avatar>
            <q-icon color="green" name="mdi-check" :style="activeAccountData.plan.name === plan.name ? ' border-radius: 50%; background: #fff; padding: 3px;' : ''" />
          </q-item-section>
          <q-item-section class="q-pa-none"
           >Excel to Download, API</q-item-section
          >
        </q-item>
        <q-item class="q-pa-none" v-ripple v-if="plan.name!=='Premium'">
          <q-item-section class="q-pa-none" avatar>
            <q-icon color="green" name="mdi-check" :style="activeAccountData.plan.name === plan.name ? ' border-radius: 50%; background: #fff; padding: 3px;' : ''" />
          </q-item-section>
          <q-item-section class="q-pa-none"
           >Excel to Download</q-item-section
          >
        </q-item>
       
      </q-list>
      <div class="price-tag text-nexa q-pt-md  flex justify-center items-center">
        <span class="symbol text-h7">$</span>
        <span class="amount text-h5">{{ plan.monthlyPrice }}</span>
        <span class="after">/Month</span>
      </div>
      <q-item class="q-pa-none flex justify-center items-cente" v-ripple>
        <p>( Setup Price: </p>
        <span class="symbol text-h7 text-weight-bold">$</span>
        <span class="amount text-h7 text-weight-bold">{{ plan.setupPrice }} )</span>
      </q-item>
       <!-- //Button -->
       
      <div class="flex justify-center">
        
         <q-btn
          @click="onPlanSubmit(plan)"
          class="getStarted"
          color="orange-8"
          :style="activeAccountData.plan.name === plan.name ? 'opacity: 1 !important' : ''"
          v-if="activeAccountData.plan.name === plan.name "
          :label="activeAccountData.plan.name === plan.name ? 'Current Plan' : 'Get Started'"
          :disabled="activeAccountData.plan.id >= plan.id ? 1 : 0"
          push
        />
         <q-btn
          @click="activeAccountData.plan.id >= plan.id ? onContactSubmit() : onPlanSubmit(plan)"
          class="getStarted"
          color="orange-8"
        v-else
          :label="activeAccountData.plan.id >= plan.id ? 'Contact Us' : 'Upgrade Plan'"
          push
        />
      </div>
    </div>      
  </div>
  </div>
</div>
<!-- <div class="row q-mt-lg q-mb-lg justify-center">       
      <p class="q-pt-md text-left ml-big"> Enterprise Plan <a href="javascript:void(0)" @click="toolbar=true"  style="text-decoration: underline;">Contact Us</a></p>          
      <q-stepper-navigation class="q-pt-sm text-right">
    </q-stepper-navigation>
</div> -->
   
        
<q-dialog v-model="toolbar">
  <q-card style="min-width:350px;">
    <q-toolbar>
      <q-toolbar-title>
        <span class="text-weight-bold">Contact Us</span>
      </q-toolbar-title>
      <q-btn flat round dense icon="close" v-close-popup/>
    </q-toolbar>
    
      <q-card-section>
        <!-- <contactform/> -->
        <div class="q-pa-md" style="max-width: 800px">
        <q-form
    
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="contactfirstName"
        label="First name*"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'FIRST NAME IS REQUIRED']"
      />
      <q-input
        outlined
      v-model="contactlastName"
      label="Last name*"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'LAST NAME IS REQUIRED']"
    />
    <q-input 
         outlined
         autocomplete="off"
        autocapitalize="off"
         v-model="contactemail"
         label="Business Email *"
         lazy-rules
          :rules="[(val) => !!val || 'EMAIL IS REQUIRED', isValidEmail, validateEmail]"
              />
              <q-input 
              outlined
                label="Phone Number*"
                type="tel"              
                v-model="contactbillPhone"
                :rules="[
                  (val) => (val && val.length === 10) || 'PHONE NUMBER IS REQUIRED',
                ]"
              />
              <q-input
              v-model="contacttext"
              filled
              type="textarea"
              label="Message*"
    />

      <div  class="q-pa-md row justify-center" >
        <q-btn  label="Submit" type="submit" color="orange-8" v-close-popup/>
      
        </div>
      </q-form>
      </div>

      </q-card-section>
   
  </q-card>
</q-dialog>


</div> 
  </q-step>
  <q-step
    :name="2"
    title="Payment Details"
    icon="mdi-credit-card"
    :done="done2"
  >
  <q-form
  ref="basicForm"
  @submit="onCardSubmit"
  @reset="onReset"
  class="q-gutter-md"
>
  <div class="row items-center q-gutter-md">
    <div class="col">
      <q-input 
      outlined
        v-model="cName"
        label="Card Name *"
        maxlength="50"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'CARD NAME IS REQUIRED',
        ]"
      />
    </div>
  </div>
    <div class="row items-center q-gutter-md">
    <div class="col">
      <q-input 
      outlined        
        v-model="cNum"
        label="Card Number *"          
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'CARD NUMBER IS REQUIRED',
          cardValidation,
        ]"
        mask="################"
      />
    </div>
    </div>        
        <div class="row items-center q-gutter-md">
    <div class="col">
      <q-input 
      outlined                    
        ref="cMonthRef"
        v-model="cMonth"
        label="Expiry Year/Month *"
        :rules="['cMonth'  || 'Expiry Is required']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="cDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                minimal
                :emit-immediately="true"
                default-view="Years"
                mask="YYYY/MM"
                v-model="cMonth"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input >
    </div>
    <div class="col">
      <q-input 
      outlined            
        v-model="cvvNumber"
        label="CVV *"           
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'CVV IS REQUIRED',
          cvvValidation
        ]"
        mask="####"
      />
    </div>
  </div>
  <div class="col-12 text-right">
    <q-btn
    flat
    @click="step = 1"
    color="primary"
    label="Back"
    class="q-ml-sm"
  />
  <q-btn type="submit" color="primary" label="Finish" />
 
  </div>
</q-form>

    <q-stepper-navigation> </q-stepper-navigation>
  </q-step> 
</q-stepper> 
</q-card>
</div>
</template>
    
    
    <script> 
    
    import { LocalStorage, useQuasar } from "quasar";
    import { ref, computed, reactive, onBeforeMount, onMounted } from "vue";
    import { useStore } from "vuex";
    import { useRouter, useRoute } from 'vue-router'
    
    export default{
        setup() {
            const $store = useStore();
            const $q = useQuasar();
            const step = ref(1);
            const selectedPlan = ref(0);
            const router = useRouter();
            const done1=ref(false);
            const done2=ref(false);
            const cMonthRef = ref(null);
            const cMonth = ref(null);
            const ccv = ref(null);
            const cvvNumber = ref(null);
            const cvvRef = ref(null);
            const cNum = ref(null);
            const cName = ref(null);
            const customerallDetails = ref({})
            let user = ref('') 
            let activeAccountData = ref(null)
            const planHeader = reactive(["monthlyPrice", "sKUsLimit", "users", "validityDays", "lineSheetsLimit"])
            onBeforeMount(async() => {
            activeAccountData.value = $store.getters["auth/getAccountData"];
            $store.dispatch('auth/getPlans')
            $store.dispatch('auth/getAccount')
            let payload = localStorage.getItem('userId')
               await $store.dispatch('common/getcustomerallDetails')
            .then(response=>{
                (customerallDetails.value) = response;
                })
            
                let result = await $store.dispatch('common/getUser',payload)
                    user.value = result[0].name
                    
             })

             onMounted(()=>{
             })
      const onCardSubmit = () => {
      
      let activeplan = $store.getters["auth/getActivePlan"];
      let accountData = $store.getters["auth/getAccountData"];
      let firstName=user.value
      let expireYear = (cMonth.value.split("/")[0]).substr(-2);
      let cardDetails = {
        "emailAddress":accountData.email,
          "creditCard": {
            "expirationMonth": cMonth.value.split("/")[1],
            "expirationYear":expireYear,
            "cvv":  cvvNumber.value,
            "creditCardNumber": cNum.value
          },
          "firstName": firstName,
          "lastName": firstName,
          "plan": {
            "planID":activeplan.id,
            "programID": parseInt(LocalStorage.getItem('pID')),
            "setupPrice": activeplan.setupPrice,
            "monthlyPrice": activeplan.monthlyPrice
          }
      };
      
      $store.dispatch("auth/payment", cardDetails).then((val) => {
        if (val.status== "succeeded") {          
          $q.notify({
            type: "positive",
           position: "top",
            classes : "notifyClass",
            message: "Account updated successfully",
            timeout: 1000,
          })
          let data = {
               "planID": activeplan.id
            }
           $store.dispatch('auth/getPlanDetails',data) 
            router.push("/dashboard");
            window.location.reload();

        } else {
          $q.notify({
            color: "negative",
           position: "top",
classes : "notifyClass",
            message: "Payment failed. Please try again",
            timeout: 1000,
          });
        }
      });
    };   
        const onPlanSubmit = (val) => {
         $store.dispatch('auth/storePlan', val) 
         .then(res=>{
            done1.value = true;
            step.value = 2;
            selectedPlan.value = val.id; 
       }) 
        //    router.push("/profile")
        }

        const onContactSubmit = () => {
           router.push("/contactus");
        }
    
         return {
              planDetails: computed(() => $store.getters["auth/getPlans"]),
               activePlan: computed(() => $store.getters["auth/getActivePlan"]),
                selectedPlan,
                onPlanSubmit,
                planHeader,
                step,
                done1,
                done2,
                cMonth,
                cMonthRef,
                cName,
                cNum,
                ccv,
                cvvNumber,
                onCardSubmit,
                customerallDetails,
                user,
                activeAccountData,
                onContactSubmit
         }
    
        }
    }
    </script>
    
    <style lang="scss" scoped>
    
    
    .q-gutter-md {
        max-width: 99%;
           margin-top: 0px;
    }
    .plan-heading {
      color: $primary;
       font-size: 24px;
      font-weight: 500;
    }
    .name {
      color: $primary;
    }
    .plan_item{
      min-width: 270px;
      max-width: 270px;
      padding: 30px;
      box-shadow: rgb(29 29 29 / 12%) 0px 6px 9px 1px;
      border-radius: 8px;
  }
  .plandetails {
    padding-left: 50px;
    padding-right: 50px;
  }
  
    </style>