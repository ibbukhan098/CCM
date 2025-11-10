<template>
  <div class="">
    <q-stepper
      style=" margin-top: -3.5%;"
      v-model="step"
      ref="stepper"
      alternative-labels
      color="primary"
      animated
      @before-transition="test($event)"
      class="overflow-hidden"
    >
      <q-step
        keep-alive
        :name="1"
        title="Company Details"
        icon="mdi-office-building"
        class="q-gutter-md"
        :done="done1"
      >
   
        <q-form
          ref="basicForm"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          autocorrect="off"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        >
          <div class="row justify-center q-gutter-y-md q-gutter-x-xl">
            <div class="col-4">
              <q-input 
                 outlined
                v-model="firstName"
                 maxlength="100"
                label="First Name*"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'FIRST NAME IS REQUIRED',
                  (val) => (val.split(' ').length <= 1) || 'SPACES ARE NOT ALLOWED'
                ]"
              />
            </div>
            <div class="col-4">
              <q-input 
                 outlined
                v-model="lastName"
                maxlength="50"
                label="Last Name*"
                
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'LAST NAME IS REQUIRED',
                  (val) => (val.split(' ').length <= 1) || 'SPACES ARE NOT ALLOWED'
                ]"
              />
            </div>
          </div>
          <div class="row justify-center q-gutter-y-md q-gutter-x-xl">
            <!-- <div class="col-4">
              <q-input 
                 outlined
                autocomplete="off"
                autocapitalize="off"
                v-model="userName"
                maxlength="50"
                label="Username*"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'USERNAME IS REQUIRED',
                  (val) => (val.split(' ').length <= 1) || 'SPACES ARE NOT ALLOWED',
                  noSpacialChars                                   
                ]"
              />
            </div> -->
            <div class="col-4">
              <q-input 
                v-model="companyURL"
                maxlength="150"
                label="Website URL*"
                outlined                
                :rules="[
                  (val) => (val && val.length > 0) || 'COMPANY URL IS REQUIRED', isValidUrl
                ]"
              />
            </div>
              <div class="col-4">
              <q-input 
                 outlined
                autocomplete="off"
                autocapitalize="off"
                v-model="email"
                maxlength="30"
                label="Email *"
                lazy-rules
                :rules="[(val) => !!val || 'EMAIL IS REQUIRED', isValidEmail]"
              />
            </div>
          </div>
          <div class="row justify-center q-gutter-y-md q-gutter-x-xl">
          <div class="col-4">
              <q-input 
                 outlined
                autocomplete="off"
                ref="passwordRef"
               
                maxlength="50"
                v-model="password"
                label="Password *"
                 :type="isPwd ? 'password' : 'text'"
                lazy-rules
                 :rules="[
                  (val) => !!val || 'PASSWORD IS REQUIRED',
                 (val) => val.length >= 8 || 'PASSWORD SHOULD BE ATLEAST 8 CHARACTERS IN LENGTH',
                  strongPassword,
                ]"
              >
               <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                ></q-icon>
              </template>
             <q-menu anchor="top left" self="top right">
          <q-item >
            <q-item-section class="name" style="font-weight: 600">Strong password:</q-item-section>
          </q-item>
           <q-item >
           <q-item-section>1 Upper Case Alphabet <br/>
                      1 Lower Case Alphabet <br/>
                      A number and a special character without any space <br/>
                      Minimum Of 8 Characters </q-item-section>
         </q-item>
         </q-menu>
              </q-input>
            </div>
            <div class="col-4">
              <q-input 
        outlined        
        ref="cpasswordRef"
        autocomplete="off"
       
        maxlength="30"
        v-model="cpassword"
         :type="isPwd1 ? 'password' : 'text'"
        label="Confirm Password *"
        lazy-rules
        :rules="[
        val => !!val || 'PASSWORD IS REQUIRED',       
          val => val.length >=  8 || 'PASSWORD SHOULD BE ATLEAST 8 CHARACTERS IN LENGTH',
          val=> val == password || 'PASSWORD AND CONFIRM PASSWORD MUST BE SAME', 
        ]"
      >
      <template v-slot:append>
                <q-icon
                  :name="isPwd1 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd1 = !isPwd1"
                ></q-icon>
              </template>
            </q-input>
       </div>
       <div class="col-8 row inline justify-end items-center" >
        <q-btn class="q-mt-xl q-mb-lg" label="Continue" type="submit" color="primary" />
      </div>
          </div>
          <!-- <div class="row justify-center q-gutter-y-md q-gutter-x-xl">
             <div class="col-4">
              <q-input 
                v-model="companyName"
                maxlength="100"
                label="Company Name*"
                 outlined
                
                :rules="[
                  (val) => (val && val.length > 0) ||  'COMPANY NAME IS REQUIRED',
                ]"
              />
            </div>
            <div class="col-4">
              <q-input 
                v-model="companyURL"
                maxlength="150"
                label="Company URL*"
                outlined                
                :rules="[
                  (val) => (val && val.length > 0) || 'COMPANY URL IS REQUIRED', isValidUrl
                ]"
              />
            </div>
            <div class="col-8 row inline justify-end items-center">
              <q-btn label="Continue" type="submit" color="primary" />
            </div>
          </div> -->
        </q-form>

        <q-stepper-navigation> </q-stepper-navigation>
      </q-step>
      <!-- <q-step
        :name="2"
        title="Address Details"
        icon="mdi-map-marker"
        :done="done2"
      >
      <q-form @submit="onAddressSubmit" @reset="onReset" class="q-gutter-md"
      autocorrect="off"
      autocomplete="off"
      autocapitalize="off"
      spellcheck="false">
    <div class="row justify-center q-gutter-x-xl">
       <div class="col-4">
        <q-select
          label="Country*"
          transition-show="flip-up"
          transition-hide="flip-down"
          outlined
          v-model="billCountry"
          option-label="countryName"
          option-value="countryCode"
          :options="countries"
          class="col-sm"
          @update:model-value="Onchange()" 
        />
      </div>
      <div class="col-4">
        <q-input 
        outlined
          v-model="billAddressName"
          label="Address Name*"
          maxlength="100"
          :rules="[
            (val) => (val && val.length > 0) || 'ADDRESS NAME IS REQUIRED',
          ]"
        />
      </div>
    
    </div>
      <div class="row justify-center q-gutter-x-xl">
          <div class="col-4">
        <q-input 
        outlined
          v-model="billLineOne"
          autogrow
          label="Address Line 1*"
          maxlength="200"
           :rules="[
            (val) => (val && val.length > 0) || 'ADDRESS LINE 1 IS REQUIRED',
          ]"
        />
      </div>
      <div class="col-4">
        <q-input 
        outlined
          v-model="billLineTwo"
          autogrow
          label="Address Line 2"
          maxlength="100"
          lazy-rules             
        />
      </div>
     
    </div>
    <div class="row justify-center q-gutter-x-xl">
     
      <div class="col-4">
        <q-input 
          label="Zip Code*"
          class="zipcode"
          outlined
          v-model="zip"
          :rules="[
            (val) => (val && val.length > 0) || 'ZIP CODE IS REQUIRED',
          ]"
          @blur="getStateCities"
          @update:model-value="OnchangeZip()"

        />
      </div>
       <div class="col-4">
        <q-input 
        outlined
          label="Phone Number*"
          type="tel"              
          v-model="billPhone"
          :rules="[
            (val) => (val && val.length === 10) || 'PHONE NUMBER IS REQUIRED',
          ]"
          mask="##########"
        />
      </div>
      </div>
      <div class="row justify-center q-gutter-x-xl">
      <div class="col-4">
        <q-input
        outlined
          v-model="billState"
          label="State*"
          :rules="[
            (val) => (val && val.length > 0) || 'STATE IS REQUIRED',
          ]"
        />
      </div>

      <div class="col-4">
        <q-select
          label="City*"
          transition-show="flip-up"
          transition-hide="flip-down"
          outlined
          v-model="billCity"
          option-label="cityName"
          option-value="cityCode"
          :options="cities"
          class="col-sm"
          :rules="[
            (val) => (val) || 'CITY IS REQUIRED',
          ]"
        />
      </div>
    </div>
       <div class="col-10 text-right mr-big">
         <q-btn
      flat
      @click="step = 1"
      color="primary"
      label="Back"
      class="q-ml-sm q-mt-none q-pt-none"
    />
          <q-btn type="submit" color="primary" label="Continue" />
       </div>           
  </q-form>   
        <q-stepper-navigation> </q-stepper-navigation>
      </q-step> -->
      <q-step
        :name="2"
        title="Select Your Plan"
        icon="mdi-currency-usd"
        :done="done3"
        autocorrect="off"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
      >
    
         <div class="q-pa-sm">
        <div class="row q-gutter-lg justify-center"> 
      <!-- //First Plan -->
      <div
      v-for="plan in planDetails"
          :key="plan.id"
      >
        <div class="plan-table basic purple" >
          <div class="column justify-center">
            <p class="text-h6 text-nexa q-my-none q-mx-auto">{{ plan.name }} Plan</p>
            <!-- <p class="text-h6 text-weight-regular q-my-sm q-mx-auto">Made For Starters</p> -->
          </div>
          <!-- //Features -->
          <q-list class="q-pt-sm column">
            <q-item class="q-pa-none" v-ripple>
              <q-item-section class="q-pa-none" avatar>
                <q-icon color="green" name="mdi-check" />
              </q-item-section>
              <q-item-section class="q-pa-none" v-if="plan.detail.IsCatalogUnlimited != 'true'"
                >
                <span></span>
                Upto {{ plan.detail.CatalogLimit }} Catalogs
                </q-item-section>
                <q-item-section class="q-pa-none" 
                >Upto {{ plan.detail.CatalogLimit }} Catalogs</q-item-section>
                IsCatalogUnlimited
            </q-item>
            <q-item class="q-pa-none" v-ripple>
              <q-item-section class="q-pa-none" avatar>
                <q-icon color="green" name="mdi-check" />
              </q-item-section>
              <q-item-section class="q-pa-none"
                >Upto {{ plan.detail.sKUsLimit }} SKUs</q-item-section
              >
            </q-item>
            <q-item class="q-pa-none" v-ripple  v-if="plan.name==='Basic'">
              <q-item-section class="q-pa-none" avatar>
                <q-icon color="green" name="mdi-check" />
              </q-item-section>
              <q-item-section class="q-pa-none"
               >Product Feed</q-item-section
              >
            </q-item>
            <q-item class="q-pa-none" v-ripple  v-if="plan.name!=='Basic'">
              <q-item-section class="q-pa-none" avatar>
                <q-icon color="green" name="mdi-check" />
              </q-item-section>
              <q-item-section class="q-pa-none"
               >Product Feed, Inventory</q-item-section
              >
            </q-item>
         
            <q-item class="q-pa-none" v-ripple v-if="plan.name==='Premium'">
              <q-item-section class="q-pa-none" avatar>
                <q-icon color="green" name="mdi-check" />
              </q-item-section>
              <q-item-section class="q-pa-none"
               >Excel to Download, API</q-item-section
              >
            </q-item>
            <q-item class="q-pa-none" v-ripple v-if="plan.name!=='Premium'">
              <q-item-section class="q-pa-none" avatar>
                <q-icon color="green" name="mdi-check" />
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
              label="Get Started"
              push
            />
          </div>
        </div>      
      </div>
    </div>
    <div class="row q-mt-lg q-mb-lg justify-between">       
          <p class="q-pt-md text-left ml-big"> Enterprise Plan <a href="javascript:void(0)" @click="toolbar=true"  style="text-decoration: underline;">Contact Us</a></p>          
          <q-stepper-navigation class="q-pt-sm text-right">
          <div class="col-12 text-right mr-big">
            <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-mr-lg"
          />
       
       </div>
        </q-stepper-navigation>
    </div>
       
            
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
        :name="4"
        title="Payment Details"
        icon="mdi-credit-card"
        :done="done4"
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
        @click="step = 2"
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
  </div>
