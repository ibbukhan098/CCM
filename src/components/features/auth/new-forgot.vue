<template>
  <q-layout view="hHh lpR fFf">
    <div class="row loginDiv">
      <div class="col-xs-12 col-md-6">
        <div class="row h-100 items-center justify-center">
          <div class="col-xs-10 col-md-6">
            <q-form @submit="onSubmit" class="q-gutter-md">
              <div class="loginDiv">
                <div class="container-box">
                  <img
                    class="logo"
                    :class="isOnlyMail ? 'q-mt-xl' : 'q-mt-xs'"
                    src="https://ccmweb.blob.core.windows.net/ccm/Um-Full.svg"
                    alt="SellersCommerce"
                  />
                  <p class="text-h6 text-bold q-mt-xl q-mb-md q-pb-none">
                    Forgot Password
                  </p>
                  <p class="text-body2 q-pt-none light-text" v-if="isOnlyMail">
                    Please enter your username and we'll send you the link to get back to your account.
                  </p>
                  <p class="text-body2 q-pt-none light-text" v-if="!isOnlyMail">
                    Please enter the password so as to get back your account.
                  </p>
                  <q-separator />
                  <div class="q-mb-sm" v-if="isOnlyMail">
                    <p class="q-mt-lg text-bold text-body2 q-mb-sm q-pb-none">
                      Username
                    </p>
                    <q-input
                      rounded
                      outlined
                      dense
                      v-model="userName"
                      standout
                      placeholder="example@domain.com"
                      maxlength="50"
                      lazy-rules
                      :rules="[(val) => !!val || 'USERNAME IS REQUIRED', isValidEmail]"
                    />
                  </div>
                  <div class="q-mb-sm relative-position" v-if="!isOnlyMail">
                    <p class="q-mt-lg text-bold text-body2 q-mb-sm q-pb-none">
                      Password
                    </p>
                    <q-input
                      rounded
                      outlined
                      dense
                      standout
                      placeholder="************"
                      autocomplete="off"
                      ref="passwordRef"
                      maxlength="50"
                      v-model="rpassword"
                      :type="risPwd ? 'password' : 'text'"
                      @keyup="checkPassword"  
                      @blur="showPassDiv = false"
                      lazy-rules
                      :rules="[
                        (val) => !!val || 'PASSWORD IS REQUIRED',
                        (val) =>
                          val.length >= 8 ||
                          'PASSWORD SHOULD BE ATLEAST 8 CHARACTERS IN LENGTH',
                        strongPassword,
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
                          <q-item :class="specialCharPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="specialCharPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Special Character</q-item-section>
                          </q-item>                          
                        </q-list>
                  </div>
                  <div class="q-mb-sm relative-position" v-if="!isOnlyMail">
                    <p class="q-mt-lg text-bold text-body2 q-mb-sm q-pb-none">
                      Confirm Password
                    </p>
                    <q-input
                      rounded
                      outlined
                      dense
                      v-model="cpassword"
                      :type="isPwd1 ? 'password' : 'text'"
                      @keyup="checkConfirmPassword"  
                      @blur="showCPassDiv = false"
                      lazy-rules
                      :rules="[
                        (val) => !!val || 'CONFIRM PASSWORD IS REQUIRED',
                        (val) =>
                          val.length >= 8 ||
                          'PASSWORD SHOULD BE ATLEAST 8 CHARACTERS IN LENGTH',
                        (val) =>
                          val == rpassword ||
                          'PASSWORD AND CONFIRM PASSWORD MUST BE SAME',
                      ]"
                      standout
                      placeholder="************"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd1 ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          size="16px"
                          @click="isPwd1 = !isPwd1"
                        ></q-icon>
                      </template>
                    </q-input>
                    <q-list class="box-shadow passdivPosition" v-if="showCPassDiv">
                          <q-item :class="charCPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="charCPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px"/>
                            </q-item-section>
                            <q-item-section class="f-12">8 Characters</q-item-section>
                          </q-item>

                          <q-item :class="numCPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="numCPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Number</q-item-section>
                          </q-item>

                          <q-item :class="caseCPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="caseCPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Uppercase</q-item-section>
                          </q-item>

                           <q-item :class="caseLCPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="caseLCPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains LowerCase</q-item-section>
                          </q-item>

                          <q-item :class="specialCCharPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="specialCCharPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Special Character</q-item-section>
                          </q-item>                          
                        </q-list>
                  </div>
                  <q-btn
                    color="primary"
                    type="submit"
                    size="md"
                    padding="xs sm"
                    class="full-width"
                    rounded
                    label="Reset Password"
                  />
                  <p class="text-bold text-body2 q-my-lg">
                    <span>Return to </span>
                    <router-link to="/login"
                      >Login</router-link
                    >
                  </p>
                 </div>
              </div>
            </q-form>
          </div>
           <div class="col-8">
               <p class="f-12 text-center q-pt-lg q-mt-xs">
                  <span class="copyrights-content"
                    >© Copyright {{ year }}
                  </span>
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
          <img class="" src="~assets/vectors/forgot.svg" alt="forgot" />
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { useQuasar,Notify } from "quasar";
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    onBeforeMount(() => {
      $route.params.username ? (isOnlyMail.value = false) : (isOnlyMail.value = true);
    });
    const $route = useRoute();
    let year = ref((new Date()).getFullYear());
    const router = useRouter();
    const $store = useStore();
    const $q = useQuasar();
    const cpasswordRef = ref(null);
    const cpassword = ref(null);
    const passwordRef = ref(null);
    const rpassword = ref(null);
    const risPwd = ref(true);
    const isPwd1 = ref(true);
    const userName = ref(null);
    const isOnlyMail = ref(null);
    const charPass = ref(false);
    const numPass = ref(false);
    const casePass = ref(false);
    const specialCharPass = ref(false);
    const charCPass = ref(false);
    const numCPass = ref(false);
    const caseCPass = ref(false);
    const caseLPass = ref(false);
    const caseLCPass = ref(false);
    const specialCCharPass = ref(false);
    const isConfirmPasswordValid = ref(false)
    const isPasswordValid = ref(false)
    const showPassDiv = ref(false);
    const showCPassDiv = ref(false);
    return {
      year,
      userName,
      passwordRef,
      cpasswordRef,
      cpassword,
      rpassword,
      risPwd,
      isPwd1,
      isOnlyMail,
       charPass,
      numPass,
      casePass,
      specialCharPass,
      charCPass,
      numCPass,
      caseCPass,
      caseLPass,
      caseLCPass,
      specialCCharPass,
      isPasswordValid,
      isConfirmPasswordValid,
      showPassDiv,
      showCPassDiv,
      async onSubmit() {
        if (isOnlyMail.value) {
          let val = {
          programID: localStorage.getItem("pID"),
          value : userName.value,
          type : 1
        };
        let result =await $store.dispatch('auth/validateUser',val)
        if (result) {
          $store
            .dispatch("auth/sendResetMail", {
              programId: 1,
              userData: userName.value,
            })
            .then((response) => {
              if (response == "success") {
                router.push("/login");
              } else {
                Notify.create({
                  type: "negative",
                  position: "top",
                  message: "Check Your Username/Email",
                });
              }
            });
        } else {
          isOnlyMail.value = true
          Notify.create({
            type: "warning",
            position: "top",
            message: "User does not exist",
          });
        }
        } else {
          let data = {
            programId: 1,
            code: $route.params.username,
            newPassword: rpassword.value,
          };
          let value = await $store.dispatch("auth/forgotPassword", data);
          if (value == "Expired") {
            Notify.create({
              color: 'negative',
              position: 'top',
              message: 'Reset link expired',
              timeout: 3000
            })
          } 
          else if(value && value != "Expired"){
            Notify.create({
              type: "positive",
              position: "top",
              message: "Password has been changed successfully.",
            });
            router.push("/login");
          }
          else {
            Notify.create({
              type: "negative",
              position: "top",
              message: "Error while resetting the password",
            });
          }
        }
      },
      onRegisterReset() {},
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
			specialCharPass.value = format.test(rpassword.value);
      
      if (charPass.value === true &&
					specialCharPass.value === true &&
					casePass.value === true &&
          caseLPass.value === true &&
					numPass.value === true) {
						isPasswordValid.value = true;			
      } else {
        isPasswordValid.value = false;
      }
    },
    checkConfirmPassword() {
      showCPassDiv.value = true;
      let charPassword = cpassword.value.length;
			const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;			
      if (charPassword >= 8) {
        charCPass.value = true;
      } else {
        charCPass.value = false;
			}			
      numCPass.value = /\d/.test(cpassword.value);
      caseCPass.value = /[A-Z]/.test(cpassword.value);
      caseLCPass.value = /[a-z]/.test(cpassword.value);
			specialCCharPass.value = format.test(cpassword.value);
      
      if (charCPass.value === true &&
					specialCCharPass.value === true &&
					caseCPass.value === true &&
          caseLCPass.value === true &&
					numCPass.value === true) {
						isConfirmPasswordValid.value = true;			
      } else {
        isConfirmPasswordValid.value = false;
      }
    },
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
.loginDiv {
  height: 92vh;
  .container-box{
      width: 100%;
      position: absolute;
      margin: 0;
      top: 10%;
  }
  .logo {
    width: 220px;
    height: auto;
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

@media screen and (max-width:1023px) {
.loginDiv{
 height:auto;
  .container-box{
    position: static;
  }
}
.mobile-img-hide{
    display:none;
  }
.h-1{
    height: auto !important;
  }

}
</style>
