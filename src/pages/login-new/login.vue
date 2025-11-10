<template>
  <q-layout view="hHh lpR fFf">
    <div class="row loginDiv h-1">
      <div class="col-xs-12 col-md-6">
        <div class="row h-100 items-center justify-center">
          <div class="col-xs-10 col-md-6">
            <div v-if="isValidate">
              <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <div class="loginDiv h-1">
                  <div class="container-box">
                    <img class="logo q-mt-xl q-mt-xs" src="https://ccmweb.blob.core.windows.net/ccm/Um-Full.svg"
                      alt="SellersCommerce" />
                    <p class="text-h6 text-bold q-mt-lg q-mb-sm q-pb-none">Login</p>
                    <p class="text-body2 q-pt-none light-text">
                      Welcome, please login to your account.
                    </p>
                    <q-separator />
                    <div>
                      <p class="q-mt-md text-bold text-body2 q-mb-sm q-pb-none">
                        Username
                      </p>
                  
                  <q-input
                    rounded
                    outlined
                    dense
                    v-model="username"
                    standout
                    placeholder="example@domain.com"
                    maxlength="50"
                    type="text"
                    lazy-rules
                    :rules="[(val) => !!val || 'USERNAME IS REQUIRED', isValidEmail]"
                  >
                  <div style="display:none">df</div>
                  </q-input>

                    </div>
                    <div>
                      <p class="q-mt-xs text-bold text-body2 q-mb-sm q-pb-none">
                        Password
                      </p>
                      <q-input rounded outlined dense v-model="password" standout placeholder="***************"
                        maxlength="30" lazy-rules :type="isPwd ? 'password' : 'text'"
                        :rules="[(val) => !!val || 'PASSWORD IS REQUIRED']">
                        <template v-slot:append>
                          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" size="16px"
                            @click="isPwd = !isPwd"></q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class="row items-center q-mt-none q-mb-md">
                      <!-- <div class="col-6 text-bold text-body2 text-left">
                                        <q-checkbox v-model="remember" label="Remember Me" />
                                    </div> -->
                      <div class="col-6">
                        <a href="/forgot" class="linkText text-bold text-body2">Forgot Password?</a>
                      </div>
                    </div>
                    <q-btn color="primary" type="submit" size="md" padding="xs sm" class="full-width" rounded
                      label="Login" />
                    <p class="text-bold text-body2 q-mt-lg q-mb-sm">
                      <span>Not Registered Yet? </span>
                      <a href="/signup" class="cp text-bold text-body2 linkText">Create an Account</a>
                    </p>
                  </div>
                </div>
              </q-form>
            </div>
            <div v-else class="confirmation-email">
              <div class="my-card">
                <q-card-section class="text-center">
                  <img class="email-image" src="~assets/images/shield1.png" alt="email image"/>

                  <h1 class="text-h5 text-bold q-mb-lg">Verify your account</h1>
                  <p class="q-mb-lg">
                    Your email was not verified.
                    <br />
                    Please validate your email by clicking on the link that is sent to your registered email.
                  </p>
                  <hr color="#E1E1E1" class="q-mb-sm" />
                  <p class="q-mt-md text-underline ">If you didn't recieve any email
                    <a class="resend-email-text" @click="resendMail">
                      Resend email notification</a>
                  </p>

                  <div v-if="resendSuccess" class="link-sent">
                    <p>Link sent sucessfully to your mail</p>
                  <img  src="~assets/images/sentsuccess.gif" alt="Success"  style="height: 34px; width: 40px; margin-top: -8px;">
                  </div>
                </q-card-section>
              </div>
            </div>
          </div>



          <div class="col-8 desk-footer">
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
import jwt_decode from "jwt-decode";


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
    const login = ref(true);
    const $store = useStore();
    const $q = useQuasar();
    // const cryoptojs = inject('cryptojs')
    const router = useRouter();
    const route = useRoute();
    const username = ref(null);
    const passwordRef = ref(null);
    const password = ref(null);
    const isPwd = ref(true);
    //Register
    const firstName = ref(null);
    const lastName = ref(null);
    const risPwd = ref(true);
    const isPwd1 = ref(true);
    const email = ref(null);
    const rpassword = ref(null);
    const cpassword = ref(null);
    const companyURL = ref("");
    const isValidate = ref(true);
    const resendSuccess = ref(false)
    let signUpDetails = reactive({});
    let year = ref(new Date().getFullYear());
    const resendMail = async () => {
      let data = {
        username: email.value,
        password: rpassword.value,
        programID: 1
      }
      const resend = await $store.dispatch("auth/resendMails", data)
      if (resend) {
        resendSuccess.value = resend
        setTimeout(() => {
          resendSuccess.value = false
        }, 10000)
      }
    }
    return {
      navPos: ref('bottom'),
      navigationPositions: [
        { value: 'top', label: 'top' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom (default)' },
        { value: 'left', label: 'left' }
      ],

     slide: ref(1),
      autoplay: ref(true),
      year,
      remember,
      login,
      username,
      password,
      passwordRef,
      isPwd,
      isPwd1,
      firstName,
      email,
      lastName,
      rpassword,
      cpassword,
      risPwd,
      companyURL,
      isValidate,
      resendMail,
      resendSuccess,
      onSubmit() {
        let loginForm = {
          userName: username.value,
          password: password.value,
        };
        $store.dispatch("auth/login", loginForm).then((response) => {
          if (response == "success") {
            let token  = localStorage.getItem('token')
            let expiryTime = parseInt(jwt_decode(token).FreeDays)
            if(expiryTime < 0){
                router.push("/account/plan");
            }
            else{
              router.push("/home");
            }
            isValidate.value == true
          } else if (!response.isValidate) {
            isValidate.value = false
          }
        });
      },  
      onRegisterReset() { },
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
        return emailPattern.test(val) || "INVALID USERNAME";
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
    width: 240px;
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

.confirmation-email {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .my-card {
    .email-heading {
      margin-bottom: 20px;
    }

    .email-image {
      max-height: 150px;
      max-width: 150px;
      margin-bottom: 25px;
    }

    .resend-email-text {
      text-decoration: underline;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.link-sent {
  display: flex;
  justify-content: center;
  margin-top: 8px;
  margin-left: 32px;
}


.mobile-footer{
  display: none;
}
@media screen and (max-width:1023px) {
  .loginDiv {

    .container-box {
      position: static;
    }
  }

  // .mobile-img-hide {
  //   display: none;
  // }

  .h-1 {
    height: auto !important;
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
@media (max-height: 600px){
  .loginDiv .container-box{
    top:0 !important;
    height: auto;
  }
  .logo.q-mt-xl.q-mt-xs {
  margin-top: 30px;
}
}




</style>
