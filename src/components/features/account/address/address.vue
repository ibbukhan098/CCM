<template>
  <div v-if="!updateCard" class=" main q-pa-sm">
    <div class="text-h6 titleUnderline "> Plan Details </div>

    <!-- <div class="">
           <p class="text-bold text-body2 q-mb-sm q-ml-md q-pb-none" style="max-width: 100%">Current Plan : <span class="text-h6">{{activeAccountData.plan.name}}</span></p>
             <p class="text-bold text-body2 q-mb-sm q-ml-md q-pb-none q-pr-xl">Number of Catalogs  <span class="text-h6 q-ml-xl q-pl-lg">{{overViewDetails.catalogs}}/{{activeAccountData.plan.detail.CatalogLimit}}</span></p>
             <p class="text-bold text-body2 q-mb-sm q-ml-md q-pb-none">Number of sKUs  <span class="text-h6 q-ml-xl q-pl-xl">{{overViewDetails.skUs}}/{{kFormatter(activeAccountData.plan.detail.sKUsLimit)}}</span></p>
             <p class="text-bold text-body2 q-mb-sm q-ml-md q-pb-none">Number of Downloads  <span class="text-h6 q-ml-xl">{{overViewDetails.catalogsDownloaded}}</span></p>
        </div> -->
    <div class="q-my-lg plans row justify-between">
      <q-list class="col-6">
        <q-item class="q-pt-none">
          <q-item-section class="text-regular">
            <p class="" style="margin-bottom: 0px; font-size: 14px ">Current Plan: <span class="text-bold">${{
                activeAccountData?.plan?.monthlyPrice
            }} {{ activeAccountData?.plan?.name }}</span> |              
              <router-link to="/account/plan" class="linkText text-bold text-body2">
                Upgrade Plan
              </router-link>
            </p>
          </q-item-section>
          <q-item-section avatar>
            <!-- <q-icon color="primary" name="bluetooth" /> -->
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item class="text-normal">
          <q-item-section>Number of Catalogs</q-item-section>
          <q-item-section side v-if="activeAccountData?.plan?.id === 3">
            <!-- <q-avatar> -->
            {{ overViewDetails.catalogs }}/30
            <!-- </q-avatar> -->
          </q-item-section>
          <q-item-section side v-else>
            <!-- <q-avatar> -->
            {{ overViewDetails.catalogs }}/{{ activeAccountData?.plan?.detail?.CatalogLimit }}
            <!-- </q-avatar> -->
          </q-item-section>
        </q-item>

        <q-item class="text-normal">
          <q-item-section>Number of SKUs</q-item-section>
          <q-item-section side>
            {{ overViewDetails.skUs }}/{{ activeAccountData?.plan?.detail?.sKUsLimit }}
          </q-item-section>
        </q-item>
        <q-item class="text-normal">
          <q-item-section>Number of Downloads</q-item-section>
          <q-item-section side>
            <!-- <q-avatar> -->
            {{ overViewDetails.catalogsDownloaded }}
            <!-- </q-avatar> -->
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="!(accountData?.plan?.name == 'Free')" class="">
        <q-btn rounded color="primary" icon="mdi-credit-card" label="Update Card" @click="updateCard = true" />
      </div>
    </div>
    <div class="text-h6 titleUnderline"> Address Details </div>
    <div class="row items-center  q-mb-lg">
      <div class="col-8 q-pa-md">
        <q-form @submit="onAddressSubmit" class="q-gutter-md" ref="basicForm" autocorrect="off" autocomplete="off"
          autocapitalize="off" spellcheck="false">
          <div class="row q-gutter-md">
            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mt-sm q-mb-sm q-pb-none">Country*</p>
                <q-select transition-show="flip-up" transition-hide="flip-down" rounded outlined dense standout
                  v-model="billCountry" option-label="countryName" option-value="countryCode" :options="countries"
                  class="col-sm" @update:model-value="Onchange()" />
              </div>
            </div>
            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mt-sm q-mb-sm q-pb-none">Address Name*</p>
                <q-input v-model="billAddressName" rounded outlined dense standout lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'ADDRESS NAME IS REQUIRED',
                ]">
                  <div class="ada">address name</div>
                </q-input>
              </div>
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mb-sm q-pb-none">Address Line 1*</p>
                <q-input rounded outlined dense standout v-model="billLineOne" autogrow lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'ADDRESS LINE 1 IS REQUIRED',
                ]">
                  <div class="ada">address line 1</div>
                </q-input>
              </div>
            </div>
            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mb-sm q-pb-none">Address Line 2</p>
                <q-input rounded outlined dense standout v-model="billLineTwo" autogrow lazy-rules>
                  <div class="ada">address line2</div>
                </q-input>
              </div>
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mb-sm q-pb-none">Zip Code*</p>
                <q-input class="zipcode" rounded outlined dense standout v-model="zip" :rules="[
                  (val) => (val && val.length > 0) || 'ZIPCODE IS REQUIRED', noSpacialChars
                ]" @blur="getStateCities" maxlength="10" mask="##########" @update:model-value="OnchangeZip()">
                  <div class="ada">zipcode</div>
                </q-input>
              </div>
            </div>
            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mb-sm q-pb-none">State*</p>
                <q-input rounded outlined dense standout v-model="billState" v-bind:value="billState" class="col-sm">
                  <div class="ada">state</div>
                </q-input>
              </div>

            </div>
          </div>
          <div class="row q-gutter-md">



            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mb-sm q-pb-none">City*</p>
                <q-select transition-show="flip-up" transition-hide="flip-down" rounded outlined dense standout
                  v-model="billCity" option-label="cityName" option-value="cityCode" :options="cities" />
              </div>

            </div>
          </div>
          <div class="row">
            <div class="col-12 text-right q-mt-md">
              <q-btn type="submit" color="primary" rounded outlined standout label="save" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-4">
        <div class="text-center">
          <img class="desktop-only" src="~assets/vectors/address.svg" alt="Address">
        </div>
        <!-- <div class="w-65">
                <p class="text-left q-my-sm text-bold f-14">
                  {{storedAddress.addressName}}
                  <q-icon class="" color="positive" size="14" name="mdi-check-circle"></q-icon>
                </p>
                <div class="f-12">
                <p class="q-mt-sm">
                  {{storedAddress.line1}}, {{storedAddress.line2}},
                  {{storedAddress.stateName}}, {{storedAddress.city}},
                  {{storedAddress.countryName}}, {{storedAddress.zipCode}}
                </p>
                <p class="text-left q-my-sm text-bold f-14">
                  {{customerallDetails["companyName"]}}
                </p>
                 <p class="text-left q-my-sm text-bold f-14">
                  {{user}}
                  <q-icon class="cursor-pointer" color="positive" size="14" name="mdi-pencil-circle">
                     <q-menu>
                      <div class="row no-wrap q-pa-md">
                          <q-form @submit="onNameSubmit"  class="q-gutter-md"
                              autocorrect="off"
                              autocomplete="off"
                              autocapitalize="off"
                              spellcheck="false">
                            <div class="row justify-start">
                                <div class="col-12">
                                   <q-input
                                      v-model="user"
                                      rounded outlined dense standout
                                      lazy-rules
                                      :rules="[
                                        (val) => (val && val.length > 0) || 'Name is required',
                                      ]"
                                    />
                                    <q-btn
                                    type="submit"
                                    color="primary"
                                    label="Update"
                                    rounded outlined standout
                                  />
                                </div>
                            </div>

                          </q-form>
                      </div>
                    </q-menu>
                  </q-icon>
                </p>
                </div>
             </div>                                        -->
      </div>
    </div>
  </div>
  <div v-if="updateCard">
    <div class="q-px-lg q-pt-sm">
      <div class="plan q-pb-md cursor-pointer" @click="updateCard = false">
        <span class="plan"><i class="mdi mdi-chevron-left medium bold" style="color: black"></i> Back </span>
      </div>
      <div class="text-h6 titleUnderline q-pb-md plan_name" style="margin-left: 20px;">Update Card Details
      </div>
      <div class="row items-center  q-mb-lg">
      <div class="col-6 q-pa-md">
      <q-form ref="basicForm" @submit="onCardSubmit" class="q-gutter-md q-pt-lg ">
        <div class="row items-center q-gutter-md">
          <div class="col">
            <p class="text-bold text-body2 q-mb-sm q-pb-none">
              Card Number *
            </p>
            <q-input rounded outlined dense standout placeholder="111111111111111" v-model="cNum" lazy-rules :rules="[
              (val) =>
                (val && val.length > 0) || 'CARD NUMBER IS REQUIRED',
              cardValidation,
            ]" mask="################" @keyup="cardShow(cNum)">
              <template v-if="card.length > 0" v-slot:append>
                <img style="width: 40px;" :src="card">
              </template>
            </q-input>
          </div>
        </div>
        <div class="row items-center q-gutter-md">
          <div class="col">
            <p class="text-bold text-body2 q-mb-sm q-pb-none">
              Card Name *
            </p>
            <q-input rounded outlined dense standout placeholder="John Doe"
              mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS" v-model="cName" maxlength="50" lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'CARD NAME IS REQUIRED',
              ]" />
          </div>
        </div>
        <div class="row items-center q-gutter-md">
          <div class="col">
            <p class="text-bold text-body2 q-mb-sm q-pb-none">
              Expiry Month/Year *
            </p>
            <q-input rounded outlined dense standout placeholder="01/01" mask="##/##" ref="cMonthRef" v-model="cMonth"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'MONTH/YEAR IS REQUIRED',
                expiryDateValidation
              ]">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="cDateProxy" v-if="!toggleDatePicker" cover transition-show="scale"
                    transition-hide="scale">
                    <q-date minimal :emit-immediately="true" default-view="Years" mask="MM/YY" v-model="cMonth"
                      @update:model-value="checkValueDate" @click="clearDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col">
            <p class="text-bold text-body2 q-mb-sm q-pb-none">CVV *</p>
            <q-input rounded outlined dense standout placeholder="123" v-model="cvvNumber" lazy-rules :rules="[
              (val) => (val && val.length > 0) || 'CVV IS REQUIRED',
              cvvValidation,
            ]" mask="####" />
          </div>
        </div>
        <div class="row text-right">
          <div class="col">
          <q-btn type="submit" color="primary" rounded outlined standout class="q-ml-md" label="UPDATE CARD" />
          </div>
        </div>
      </q-form>
       </div>
        <div class="col-4">
        <div class="text-center q-ml-xl">
          <img class="desktop-only q-ml-xl" src="~assets\images\undraw_online_payments_re_y8f2.svg" alt="Creditcard">
        </div>
       </div>
      </div>
    </div>
  </div>
