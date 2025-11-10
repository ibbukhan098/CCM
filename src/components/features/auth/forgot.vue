<template>
<q-layout>
  <div class="row">
    <div class="col-md-7">
      <div class="bannerDiv row q-pa-xl justify-center" style="margin-top: 10px;  margin-left: 100px">
           <div class="col-md-12 text-white" >
             <p class="text-h3 q-p-none">
               Reset Your Password.
             </p>
           </div>
           <div class="col-md-12 q-pt-xl" style="text-align: center;" >
             <img src="~assets/vectors/forgot.svg" alt="Login_banner">
           </div>
      </div>
    </div>
    <div class="col-md-5 bg-white"  style="margin-top: 115px;">
       <div class="q-pa-xl">
       <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md "
    >
    <p class="text-h6 text-primary" v-if="!isOnlyMail">Change Your Password</p>
    <p class="text-h6 text-primary" v-if="isOnlyMail">Enter Username</p>
    <q-input v-if="isOnlyMail"
        rounded outlined     standout placeholder="example@gmail.com"
        
        v-model="userName"
      
        lazy-rules
        :rules="[ val => !!val || 'EMAIL IS REQUIRED' ]"
      /> 
      <q-input v-if="!isOnlyMail"
       rounded outlined standout
        ref="passwordRef"
        type="password"
        v-model="password"
        label="Password *"
        lazy-rules
        :rules="[
          val => !!val || 'PASSWORD IS REQUIRED',
          val => val.length >=  5 || 'PASSWORD SHOULD BE ATLEAST 8 CHARACTERS IN LENGTH',strongPassword
        ]"
      >
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
     <q-input v-if="!isOnlyMail"
      rounded outlined standout
        ref="cpasswordRef"
        type="password"
        v-model="cpassword"
        label="Confirm Password *"
        lazy-rules
        :rules="[
        val=> val == password || 'PASSWORD AND CONFIRM PASSWORD MUST BE SAME',
        val => !!val || 'PASSWORD IS REQUIRED',
        val => val.length >=  5 || 'PASSWORD MINIMUM OF 5 CHARACTERS',
        ]"
      />
      <div>
       <q-btn label="Submit"
       rounded outlined standout
        class="full-width" type="submit" color="primary"/>
       </div>
      <div class="q-pt-sm">
          <p class="">
           <router-link to="/login" v-if="isOnlyMail">Login Now</router-link>
         </p>
      </div>
         </q-form>
  </div>
    </div>
  </div>
  </q-layout>

</template>

<script>
import { useQuasar,Notify } from 'quasar'
import { useRoute,useRouter } from 'vue-router'
import { ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { api } from 'boot/axios'

export default {
  setup () {
    const $route=useRoute()
    const router = useRouter()
    const $store = useStore()
    const $q = useQuasar()
    const cpasswordRef = ref(null)
    const cpassword = ref(null)
    const passwordRef = ref(null)
    const password = ref(null)
    const userName = ref(null)
    const isOnlyMail = ref(true)
    onBeforeMount(() => {
      ($route.params.username)?isOnlyMail.value=false:"";
    });
    return {     
      cpassword,
      cpasswordRef,
      password,
      userName,
      passwordRef,
      isOnlyMail,      
      isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'INVALID EMAIL';
       }, 
        strongPassword(val) {
        let password_length = val.length;
        const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        let contains_number = /\d/.test(val);
        let contains_uppercase = /[A-Z]/.test(val);
        let contains_special_character = format.test(val);
        if (!contains_number) {
          return "INCLUDE THE NUMBER";
        }
        if (!contains_uppercase) {
          return "INCLUDE THE UPPER CASE";
        }
        if (!contains_special_character) {
          return "INCLUDE THE SPECIAL CHARACTERS";
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
      onSubmit () {
       if(isOnlyMail.value){
                $store.dispatch('auth/sendResetMail', {
                  programId:1,
                  userData : userName.value
                  
                }).then((response) => { 
          if(response == "success"){       
          router.push('/')
          }
          else{
             Notify.create({
                type: 'negative',
                position: 'top',
                message: 'Check your Username',
              })
          }
        })       
       }
       else{
         let data={
              programId:1,
              code:$route.params.username,
              newPassword:password.value,           
             }
                let value=$store.dispatch('auth/forgotPassword',data)   
                if(value){
                   Notify.create({
                  type: 'positive',
                position: 'top',
                message: 'Password has been changed successfully.',
              })
                   router.push('/')
                }
                else{
                   Notify.create({
                  type: 'negative',
                  position: 'top',
                  message: 'Check',
              })
                router.push('/')

                }             
       }      
         
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