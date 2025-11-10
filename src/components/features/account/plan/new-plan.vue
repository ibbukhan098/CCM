<template>
  <div class="main q-pa-sm">
    <div v-if="!showCard && !paymentcard">
      <div class="text-h6 titleUnderline">Plans</div>
      <div
        class="row q-pt-lg planDiv q-mt-lg q-gutter-md justify-center"
        v-if="activePlan"
      >
        <div
          v-show="!showSkeleton"
          :class="
            activePlan.plan.id == plan.id
              ? 'planSingle active'
              : 'planSingle normal'
          "
          v-for="plan in planDetails"
          :key="plan.id"
        >
          <div v-if="!plan.isCustomPlan">
            <p class="subtitle q-my-sm">
              {{ plan.name }}
            </p>
            <p class="q-my-sm">
              <span class="priceFont"> ${{ plan.monthlyPrice }} </span>
              <span
                :class="
                  activePlan.plan.id == plan.id
                    ? 'text-white f-14'
                    : 'sand f-14'
                "
              >
                / Month
              </span>
            </p>
            <p class="q-my-sm">
              <span
                :class="
                  activePlan.plan.id == plan.id
                    ? 'text-white f-14'
                    : 'sand f-14'
                "
              >
                (License Fee :
              </span>
              <span class="setup-priceFont"> ${{ plan.setupPrice }}) </span>
            </p>
            <!-- <p class="para f-14" >
              Ideal for new eCommerce businesses
            </p>
             <p class="para f-14">
              Ideal for expanding businesses
            </p>
             <p class="para f-14">
              Ideal for established businesses
            </p> -->
            <div class="boxDiv">
            <p class="para f-14 info-text">
              {{ plan.additionalInfo  }}
            </p>
            <div class="row">
              <div class="col-2">
                <q-icon
                  color="positive"
                  name="mdi-check-circle"
                  size="xs"
                ></q-icon>
              </div>
              <div class="col-9">
                <p
                  class="feature"
                  v-if="plan.detail.IsCatalogUnlimited == 'true'"
                >
                  Unlimited Catalogs
                </p>
                <p class="feature" v-else>
                  Upto {{ plan.detail.CatalogLimit }} Catalogs
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <q-icon
                  color="positive"
                  name="mdi-check-circle"
                  size="xs"
                ></q-icon>
              </div>
              <div class="col-9">
                <p class="feature">
                  {{ kFormatter(plan.detail.sKUsLimit) }} SKU's limit
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <q-icon
                  color="positive"
                  v-if="plan.detail.feed == 'true'"
                  name="mdi-check-circle"
                  size="xs"
                ></q-icon>
                <q-icon
                  color="warning"
                  v-if="plan.detail.feed != 'true'"
                  name="mdi-close-circle"
                  +size="xs"
                ></q-icon>
              </div>
              <div class="col-9">
                <p class="feature">Product Feed</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <q-icon
                  color="positive"
                  v-if="plan.detail.Plugins == 'true'"
                  name="mdi-check-circle"
                  size="xs"
                ></q-icon>
                <q-icon
                  color="warning"
                  v-if="plan.detail.Plugins != 'true'"
                  name="mdi-close-circle"
                  size="xs"
                ></q-icon>
              </div>
              <div class="col-9">
                <p class="feature">Shopify/WooCommerce Plugins</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <q-icon
                  color="positive"
                  v-if="plan.detail.excel == 'true'"
                  name="mdi-check-circle"
                  size="xs"
                ></q-icon>
                <q-icon
                  color="warning"
                  v-if="plan.detail.excel != 'true'"
                  name="mdi-close-circle"
                  size="xs"
                ></q-icon>
              </div>
              <div class="col-9">
                <p class="feature">Download Catalogs</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <q-icon
                  color="positive"
                  v-if="plan.detail.inventory == 'true'"
                  name="mdi-check-circle"
                  size="xs"
                ></q-icon>
                <q-icon
                  color="warning"
                  v-if="plan.detail.inventory != 'true'"
                  name="mdi-close-circle"
                  size="xs"
                ></q-icon>
              </div>
              <div class="col-9">
                <p class="feature">Inventory</p>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <q-icon
                  color="positive"
                  v-if="plan.detail.aPI == 'true'"
                  name="mdi-check-circle"
                  size="xs"
                ></q-icon>
                <q-icon
                  color="warning"
                  v-if="plan.detail.aPI != 'true'"
                  name="mdi-close-circle"
                  size="xs"
                ></q-icon>
              </div>
              <div class="col-9">
                <p class="feature">API</p>
              </div>
            </div>
            </div>
            <q-btn
              outline
              v-if="
                activePlan.plan.id > plan.id && activePlan.plan.name != 'Free'
              "
              color="primary"
              class="full-width"
              label="Contact Support"
              @click="contactSupport"
            />
            <q-btn
              v-if="
                activePlan.plan.id == plan.id && activePlan.plan.name != 'Free'
              "
              outline
              color="primary"
              class="full-width text-white"
              disable
              label="Current Plan"
            />
            <q-btn
              v-if="
                activePlan.plan.id < plan.id || activePlan.plan.name == 'Free'
              "
              outline
              color="primary"
              class="full-width"
              @click="show(plan)"
              label="Upgrade Plan"
            />
            <q-btn
              outline
              v-if="plan.isCustomPlan"
              color="primary"
              class="full-width"
              label="Give us a call"
              to="/contactus"
            />
          </div>
          <div v-if="plan.isCustomPlan">
            <p class="subtitle text-center q-my-sm">Enterprise</p>
            <div class="boxDivEnterPrise">
            <img
              class="desktop-only"
              height="327"
              src="~assets/vectors/chatbot.svg"
              alt="Chatbox"
            />
            </div>
            <q-btn
              outline
              color="primary"
              class="full-width"
              @click="enterprisePlan"
              label="Give us a call"
            />
          </div>
        </div>
      </div>
     
      
    </div>
    <div class="q-pl-sm" v-if="showCard">
      <div class="plan q-pb-lg" @click="goBack">
        <span class="plan"><i class="mdi mdi-chevron-left medium" style="color: black"></i> Back </span></div>
      <div class="text-h6 titleUnderline q-mb-none plan_name" style="margin-left: 20px;">Upgrade Plan - {{selectedPlan.name}}</div>
      <div class="row items-start justify-between">
        <div class="col-4">
          <div class="infoDiv">
  <div class="q-pa-md" style="max-width: 350px">
    <q-list>
      <q-item>
        <q-item-section>
          <span><b> Billing Cycle: </b>Monthly</span>
          </q-item-section>
        <q-item-section avatar>
          <!-- <q-icon color="primary" name="bluetooth" /> -->
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-item-section>License Fee (One Time)</q-item-section>
        <q-item-section side>
          <!-- <q-avatar> -->
            ${{selectedPlan.setupPrice}}
          <!-- </q-avatar> -->
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>Monthly Fee</q-item-section>
        <q-item-section side>
            ${{selectedPlan.monthlyPrice}}
        </q-item-section>
      </q-item>
      <q-item class="borderItemStart no-bb">
        <q-item-section class="text-bold text-dark">Total Amount</q-item-section>
        <q-item-section side>
          <!-- <q-avatar side class="text-bold text-dark"> -->
           <span class="text-bold f-20"> ${{selectedPlan.monthlyPrice + selectedPlan.setupPrice}}</span>
          <!-- </q-avatar> -->
        </q-item-section>
      </q-item>
    <q-item class="borderItemEnd">
        <q-item-section class="f-12">Renews for ${{ selectedPlan.monthlyPrice }} per month</q-item-section>
        <q-item-section side>
            <!-- ${{selectedPlan.monthlyPrice + selectedPlan.setupPrice}} -->
        </q-item-section>
      </q-item>
    </q-list>
  </div>
          </div>
        </div>
        <q-separator vertical inset />
        <div class="col-7 justify-center items-center">
          <div class="q-pa-lg">
   <q-form
            ref="basicForm"
            @submit="onCardSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <div class="row items-center q-gutter-md">
              <div class="col">

                 <p class="text-bold text-body2 q-mb-sm q-pb-none">
                  Card Number *
                </p>
                <q-input
                  rounded
                  outlined
                  dense
                  standout
                  placeholder="111111111111111"
                  v-model="cNum"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'CARD NUMBER IS REQUIRED',
                    cardValidation,
                  ]"
                  mask="################"
                  @keyup="cardShow(cNum)"
                >
                 <template v-if="card.length>0" v-slot:append>
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
                <q-input
                  rounded
                  outlined
                  dense
                  standout
                   placeholder="John Doe"
                  v-model="cName"
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
                <p class="text-bold text-body2 q-mb-sm q-pb-none">
                   Expiry Month/Year *
                </p>
                <q-input
                  rounded
                  outlined
                  dense
                  standout
                  placeholder="01/01"
                  mask="##/##"
                  ref="cMonthRef"
                  v-model="cMonth"
                 :rules="[
                    (val) =>
                      (val && val.length > 0) || 'MONTH/YEAR IS REQUIRED',
                      expiryDateValidation
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="cDateProxy"
                        v-if="!toggleDatePicker"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          minimal
                          :emit-immediately="true"
                          default-view="Years"
                          mask="MM/YY"
                          v-model="cMonth"
                          @update:model-value="checkValueDate"
                          @click="clearDate"
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
                </q-input>
              </div>
              <div class="col">
                <p class="text-bold text-body2 q-mb-sm q-pb-none">CVV *</p>
                <q-input
                  rounded
                  outlined
                  dense
                  standout
                   placeholder="123"
                  v-model="cvvNumber"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'CVV IS REQUIRED',
                    cvvValidation,
                  ]"
                  mask="####"
                />
              </div>
            </div>
            <div class="col-12 text-right">
              <q-btn
                type="submit"
                color="primary"
                rounded
                outlined
                standout
                class="q-ml-md"
                label="MAKE PAYMENT"
              />
            </div>
          </q-form>

          </div>
          <!-- <div class="text-center">
            <img
              class="desktop-only"
              src="~assets/vectors/checkout.svg"
              alt="Address"
            />
          </div> -->
        </div>
      </div>
    </div>

     <div v-if="paymentcard">
    <div class="row loginDiv justify-center items-center h-1">
      <div class="col-6">
        <div class="row h-100 items-center justify-center">
          <div class="col-6">
            <div class="confirmation-email">
              <div class="my-card container-box">
                <q-card-section class="text-center text-container">
                  <img class="email-image" src="~assets\images\payment-success.gif" />
                  <h1 class="text-h3 text-bold q-mt-xs q-mb-lg">Success!</h1>
                  <p class="q-mb-md text-bold">
                 Your payment has been processed successfully
                  </p>
                
                   <p class="q-mb-md text-normal">
                You will get Logged out in <span class="text-bold"> {{seconds}} Seconds </span>
                  </p>
                </q-card-section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     </div>
      <div 
      class="row q-pt-xl q-mt-lg q-mx-lg"
      v-show="showSkeleton">
        <div 
        class="col-3"
              v-for="n in 8" :key="n">
        <q-item style="max-width: 300px">
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text"></q-skeleton>
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="65%"></q-skeleton>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item style="max-width: 300px">
     

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text"></q-skeleton>
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="90%"></q-skeleton>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item style="max-width: 300px">
     

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" width="35%"></q-skeleton>
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text"></q-skeleton>
        </q-item-label>
      </q-item-section>
    </q-item>
      </div>
      </div>
  </div>
