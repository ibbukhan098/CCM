<template>
  <q-layout view="hHh lpR fFf">
    <div class="row loginDiv h-2">
      <div class="col-xs-12 col-md-6">
        <div class="row items-center justify-center">
          <div class="col-xs-10 col-md-8">
              <div v-if="isRegistered">
                 <q-form
              ref="basicForm"
              @submit="onRegisterSubmit"
              class="q-gutter-md"
              autocorrect="off"
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
            >
              <div class="loginDiv h-2">
                <img
                  class="logo q-mt-lg"
                  src="https://ccmweb.blob.core.windows.net/ccm/Um-Full.svg"
                  alt="SellersCommerce"
                />
                <p class="text-h6 text-bold q-mt-lg q-mb-sm q-pb-none">
                  Start your free trial
                </p>
                <p class="text-body2 q-pt-none light-text">
                  Welcome, please register your account.
                </p>
                <q-separator />
                <div class="row q-gutter-lg">
                  <div class="col-xs-11 col-md-5">
                    <p class="q-mt-lg text-bold text-body2 q-mb-sm q-pb-none">
                      Firstname*
                    </p>
                    <q-input
                      rounded
                      outlined
                      dense
                      v-model="firstName"
                      standout
                      placeholder="John"
                      maxlength="100"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'FIRSTNAME IS REQUIRED',
                        (val) =>
                          val.split(' ').length <= 1 ||
                          'SPACES ARE NOT ALLOWED',
                      ]"
                    ><div style="display:none">df</div></q-input>
                  </div>
                  <div class="col-xs-11 col-md-5 last-name">
                    <p class="q-mt-lg text-bold text-body2 q-mb-sm q-pb-none">
                      Lastname*
                    </p>
                    <q-input
                      rounded
                      outlined
                      dense
                      v-model="lastName"
                      maxlength="50"
                      standout
                      placeholder="Doe"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'LASTNAME IS REQUIRED'
                      ]"
                    ><div style="display:none">df</div></q-input>
                  </div>
                </div>
                <div class="row q-gutter-lg">
                  <div class="col-xs-11 col-md-5">
                    <p class="q-mt-sm text-bold text-body2 q-mb-sm q-pb-none">
                      Email*
                    </p>
                    <q-input
                      rounded
                      outlined
                      dense
                      v-model="email"
                      autocomplete="off"
                      maxlength="100"
                      autocapitalize="off"
                      standout
                      placeholder="example@domain.com"
                      :rules="[
                        (val) => !!val || 'EMAIL IS REQUIRED',
                        isValidEmail,
                      ]"
                    ><div style="display:none">df</div></q-input>
                  </div>
                  <div class="col-xs-11 col-md-5 relative-position last-name">
                    <p class="q-mt-sm text-bold text-body2 q-mb-sm q-pb-none">
                      Password*
                    </p>
                    <q-input
                      rounded
                      outlined
                      dense
                      standout
                      placeholder="************"
                      autocomplete="new-password"
                      maxlength="50"
                      v-model="rpassword"
                      :type="risPwd ? 'password' : 'text'"
                      @keyup="checkPassword"  
                      @blur="showPassDiv = false"
                      lazy-rules
                      :rules="[
                        (val) => !!val || 'PASSWORD IS REQUIRED',
                        strongPassword                       
                      ]"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="risPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          size="16px"
                          @click="risPwd = !risPwd"
                        ></q-icon>
                      </template>                      
                    </q-input>
                     <q-list class="box-shadow passdivPosition" v-if="showPassDiv">
                          <q-item :class="charPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="charPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px"/>
                            </q-item-section>
                            <q-item-section class="f-12">8 Characters</q-item-section>
                          </q-item>

                          <q-item :class="numPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="numPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Number</q-item-section>
                          </q-item>

                          <q-item :class="casePass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="casePass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Uppercase</q-item-section>
                          </q-item>
                           <q-item :class="caseLPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="caseLPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains LowerCase</q-item-section>
                          </q-item>                         
                        </q-list>
                  </div>
                </div>
                <q-btn
                  color="primary"
                  type="submit"
                  size="md"
                  padding="xs sm"
                  class="full-width q-mt-md"
                  rounded
                  label="Register for free"
                />
                <p class="text-bold text-body2 q-my-lg">
                  <span>Already Have An Account? </span>
                  <a
                    href="/login"
                    class="cp text-bold text-body2 linkText"
                    >Login</a
                  >
                </p>
              </div>
                </q-form>
              </div>

            <div v-else class="confirmation-email">
              <div class="my-card" id="confirmationTracker">
                <q-card-section class="text-center">
                  <img class="email-image" src="~assets/images/email-icon.svg"/>
                  <h1 class="text-h5 text-bold q-mb-lg">Email Confirmation</h1>
                  <p class="q-mb-lg">
                  Thank you for registering with Catalog Manager.
                  <br />
                  Please validate your email by clicking on the link that is sent to your registered email.
                  </p>
                  <hr color="#E1E1E1" class="q-mb-sm"/>
                  <p class="q-mt-md ">If you didn't recieve any email
                 <a class="resend-email-text"  @click="resendMail">
                      Resend email notification</a>
                      </p>
                  <div v-if="resendSuccess" class="link-sent">
                   <p>Link sent sucessfully</p>
                  <img class="q-mt-md" src="~assets/images/sentsuccess.gif" alt="Computer man" style="height: 34px; width: 40px; margin-top: -8px;">
                  </div>
                </q-card-section>
              </div>
            </div>
          </div>
          <div class="col-xs-10 col-md-8 desk-footer">
            <p class="f-12 text-center q-pt-lg q-mt-xs">
              <span class="copyrights-content">© Copyright {{ year }} </span>
              <span class="powered-by">
                    Catalog Manager | Powered by
                    <a
                      href="https://www.sellerscommerce.com/"
                      target="_blank"
                      style="cursor: pointer; color: #161616"
                      >SellersCommerce</a
                    >
                  </span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-6 bg-primary text-center mobile-img-hide">
        <div class="row items-center justify-center" style="height: 100%">
            <slider></slider>
           
        </div>
      </div>
    </div>
    <div class="mobile-footer">
      <p class="f-12 text-center q-pt-lg q-mt-xs">
              <span class="copyrights-content">© Copyright {{ year }}
              </span>
              <span class="powered-by">
                Catalog Manager | Powered by
                <a href="https://www.sellerscommerce.com/" target="_blank"
                  style="cursor: pointer; color: #161616">SellersCommerce</a>
              </span>
            </p>
    </div>
  </q-layout>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
   
    slider: require("src/components/features/auth/authslider.vue")
      .default,
  },
  setup() {
    onBeforeMount(() => {
      $store.dispatch("auth/getProgramID", window.location.origin);
    });
    const remember = ref(false);
    const $store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    const showPass = ref(false);
    const firstName = ref(null);
    const lastName = ref(null);
    const risPwd = ref(true);
    const email = ref(null);
    const rpassword = ref(null);
    const active = ref(false);
    const isRegistered=ref(true);
    const resendSuccess=ref(false)
    const registeredDate=ref(null);
    let formatDate=ref(null)
    const charPass = ref(false);
    const numPass = ref(false);
    const casePass = ref(false);
    const charCPass = ref(false);
    const numCPass = ref(false);
    const caseCPass = ref(false);
    const caseLPass = ref(false);
    const caseLCPass = ref(false);    
    const specialCCharPass = ref(false);
    const isConfirmPasswordValid = ref(false)
    const isPasswordValid = ref(false)
    const showPassDiv = ref(false);
    let signUpDetails = reactive({});
    let year = ref(new Date().getFullYear());
    const resendMail = async() =>{
    let data={
      username:email.value,
      password:rpassword.value,
      programID:1
    }
       const resend= await $store.dispatch("auth/resendMails", data)
     if(resend){
         resendSuccess.value= resend
               setTimeout(() =>{
         resendSuccess.value= false
        }, 10000)
       }
    }
    const onRegisterSubmit = async ($event) => {
      let date=new Date();
      registeredDate.value=getFormattedDate(date);
      formatDate.value=new Date(registeredDate.value).getTime()
      let userData = { programID: 1, type: 1, value: email.value };
      let isEmailExist = await $store.dispatch("auth/validateUser", userData);
      if (isEmailExist) {
        $q.notify({
          type: "negative",
          position: "top",
          message: "Email already exists",
          timeout: 3000,
        });
        return;
      }
      signUpDetails = {
        account: {
          programID: parseInt(localStorage.getItem("pID")),
          name: firstName.value + " " + lastName.value,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: rpassword.value,
          companyURL: "",
        },
      };

      $store.dispatch("auth/createUser", signUpDetails).then((response) => {
          isRegistered.value=false
          contactApi()
        // if (response) {
        //   $q.notify({
        //     type: "positive",
        //     position: "top",
        //     message: "Your trial period started",
        //     timeout: 2000,
        //   });
        //   $store
        //     .dispatch("auth/login", {
        //       userName: signUpDetails.account.email,
        //       password: signUpDetails.account.password,
        //     })
        //     .then((val) => {
        //       if (val == "success") {
        //         router.push("/");
        //       }
        //     });
        // } else {
        //   $q.notify({
        //     color: "negative",
        //     position: "top",
        //     message: "Payment failed. Please try again",
        //     timeout: 1000,
        //   });
        // }
      });
    };

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
            firstname:firstName.value,
            lastname:lastName.value,
            email:email.value,
            website: "",
            hs_analytics_source:"REFERRALS",
            contact_lead_source:"Catalog Communication Manager",
            secondary_lead_source:"CCMNC",
            ccm_plan:"CCM - Free",
            ccm_plan_date:formatDate.value
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
    const loginAccount=()=>{
        router.push('/login')
    }
    return {
      slide: ref(1),
      autoplay: ref(true),
      year,
      remember,
      firstName,
      email,
      lastName,
      rpassword,
      risPwd,
      active,
      onRegisterSubmit,
      isRegistered,
      showPass,
      loginAccount,
      resendMail,
      resendSuccess,
      contactApi,
      registeredDate,
      getFormattedDate,
      formatDate,
      charPass,
      numPass,
      casePass,
      charCPass,
      numCPass,
      caseCPass,
      caseLPass,
      caseLCPass,
      specialCCharPass,
      isPasswordValid,
      isConfirmPasswordValid,
      showPassDiv,
      checkPassword() {
      showPassDiv.value = true;
      let charPassword = rpassword.value.length;
			const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;			
      if (charPassword >= 8) {
        charPass.value = true;
      } else {
        charPass.value = false;
			}			
      numPass.value = /\d/.test(rpassword.value);
      casePass.value = /[A-Z]/.test(rpassword.value);
      caseLPass.value = /[a-z]/.test(rpassword.value);
      
      if (charPass.value === true &&
					casePass.value === true &&
          caseLPass.value === true &&
					numPass.value === true) {
						isPasswordValid.value = true;			
      } else {
        isPasswordValid.value = false;
      }
    },
      strongPassword(val) {
        let password_length = val.length;
        const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        let contains_number = /\d/.test(val);
        let contains_uppercase = /[A-Z]/.test(val);
        let contains_lowercase = /[a-z]/.test(val)
        if (!contains_number) {
          numPass.value = false
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE NUMBER";
        }
        if (!contains_uppercase) {
          casePass.value = false
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE UPPER CASE";
        }
        else{
          casePass.value = true
        }
        if (!contains_lowercase) {
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE LOWER CASE";
        }
        if(password_length < 8){
          charPass.value = false
          return "PASSWORD SHOULD BE ATLEAST 8 CHARACTERS IN LENGTH"
        }
        else{          
          charPass.value = true
        }

        if (
          contains_uppercase === true &&
          contains_number === true
        ) {
          return true;
        } else {
          return false;
        }
      },
      isValidUrl(val) {
        const urlPattern =
          /^((ftp|http|https):\/\/)?(www.)(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
        return urlPattern.test(val) || "INVALID URL";
      },
      noSpacialChars(val) {
        const usernamepattern = /[~`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
        return !usernamepattern.test(val) || "USERNAME IS NOT VALID";
      },
      isValidEmail(val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || "INVALID EMAIL";
      },
      isValidateDomain(val) {
        var domain =
          /.+@(gmail|yahoo|gmx|aol|icloud|mailfence|outlook|hotmail|livemail)\.(com|net|in)$/;
        return !domain.test(val) || "ENTER YOUR BUSINESS EMAIL";
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.h-1 {
  height: 92vh;
}
.h-2 {
  height: 92vh;
}
.loginDiv {
  position: relative;
  .container-box {
    width: 100%;
    position: absolute;
    margin: 0;
    top: 10%;
  }
  .logo {
     width: 220px;
    // height: 35px;
  }
  .light-text {
    font-size: 12px;
    color: #605b79;
  }
  .linkText {
    &:hover {
      text-decoration: underline;
    }
  }
}

.mt-50 {
  margin-top: 80px;
}
.pt-50 {
  padding-top: 10%;
}
.pt-30 {
  padding-top: 30%;
}
.h-100 {
  height: 100%;
}
.confirmation-email{
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .my-card{
    padding: 100px;
      .email-heading{
        margin-bottom: 20px;
      }
      .email-image{
      max-height: 150px;
      max-width: 150px;
      margin-bottom: 25px;
    }
    .resend-email-text{
      text-decoration: underline;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.link-sent{
  display:flex;
  justify-content:center;
  margin-top:8px;
   margin-left: 32px;
}
.q-carousel {
  background: none;
  width: 100%;
  height: auto;
  img{
    // width:60%;
    height:380px;
  }
  
}
.slider-text {
  width: 50%;
  margin: 0 auto;
  height:170px;
}
.mobile-footer{
  display: none;
}
@media screen and (max-width:1023px) {
.loginDiv{
 height:auto;
  .container-box{
    position: static;
  }
}
// .mobile-img-hide{
//     display:none;
//   }
.h-1{
    height: auto !important;
  }
.last-name, .confirm-password, .website-url{
  margin-top :0;
}
.last-name .q-mt-lg {
    margin-top: 8px;
}
.desk-footer{
    display: none;
  }
  .mobile-footer{
  display: block;
}
}
@media screen and (max-width:766px) {
  .q-carousel {
  img{
    
  height:170px;

  }
  .slider-text {
  width: 80%;
  margin: 0 auto;
  height: 210px;
}
}
}
</style>
