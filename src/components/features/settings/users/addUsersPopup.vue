<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section class="row items-center q-mb-sm">
      <span class="text-h6 titleUnderline">Add User</span>
       <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="q-pt-none">
       <q-form
     @submit="onSubmit" @reset ="onReset"
    >
        <div class="row q-gutter-md q-pb-lg items-center">

    <div class="col">
       <p class="text-bold text-body2 q-mb-sm q-pb-none">Firstname*</p>
      <q-input
        v-model="firstName"
        ref="firstNameRef"
        placeholder="admin"
          rounded outlined dense standout
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'FIRSTNAME IS REQUIRED']"
      />
      </div>
<div class="col">
     <p class="text-bold text-body2 q-mb-sm q-pb-none">Lastname*</p>
      <q-input
       v-model="lastName"
        ref="lastNameRef"
        placeholder="admin"
          rounded outlined dense standout
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'LASTNAME IS REQUIRED']"
      />
      </div>

</div>
        <div class="row q-gutter-md q-pb-lg items-center">
     <div class="col">
     <p class="text-bold text-body2 q-mb-sm q-pb-none">Email*</p>
      <q-input
        v-model="email"
        ref="emailRef"
        placeholder="example@domain.com"
        rounded outlined dense standout
        lazy-rules
        :rules="[ val => !!val || 'EMAIL IS REQUIRED', isValidEmail ]"
      />
      </div>
      <div class="col">
         <p class="text-bold text-body2 q-mb-sm q-pb-none">Role*</p>
          <q-select
            transition-show="flip-up"
            transition-hide="flip-down"
            v-model="role"
            ref="roleRef"
            rounded outlined dense standout
            :options="roleOptions"
            option-label = "name"
            option-value = "id"
            class="col-sm"
            lazy-rules
            :rules="[(val) => !!val ||'SELECT THE ROLE',]"
          />
          </div>
</div>
        <div class="row q-gutter-md q-pb-lg items-center">
<!-- <div class="col">
    <q-input
        filled
        ref="passwordRef"
        type="password"
        v-model="password"
        label="Password *"
        hint="Type your Password"
        lazy-rules
        :rules="[
          val => !!val || '* Required',
          val => val.length >=  8 || 'Please use minimum 8 character',
        ]"
      />
</div> -->
<!-- <div class="col">
 Gender:
        <q-option-group
          ref="genderRef"
          name="preferred_genre"
          v-model="preferred"
          :options="options"
          color="primary"
          inline
        />
</div> -->
<!-- <div class="col">
  <q-input filled
     ref="dateRef"
     v-model="date" mask="date" label="Date of Birth *"
 :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
</div> -->
</div>

      <div align="right">
        <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
         <q-btn class="q-mr-sm" type="reset" label="Reset" rounded outlined standout color="primary"/>
        <q-btn label="Submit"  type="submit"   rounded outlined standout color="primary"/>
      </div>
    </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'


export default {
  setup() {
    const $store = useStore()
    const $q = useQuasar()
    const firstName = ref(null)
    const lastName = ref(null)
    const age = ref(null)
    const accept = ref(false)
    const email = ref(null)
    const userName = ref(null)
    const role = ref(null)
    const firstNameRef = ref(null)
    const lastNameRef = ref(null)
    const emailRef = ref(null)
    const roleRef = ref(null)
    const password = ref(null)
    const phoneNumber = ref(null)
    const companyName = ref(null)
    const companyURL = ref(null)
    const passwordRef = ref(null)
    const genderRef = ref(null)
    const dateRef = ref(null)
    const preferred = ref(0)
    const date = ref('2019/02/01')
    let roleOptions= ref(null)
    onBeforeMount(() => {
      $store.dispatch('common/getRoles');
    })

    const saveUser = async() => {
      $store.dispatch('common/closePrompt',false)
      let userData = {
          email:email.value,
          userName:firstName.value + ' ' + lastName.value
        }
        let result = await $store.dispatch('auth/validateUserdata', userData)
        if (result.userNameStatus == true) {
          $q.notify({
            type: "warning",
            position: "top",
            message: "Username already exists",
            timeout: 2000,
          });
        }
        else if (result.emailStatus == true) {
          $q.notify({
            type: "warning",
            position: "top",
            message: "Email already exists",
            timeout: 2000,
          });
        }
        else {
          let userDetails = {
            id: 0,
            name: firstName.value + ' ' + lastName.value,
            deleted: false,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            status: true,
            roleId: role.value.id,
            isEmailValidated: true,
            profileImage: "",
            isFirstTimeUser: true
          };
          let val = await $store.dispatch('common/createUser', userDetails)
          
          if (val != undefined) {
            role.value = null
            firstName.value = null;
            lastName.value = null;
            email.value = null;
            firstNameRef.value.resetValidation()
            lastNameRef.value.resetValidation()
            emailRef.value.resetValidation()
            roleRef.value.resetValidation()
          }
        }
    }

    return {
      firstName,
      lastName,
      firstNameRef,
      lastNameRef,
      emailRef,
      roleRef,
      age,
      accept,
      email,
      userName,
      password,
      phoneNumber,
      companyName,
      companyURL,
      passwordRef,
      genderRef,
      dateRef,
      role,
      preferred,
      accepted: ref([]),
      shape: ref("line"),
      date: ref("2020/01/01"),
      roleOptions: computed(()=> $store.getters['common/getActiveRoleOptions']),
      role,
      options: [
        {
          label: 'Male',
          value: 0
        },
        {
          label: 'Female',
          value: 1
        },
        {
          label: 'Other',
          value: 2
        }
      ],
      date: ref('2019/02/01'),
      isValidEmail (val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'INVALID EMAIL';
      },
      noSpacialChars(val){
        const usernamepattern = /[~`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
        return !usernamepattern.test(val) || "USERNAME IS NOT VALID";
      },
      isValidateDomain(val){
        var domain = /.+@(gmail|yahoo|gmx|aol|icloud|mailfence|outlook|hotmail|livemail)\.(com|net|in)$/;
        return !domain.test(val) || "ENTER A VALID BUSINESS EMAIL";
      },
      onSubmit () {
        saveUser()
      },
      onReset () {
        role.value = null
        firstName.value = null;
        lastName.value = null;
        email.value = null;
      }
    };
  },
};
</script>
<style lang="scss" scoped>
.titleUnderline{
  padding-top: 0;
}

.q-field--with-bottom {
  padding-bottom: 0px;
}
</style>