</template>

<script>
import { LocalStorage, useQuasar, QSpinnerClock, Loading } from "quasar";
import { ref, computed, reactive, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
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
    const selectedPlan = ref({});
    const router = useRouter();
    let activeAccountData = ref(null);
    const planDetails = ref(null);
    const activePlan = ref(null);
    const showCard = ref(false);
    const paymentcard = ref(false);
    const toggleDatePicker = ref(false);
    const showSkeleton = ref(true);
    //For card
    const cMonthRef = ref(null);
    const cMonth = ref(null);
    const ccv = ref(null);
    const cvvNumber = ref(null);
    const cNum = ref(null);
    const cName = ref("");
    let user = ref("");
    let card=ref("");
    let email=ref(null);
    let planName=ref(null);
    let registeredDate=ref(null);
    let formatDate=ref(null);
    let seconds = ref(5);
    let cards={
      "Visa":"https://ccmweb.blob.core.windows.net/linesheetspro/images/visa-logo.svg",
      "Mastercard":"https://ccmweb.blob.core.windows.net/linesheetspro/images/mastercard-logo.svg",
      "Amex":"https://ccmweb.blob.core.windows.net/linesheetspro/images/american-express-logo.svg"
    };
    const enterprisePlan=()=>{
      localStorage.setItem('secondary_source',"CCMEP");
      router.push('/contactus')
    }
    const contactSupport=()=>{
      localStorage.setItem('secondary_source',"CCMCU");
      router.push('/contactus')
    }

    const planAutoLogout = () => {
      let n = 5
      const intervalTime = setInterval(() => {
        if(n === 1){
                seconds.value=n
              
          clearInterval(intervalTime)
          router.push('/login')
        }
        n -= 1
        seconds.value = n
      }, 1000)

    }


    const onCardSubmit = () => { 
       Loading.show({
        spinner: QSpinnerClock,
        spinnerColor: "indigo",
      })     
      let date=new Date();
      registeredDate.value=getFormattedDate(date);
      formatDate.value=new Date(registeredDate.value).getTime();
      planName.value=selectedPlan.value.name;
      let accountData = $store.getters["auth/getAccountData"];
      let firstName = user.value;
      let expireYear = cMonth.value.split("/")[1]
      let cardDetails = {
        accountID: parseInt(localStorage.getItem("accountId")),
        emailAddress: accountData.email,
        creditCard: {
          expirationMonth: cMonth.value.split("/")[0],
          expirationYear: expireYear,
          cvv: cvvNumber.value,
          creditCardNumber: cNum.value,
        },
        firstName: firstName,
        lastName: firstName,
        plan: {
          planID: selectedPlan.value.id,
          programID: parseInt(LocalStorage.getItem("pID")),
          setupPrice: selectedPlan.value.setupPrice,
          monthlyPrice: selectedPlan.value.monthlyPrice,
        },
      };
      if(accountData.plan.name == "Free"){
        $store.dispatch("auth/payment", cardDetails).then((val) => {
          Loading.hide()
          if (val.status == "active") {
            let data = {
              planID: selectedPlan.value.id,
            };
            $store.dispatch("auth/getPlanDetails", data);
            contactApi()
             showCard.value = false;
             paymentcard.value = true;
             planAutoLogout()
            //   $q.notify({
            //   color: "positive",
            //   position: "top",
            //   classes: "notifyClass",
            //   message: "You will be logged out",
            //   timeout: 1500,
            // });
            // localStorage.clear();
        //      setTimeout(()=>{
          
        // },1000)
            // router.push('/successful')
          
          } else {
            $q.notify({
              color: "negative",
              position: "top",
              classes: "notifyClass",
              message: "Payment failed. Please try again",
              timeout: 1000,
            });
          }
        });
      }
      else{
        $store.dispatch("auth/updatepayment", cardDetails).then((val) => {
          Loading.hide()
          if (val.status == "active") {
            let data = {
              planID: selectedPlan.value.id,
            };
            $store.dispatch("auth/getPlanDetails", data);
             contactApi()
              showCard.value = false;
              paymentcard.value = true;
              planAutoLogout()
            //   $q.notify({
            //   color: "positive",
            //   position: "top",
            //   classes: "notifyClass",
            //   message: "You will be logged out",
            //   timeout: 1500,
            // });

          
            // localStorage.clear();
        //     setTimeout(()=>{
             
        //    router.push('/login')
        // },1000)
            //  router.push('/successful')
             
          } else {
            $q.notify({
              color: "negative",
              position: "top",
              classes: "notifyClass",
              message: "Payment failed. Please try again",
              timeout: 1000,
            });
          }
        });
      }
    };


    const kFormatter = (num) => {
     if(num > 999 && num < 1000000){
        return (num/1000).toFixed(0) + 'K';
    }else if(num >= 1000000){
        return (num/1000000).toFixed(0) + 'M';
    }else if(num < 900){
        return num;
    }
    };

    const goBack = () => {
      showCard.value = false
    }
          const getFormattedDate=(date)=>{
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
      return  year+ '-' + month + '-' + day ;
      }
       const contactApi=()=>{
        let data={
          properties:{
            email:email.value,
            ccm_plan:`CCM - ${planName.value}`,
            ccm_plan_date:formatDate.value,
            hs_analytics_source:"REFERRALS",
            contact_lead_source:"Catalog Communication Manager"
          }
        }
        $store.dispatch('auth/contactapi',data).then(val=>{
        if(val == "Success"){

        } else{
       let payload={
         data:data,
         val:val
       }
       $store.dispatch('auth/updatecontactapi',payload).then(val=>{
        if(val == "Success"){

        }
       })
      }
    })
  }
    onBeforeMount(async () => {
      activeAccountData.value = $store.getters["auth/getAccountData"];
      $store.dispatch("auth/getPlansForPayment").then((val) => {
        planDetails.value = val;
        showSkeleton.value = false
      });
      $store.dispatch("auth/getAccount").then((val) => {
        activePlan.value = val;
        email.value=val.email;
      });
      let payload = localStorage.getItem("userId");
      let result = await $store.dispatch("common/getUser", payload);
      user.value = result[0].name;
    });
    return {
      card,
      cards,
      planDetails,
      activePlan,
      selectedPlan,
      activeAccountData,
      cMonth,
      cMonthRef,
      cName,
      cNum,
      ccv,
      cvvNumber,
      onCardSubmit,
      showSkeleton,
      user,
      showCard,
      toggleDatePicker,
      kFormatter,
      goBack,
      enterprisePlan,
      contactSupport,
      contactApi,
      planAutoLogout,
      seconds,
      email,
      planName,
      paymentcard,
      registeredDate,
      formatDate,
      getFormattedDate,
      show(plan) {
        showCard.value = true;
        selectedPlan.value = plan;
      },
      cardValidation(val) {
        let cradName = isValid(val);
        if (cradName) {
          return isValid;
        } else {
          return "CARD IS NOT VALID";
        }
      },
      cardShow(val){
        card.value = "";
        let cardType =  getCreditCardNameByNumber(val)
        if(cards.hasOwnProperty(cardType)){
          card.value=cards[cardType]
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
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  
  .planTitle{
         
          position: relative;
          &::before {
            content: "";
            position: absolute;
            left: 5%;
            bottom: 15px;
            width: 80px;
            height: 3px;
            transform: skew(-12deg) translateX(-50%);
            background: $primary;
            z-index: -1;
          }
        }
  .planDiv {
    .planSingle {
      width: 22%;
      border-radius: 2%;
      padding: 15px;
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.05);
      }
    }
    .normal {
      height: 540px;
      box-shadow: 0 0 10px -5px rgb(23 54 71 / 30%);
      .subtitle {
        color: $subtitle-font;
        font-size: 18px;
      }
      .priceFont {
        color: $dark-font;
        font-size: 30px;
        font-weight: bold;
      }
      .boxDiv{
        min-height: 300px;
        .para {
        color: $para-plan;
      }
      .feature {
        color: $feature;
      }
      }
    }
    .active {
      background: $primary;
      color: white;
      height: 540px;
      margin-top: -20px;
      box-shadow: 0 0 10px -5px $primary;
      .subtitle {
        font-size: 18px;
      }
      :deep(.q-icon) {
        color: $white !important;
      }
      .priceFont {
        font-size: 30px;
        font-weight: bold;
      }
      .setup-priceFont {
        font-size: 15px;
        font-weight: normal;
      }
    }
  }
}

.loginDiv {
  height: 91vh;
  .container-box {
    margin: 0;
    box-shadow: 0px 0px 16px 2px #6459b37d;
    background: #fff;
    border-radius: 1em;
  }

  .logo {
    height: 40px;
  }
}

.confirmation-email {
  display: flex;
  justify-content: center;
  align-items: center;

  .my-card {
     min-width: 400px;
    .email-heading {
      margin-bottom: 20px;
    }
    .resend-email-text {
      text-decoration: underline;
    }

  }
}

.plan {
  cursor: pointer;;
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin-left: 7px;
}

.plan_name {
  padding-top: 14px;
   padding: 30px 0 8px;
  background-size: 1px 1em;
  box-shadow: $primary-border;
  display: inline;
}

.q-item {
    padding: 4px 12px;
}
.borderItemStart{
  background: #f1f0fc;
  border-start-end-radius: 5px;
  border-start-start-radius: 5px;
  border: 1px solid #dad6f7;
}
.borderItemEnd{
  background: #f1f0fc;
  border-end-end-radius: 5px;
  border-end-start-radius: 5px;
  border: 1px solid #dad6f7;
}
.no-bb{
  border-bottom: unset;
}
.boxDivEnterPrise{
  min-height: 382px;
}
.info-text {
  min-height: 42px;
}
</style>
