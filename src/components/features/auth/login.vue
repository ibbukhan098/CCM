<template>
  <q-layout>
    <div class="row">
      <div class="col-md-7">
        <div class="bannerDiv row q-pa-xl justify-center">
             <div class="col-md-12 text-white" style="margin-top:20px">
               <p class="text-h3 q-p-none">
                 Start Your Journey.
               </p>
               <!-- <span class="text-light">Lorem Ipsum Dolor Sitm</span> -->
             </div>
             <div class="col-md-12 q-pt-xl" style="text-align: center;">
               <img src="~assets/vectors/login-vector.webp" alt="Login_banner">
             </div>
        </div>
      </div>
      <div class="col-md-5" style="margin-top: 52px;">
         <div class="q-pa-xl">
         <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <!-- <p class="text-h6 text-primary">Login with your details</p> -->
         <q-input
         autocomplete="off"
         outlined        
          v-model="username"
          label=" Email*"
           maxlength="50"
          lazy-rules
          :rules="[ val => !!val || 'USERNAME IS REQUIRED' ]"
        /> 
        <!-- <text-box
        :name.sync="username">
        ref="userName"
        </text-box> -->
        <q-input
         outlined
          ref="passwordRef"
         
          v-model="password"
          label="Password *"
          maxlength="30"
          lazy-rules
        :type="isPwd ? 'password' : 'text'"
          :rules="[
            val => !!val || 'PASSWORD IS REQUIRED',     
                 ]"
        >
         <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                ></q-icon>
          </template>
        </q-input>
        <div>
         <q-btn label="Login" class="full-width" type="submit" color="primary"/>
         </div>
        <div class="q-pt-sm">
           <!-- <p class="light">
             By clicking this sign in button you agree to our terms & conditions
           </p> -->
            <p class="">
             <router-link to="/auth/forgot">Forgot Password</router-link>
           </p> 
         </div>
           </q-form>
         </div>
      </div>
    </div>
    </q-layout>
</template>
  <script>
  import { useQuasar } from 'quasar'
  import { ref, computed, inject } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter, useRoute } from 'vue-router'
  // import VueCryptojs from 'vue-cryptojs'
  
  export default {
    // components:{
    //   'text-box' : require('../../restate/input/textbox').default
    // },
    setup () {
      const $store = useStore()
      const $q = useQuasar()
      // const cryoptojs = inject('cryptojs')
      const router = useRouter()
      const route = useRoute()
      const username = ref(null)
      const passwordRef = ref(null)
      const password = ref(null)
      const isPwd  = ref(true)
      return {    
        username,
        password,
        passwordRef,
        isPwd,
        // cryoptojs,
       onSubmit () {
         let loginForm = {
            userName : username.value,
            password : password.value
           };    
        $store.dispatch('auth/login', loginForm)
        .then((response) => {     
          if(response == "success"){       
          router.push('/')
          }
        })       
        }, 
  
         onReset () {
          // name.value = null
          // age.value = null
          // accept.value = false
        }
      }   
    }
  }
  </script>
  
  
  <style lang="scss" scoped>
  .q-layout{
    min-height: unset !important;
    .bannerDiv{
       margin-top: -50px;
       margin-bottom: -50px;
       background: $primary;
     }
  }   
  </style>