</template>
<script>
import { LocalStorage, useQuasar } from "quasar";
import { ref, computed, reactive, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber,
} from 'creditcard.js';


export default {

  setup(props, context) {
  //  localStorage.clear();
    const $store = useStore();
    const $q = useQuasar();
    const  contactfirstName=ref(null);
    const  contactlastName=ref(null);
    const  contactemail=ref(null);
    const  contactbillPhone=ref(null);
    const contacttext=ref('');
    const firstName = ref(null);
    const lastName = ref(null);
    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);
     const isPwd  = ref(true);
     const isPwd1  = ref(true);
    const email = ref(null);
    const userName = ref(null);
    const password = ref(null);
    const cpassword = ref(null);    
    const phoneNumber = ref(null);
    const companyName = ref(null);
    const companyURL = ref(null);
    const passwordRef = ref(null);
    const cpasswordRef = ref(null);    
    const genderRef = ref(null);
    const dateRef = ref(null);
    const cMonthRef = ref(null);
    const cMonth = ref(null);
    const ccv = ref(null);
    const cvvNumber = ref(null);
    const cvvRef = ref(null);
    const cNum = ref(null);
    const cName = ref(null);
    const preferred = ref(0);
    const basicForm = ref(null);
    const done1 = ref(false);
    const done2 = ref(false);
    const done3 = ref(false);
    const done4 = ref(false);
    const date = ref("2019/02/01");
    const step = ref(1);
    const selectedPlan = ref(0);
    //For Billing Start
    // const billFirstName = ref(null);
    // const billLastName = ref(null);
    const billAddressName = ref(null);
    const billCountry = ref(null);
    const billState = ref(null);
    const billCity = ref(null);
    const billLineOne = ref(null);
    const billLineTwo = ref(null);
    const billPhone = ref(null);
    const zip = ref(null);
    const router = useRouter();
    const isUserNameValid = ref(false)
    const isEmailValid = ref(false)
    var signUpDetails = reactive({})
    var addressDetails = reactive({})
    const planHeader = reactive(["monthlyPrice", "sKUsLimit", "users", "validityDays", "lineSheetsLimit"])
    onBeforeMount(() => {
      $store.dispatch("auth/getPlans", LocalStorage.getItem("pID"));  
      });
 const kFormatter=(num)=>{
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}
      const contactApi=()=>{
        let data={
          properties:{
            firstname:contactfirstName.value,
            lastname:contactlastName.value,
            phone:contactbillPhone.value,
            email:contactemail.value,
            message:contacttext.value
          }
        }
        $store.dispatch('auth/contactapi',data).then(val=>{
         
        if(val == "Success"){
          $q.notify({
            type: "positive",  
            position: "top",
classes : "notifyClass",
            message: "We will contact you soon",
            timeout: 3000,
          });
          onTrailSubmit();
        } else{
          $q.notify({
            type: "negative",  
           position: "top",
classes : "notifyClass",
            message: "User already exist",
            timeout: 2000,
          });
        }
        })
       
      
      }
    //TrailSignup
    const onTrailSubmit = () => {
        let finalObject = {
          "account": signUpDetails,
          "address": addressDetails,
          "planID": 4,        
          "isTrail": true,
          "isPayment": false,        
        }
         $store.dispatch("auth/createUser", finalObject).then((response) => {
        if (response) {          
          $q.notify({
            type: "positive",  
           position: "top",
classes : "notifyClass",
            message: "Your trial period started",
            timeout: 2000,
          });
          $store.dispatch('auth/login', {
            userName : signUpDetails.userName,
            password : signUpDetails.password
          }).then(val=>{
            if(val=="success"){
                   router.push("/");
            }
          })
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
    } 

    //Billing End
    const onCardSubmit = () => {
      let activeplan = $store.getters["auth/getActivePlan"];
      let expireYear = (cMonth.value.split("/")[0]).substr(-2);
      let cardDetails = {
          "creditCard": {
            "expirationMonth": cMonth.value.split("/")[1],
            "expirationYear":expireYear,
            "cvv":  cvvNumber.value,
            "creditCardNumber": cNum.value
          },
          "firstName": firstName.value,
          "lastName": lastName.value,
          "plan": {
            "setupPrice": activeplan.setupPrice,
            "monthlyPrice": activeplan.monthlyPrice
          }
      };
      
      let finalObject = {
        "account": signUpDetails,
        "address": {
    "addressName": "",
    "line1": "",
    "line2": "",
    "city": "",
    "stateCode": "",
    "stateName": "",
    "countryCode": "",
    "countryName": "",
    "county": "",
    "zipCode": "",
    "phone": ""
  },
        "planID": selectedPlan.value,
        "isTrail": false,
        "isPayment": true,
        "paymentRequest": cardDetails
      }
      $store.dispatch("auth/createUser", finalObject).then((response) => {
        if (response) {          
          $q.notify({
            type: "positive",
           position: "top",
classes : "notifyClass",
            message: "Account created successfully",
            timeout: 1000,
          });
          $store.dispatch('auth/login', {
            userName : signUpDetails.email,
            password : signUpDetails.password
          }).then(val=>{
            if(val=="success"){
                   router.push("/");
            }
          })
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
            done3.value = true;
            step.value = 4;
            selectedPlan.value = val.id; 
       })       
    }
 const OnchangeZip=()=>{
    billCity.value=null
    if(billState.value == null || billCity.value == null){
           $store.dispatch('auth/clearStateandCity')
        } 
 }
    const Onchange = () => {
        // zip.value != null ? (zip.value = null) : ''
        // billCity.value != null ? (billCity.value = null) : ''
        // // billState.value != null ? (billState.value = null) : ''
        // billAddressName.value != null ? (billAddressName.value = null) : ''
        // billLineOne.value != null ? (billLineOne.value = null) : '' 
        // billLineTwo.value != null ? (billLineTwo.value = null) : ''
        // billPhone.value != null ? (billPhone.value = null) : ''
        // if(billState.value == null || billCity.value == null){
        //    $store.dispatch('auth/clearStateandCity')
        // }        
        zip.value = null
        billCity.value = null
        billAddressName.value = null
        billLineOne.value = null
        billLineTwo.value = null
        billPhone.value = null
        if(billState.value == null || billCity.value == null){
           $store.dispatch('auth/clearStateandCity')
        }    
    }

    const onAddressSubmit = ($event) => {
      addressDetails = {
        addressName: billAddressName.value,
        line1: billLineOne.value,
        line2: billLineTwo.value,
        phone: billPhone.value,
        countryName: billCountry.value.countryName,
        countryCode: billCountry.value.countryCode,
        stateCode: $store.getters["auth/getState"].stateCode,
        stateName: $store.getters["auth/getState"].stateName,
        city: billCity.value.cityName,
        zipCode: zip.value
      };
       done2.value = true;
       step.value = 3;
       $store.dispatch("auth/getPlans", LocalStorage.getItem("pID"));
    };
    const onSubmit = ($event) => {
      let userData = {
        email : email.value,
        userName : userName.value
      }
      $store.dispatch('auth/validateUserdata', userData).then(val=>{
if(val.userNameStatus){
        $q.notify({
            type: "negative",
           position: "top",
           classes : "notifyClass",
            message: "Username already exists",
            timeout: 3000,
          });
          return
      }
      if(val.emailStatus){
        $q.notify({
            type: "negative",
           position: "top",
classes : "notifyClass",
            message: "Email already exists",
            timeout: 3000,
          });
          return
      }
      
      signUpDetails = {
        programID: parseInt(LocalStorage.getItem("pID")),
        name: firstName.value+" "+lastName.value,
        userName: email.value,
        email: email.value,
        password: password.value,
        companyName:companyURL.value,
        companyURL: companyURL.value,
      };
          done1.value = true;
          step.value = 2;
          $store.dispatch("auth/getCountries");
  })
    };
    return {
      toolbar:ref(false),
      planHeader,
      name,
      contactApi,
      contactfirstName,
      contactlastName,
      contactemail,
      contactbillPhone,
      contacttext,
      firstName,
      lastName,
      age,
      accept,
      email,
      userName,
      password,
      cpassword,
      isPwd,
      isPwd1,
      basicForm,
      phoneNumber,
      companyName,
      companyURL,
      cvvRef,
      passwordRef,
      cpasswordRef,
      genderRef,
      dateRef,
      cMonthRef,
      cMonth,
      done1,
      done2,
      done3,
      done4,
      Onchange,
      OnchangeZip,
      ccv,
      cName,
      cNum,
      cvvNumber,
      // billFirstName,
      // billLastName,
      billAddressName,
      billCountry,
      billCity,
      billLineOne,
      billLineTwo,
      billPhone,
      preferred,
      accepted: ref([]),
      step,
      selectedPlan,
      onTrailSubmit,
      zip, 
      isUserNameValid,
      isEmailValid,
      planDetails: computed(() => $store.getters["auth/getPlans"]),
      countries: computed(() => $store.getters["auth/getCountries"]),
      billState: computed(() => $store.getters["auth/getState"].stateName),
      cities: computed(() => $store.getters["auth/getCities"]),
      activePlan: computed(() => $store.getters["auth/getActivePlan"]),   
      customPlanDetails:computed(()=>$store.getters["auth/getCustomPlans"]),  
      //credit card validation
      strongPassword(val) {
        let password_length = val.length;
        const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        let contains_number = /\d/.test(val);
        let contains_uppercase = /[A-Z]/.test(val);
        let contains_special_character = format.test(val);
        if (!contains_number) {
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE NUMBER";
        }
        if (!contains_uppercase) {
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE UPPER CASE";
        }
        if (!contains_special_character) {
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE SPECIAL CHARACTERS";
        }

        if (
          contains_special_character === true &&
          contains_uppercase === true &&
          contains_number === true
        ) {
          return true;
        } else {
          return false;
        }
      },
      cardValidation(val) {
          let cradName = isValid(val)
          if(cradName){
            return isValid;
          } else {
            return "CARD IS NOT VALID";
          }
        },
      cvvValidation(val) {
            let cNumber = cNum.value
            let isCvvValid = isSecurityCodeValid(cNumber, val)
            if(isCvvValid){
              return isCvvValid;
            }else {
              return "CVV IS NOT VALID";
            }
          },
      options: [
        {
          label: "Male",
          value: 0,
        },
        {
          label: "Female",
          value: 1,
        },
        {
          label: "Other",
          value: 2,
        },
      ],
      date: ref("2019/02/01"),
      
      validateUserName() {
        let val = {
          programID: localStorage.getItem("pID"),
          value : userName.value,
          type : 0
        };
        $store.dispatch("auth/validateUser", val)                          
      },
      validateEmail() {
        let val = {
          programID: localStorage.getItem("pID"),
          value : email.value,
          type : 1
        };
        $store.dispatch("auth/validateUser", val)                          
      },
      isValidUrl(val) {
        const urlPattern=/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
        return urlPattern.test(val) || "INVALID URL";
      },
      noSpacialChars(val){
         const usernamepattern = /[~`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
          return !usernamepattern.test(val) || "USERNAME IS NOT VALID";
      },
      isValidEmail(val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || "INVALID EMAIL";
      },
      isValidateDomain(val){
        var domain = /.+@(gmail|yahoo|gmx|aol|icloud|mailfence|outlook|hotmail|livemail)\.(com|net|in)$/;
        return !domain.test(val) || "ENTER YOUR BUSINESS EMAIL";
      },
    
      getStateCities() {
        let data = {
          countryCode: billCountry.value.countryCode,
          zipCode: zip.value,
        };
        $store.dispatch("auth/getStateandCities", data);
      },
      test(event) {
        // if(event == 2){
        //   this.basicForm.validate().then(valid=>{
        //     if(valid){
        //           $q.notify({
        //         type: 'negative',
        //         position: 'top',
        //         message: 'Fill The All Details',
        //       })
        //       this.step = 1
        //     }
        //     })
        //   }
      },
      onAddressSubmit,
      onSubmit,
      onCardSubmit,
      onPlanSubmit,
      setValidation() {},

      onReset() {
        // done1.value = false
        // done2.value = false
        // done3.value = false
        // step.value = 1
      },
    };
  },
  beforeMount() {
    
  },
  updated() {
    
  },
  beforeUpdate() {
   
  },
};
</script>
<style lang="scss" scoped>
.plan-table {
  border: 1px solid #ccc;
  border-radius: 10px;
    min-width: 200px;
  padding: 16px 24px;
}

.mr-big{
  margin-right: 125px
}
.ml-big{
  margin-left: 135px
}
.plan-table .q-item__section--avatar {
  min-width: 30px;
}
.plan-table .q-item {
  min-height: 30px;
}
.getStarted {
  width: 100%;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
.tableDiv{
  th,td{
    padding: 20px;
  }
}
.q-gutter-md{
  margin-top: 0px;
}
.justify-between{
  justify-content: space-around;
}
</style>