</template>
   <script>

import { LocalStorage, useQuasar, QSpinnerClock, Loading } from "quasar";
import { ref, computed, reactive, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber,
} from "creditcard.js";

export default {

  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const updateCard = ref(false);
    const billAddressName = ref(null);
    const billCountry = ref(null);
    const billState = ref(null);
    const billCity = ref(null);
    const billLineOne = ref(null);
    const billLineTwo = ref(null);
    const billPhone = ref(null);
    const zip = ref(null);
    // const activeAccountData = ref(null)
    const user = ref(null);
    let card = ref("");
    const overViewDetails = ref({});
    const userDetails = ref(null);
    const customerallDetails = ref({})
    var addressDetails = reactive({})
    const storedAddress = computed(() => $store.getters["auth/getAddress"])
    const cMonthRef = ref(null);
    const cMonth = ref(null);
    const ccv = ref(null);
    const cvvNumber = ref(null);
    const cNum = ref(null);
    const cName = ref(null);
    const toggleDatePicker = ref(false);
    let accountData = $store.getters["auth/getAccountData"];
    let cards = {
      "Visa": "https://ccmweb.blob.core.windows.net/linesheetspro/images/visa-logo.svg",
      "Mastercard": "https://ccmweb.blob.core.windows.net/linesheetspro/images/mastercard-logo.svg",
      "Amex": "https://ccmweb.blob.core.windows.net/linesheetspro/images/american-express-logo.svg"
    };
    const onCardSubmit = () => {
       Loading.show({
        spinner: QSpinnerClock,
        spinnerColor: "indigo",
      })    
      let expireYear = cMonth.value.split("/")[1]
      let cardDetails = {
        programID: parseInt(LocalStorage.getItem("pID")),
        accountID: parseInt(localStorage.getItem("accountId")),
        cardDetails: {
          expirationMonth: cMonth.value.split("/")[0],
          expirationYear: expireYear,
          cvv: cvvNumber.value,
          creditCardNumber: cNum.value,
        }
      };
      $store.dispatch("auth/updateCard", cardDetails).then((val) => {
         Loading.hide()
        if (val.status == "Success") {
          $q.notify({
            type: "positive",
            position: "top",
            message: "Card updated successfully",
            timeout: 1000,
          });
          $store.dispatch("auth/getPlanDetails", data);
          $store.dispatch("auth/getAccount");
          $q.notify({
            color: "negative",
            position: "top",
            classes: "notifyClass",
            message: "Failed to save card details. Please try again",
            timeout: 1000,
          });
        }
      });
    };
    const onNameSubmit = (async () => {
      let data = {
        id: userDetails.value.id,
        name: user.value,
        userName: userDetails.value.userName,
        email: userDetails.value.email,
        roleId: userDetails.value.roleId,
        createdDate: userDetails.value.createdDate,
        status: userDetails.value.status,
        deleted: userDetails.value.deleted,
      };
      await $store.dispatch("common/updateUser", data)
      await $store.dispatch('common/getUsers')
      // window.location.reload()
    })
    onBeforeMount(async () => {
      // activeAccountData.value = $store.getters["auth/getAccountData"];

      $store.dispatch("home/getOverviewDetails").then((response) => {
        overViewDetails.value = response;
        overViewDetails.value.skUs = kFormatter(response.skUs);
        overViewDetails.value.catalogs == kFormatter(response.catalogs);
        overViewDetails.value.products = kFormatter(response.products);
        overViewDetails.value.skUsOutOfStock = kFormatter(
          response.skUsOutOfStock
        );
        overViewDetails.value.catalogsDownloaded = kFormatter(
          response.catalogsDownloaded
        );
        overViewDetails.value.apiRequested = kFormatter(response.apiRequested);
      });

      let payload = localStorage.getItem('userId')
      $store.dispatch('common/getcustomerallDetails')
        .then(response => {
          (customerallDetails.value) = response;
        }),

        $store.dispatch('common/getUser', payload)
          .then(response => {
            (user.value) = response[0].name
            userDetails.value = response[0];
          })

      $store.dispatch("auth/getCountries")
      let result = await $store.dispatch("auth/getAddressId")
      if (result.addressName != "" && result != "") {
        billCountry.value = result.countryName
        billAddressName.value = result.title
        billLineOne.value = result.addressLine1
        billLineTwo.value = result.addressLine2
        billPhone.value = result.phone
        zip.value = result.zipCode
        billState.value = result.stateName
        billCity.value = result.city
      }
      if(billCountry.value != null) {
        getStateCities()
      }   
    })

    const kFormatter = (num) => {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    };
    const OnchangeZip = () => {
      billCity.value = null
      if (billState.value == null || billCity.value == null) {
        $store.dispatch('auth/clearStateandCity')
      }
    }


    const Onchange = () => {
      zip.value = null
      billCity.value = null
      if (billState.value == null || billCity.value == null) {
        $store.dispatch('auth/clearStateandCity')
      }
    }
       const getStateCities=async()=> {
        let countryCode= billCountry.value.countryCode ? billCountry.value.countryCode : $store.getters["auth/getAddress"].countryCode
        let zipcode = zip.value ? zip.value : $store.getters["auth/getAddress"].zipCode
        let data = {
          countryCode: countryCode,
          zipCode: zipcode,
        };
        if(zipcode != ''){
        let response=await $store.dispatch("auth/checkZipcode",data)
           if(response.result.length==0){
          $q.notify({
            color: "negative",
            position: "top",
            classes: "notifyClass",
            message: "Please enter valid zipcode",
            timeout: 1000,
          });
      }else{
        $store.dispatch("auth/getStateandCities", data);
      }
     }
        
      }

    const onAddressSubmit = () => {
      addressDetails = {
        id: $store.getters["auth/getAddress"].id,
        programID: 1,
        accountID: parseInt(localStorage.getItem('accountId')),
        title: billAddressName.value,
        addressLine1: billLineOne.value,
        addressLine2: billLineTwo.value,
        city: billCity.value.cityName ? billCity.value.cityName : billCity.value,
        countryName: billCountry.value.countryName ?
          billCountry.value.countryName : $store.getters["auth/getAddress"].countryName,
        countryCode: billCountry.value.countryCode ? billCountry.value.countryCode :
          $store.getters["auth/getAddress"].countryCode,
        stateCode: $store.getters["auth/getState"].stateCode ? $store.getters["auth/getState"].stateCode :
          $store.getters["auth/getAddress"].stateCode,
        stateName: $store.getters["auth/getState"].stateName ? $store.getters["auth/getState"].stateName :
          $store.getters["auth/getAddress"].stateName,
        county: null,
        zipCode: zip.value,
      };
      $store.dispatch('auth/saveAddress', addressDetails)
    }
    return {
      storedAddress,
      onCardSubmit,
      onAddressSubmit,
      cMonth,
      cMonthRef,
      cName,
      cNum,
      ccv,
      cvvNumber,
      updateCard,
      billAddressName,
      billCountry,
      billCity,
      billLineOne,
      billLineTwo,
      billPhone,
      zip,
      card,
      cards,
      toggleDatePicker,
      Onchange,
      OnchangeZip,
      kFormatter,
      customerallDetails,
      activeAccountData: computed(() => $store.getters["auth/getAccountData"]),
      overViewDetails,
      user,
      accountData,
      onNameSubmit,
      countries: computed(() => $store.getters["auth/getCountries"]),
      billState: computed(() => $store.getters["auth/getState"].stateName),
      cities: computed(() => $store.getters["auth/getCities"]),
      getStateCities,
      noSpacialChars(val) {
        const usernamepattern = /[~`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
        return !usernamepattern.test(val) || "USERNAME IS NOT VALID";
      },
      cardValidation(val) {
        let cradName = isValid(val);
        if (cradName) {
          return isValid;
        } else {
          return "CARD IS NOT VALID";
        }
      },
      cardShow(val) {
        card.value = "";
        let cardType = getCreditCardNameByNumber(val)
        if (cards.hasOwnProperty(cardType)) {
          card.value = cards[cardType]
        }
      },
      cvvValidation(val) {
        let cNumber = cNum.value;
        let isCvvValid = isSecurityCodeValid(cNumber, val);
        if (isCvvValid) {
          return isCvvValid;
        } else {
          return "CVV IS NOT VALID";
        }
      },
      expiryDateValidation(val) {
        let expiry = (cMonth?.value)?.split("/");
        let isExpiryValid = isExpirationDateValid(expiry[0], expiry[1]);
        if (isExpiryValid) {
          return isExpiryValid;
        } else {
          return "EXPIRY DATE IS NOT VALID";
        }
      },
      checkValueDate(val, reason, details) {
        toggleDatePicker.value = false;
        if (reason === "month") {
          toggleDatePicker.value = true;
        } else {
          toggleDatePicker.value = false;
        }
      },
      clearDate() {
        toggleDatePicker.value = false;
      }
    }

  }
}
</script>


    <style lang="scss" scoped>
    .titleUnderline {
      padding-top: 20px
    }

    .plan {
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      color: black;
      margin-left: 7px;
    }

    .plans {
      margin-right: 120px;
    }

    .q-gutter-md {
      max-width: 99%;
    }

    .q-separator--horizontal {
      margin-left: 25px;
      margin-right: 25px;
    }

    .ada {
      display: none;
    }

    @media screen and (max-width:1024px) {
      .plans {
        margin-right: 0px;
      }
    }
    </style>
