<template>
  <div class="q-pa-md main">
    <div class="row">
      <div class=" col-lg-6 col-md-6 col-sm-12 col-xs-12 doc-example__content">
        <div class="text-h6 titleUnderline " style="margin-left: 12px; padding-bottom: 10px">Profile</div>
      </div>
    </div>
  </div>
  <div class="profile profile-container row">
    <div class="profile-image-container" v-show="showSkeleton">
      <q-skeleton height="300px;" size="100px" type="circle" class="profile-image-container" />
    </div>
      <div class="profile-image-container" v-show="!showSkeleton">
      <div class="avatar-upload">
        <div class="avatar-preview">
          <img id="imagePreview" :src="profileImage" />
          <div class="avatar-edit" v-if="!isProfilePreview">
            <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" @change="previewFile" />
            <label for="imageUpload" class="edit-icon">
              <span></span>
              <span class="custom-upload q-pr-xs">UPLOAD</span>
              <q-icon name="mdi-camera" class="custom-camera" size="16px"></q-icon>
              </label>
                     <q-icon @click="removePic" v-if="isVisible" name="mdi-delete" class="custom-delete cursor-pointer"></q-icon>
            <div v-if="profileImage !='https://ccmweb.blob.core.windows.net/linesheetspro/userProfile/default-profile.png'">
       </div>
            <div>
            </div>
          </div>
          <div class="avatar-edit" v-if="isProfilePreview">
            <div style="display: flex; justify-content: center; align-items: flex-end ; font-weight: 500;">
              <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" @change="previewFile"
                style="border: none" />
              <label for="imageUpload" class="edit-icon" style="border: none">
                <span class="custom-upload"
                  style="background-color: rgba(85,41,198,1); color: #fff; padding: 5px; padding-right: 12px; padding-left: 12px; border-radius: 16px;">UPLOAD</span>
              </label>
              <span
                style="background-color: rgba(85,41,198,1); color: #fff; padding: 5px; padding-right: 18px; padding-left: 18px; margin-bottom: 4px; cursor: pointer; border-radius: 16px;"
                @click="saveProfileImage">SAVE</span>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-container col-4 col-md-6 q-mb-xl">
      <div class="">
        <q-form ref="basicForm" @submit="onProfilesubmit" autocorrect="off" autocomplete="off" autocapitalize="off"
          spellcheck="false">
          <div class="q-mb-sm q-mt-sm q-mt-sm text-subtitle1 flex justify-between">
            <span class="text-bold">Personal Information</span>
            <div class="text-right">
              <q-btn label="Save" type="submit" color="primary" rounded outlined standout size="md" />
            </div>
          </div>
          <q-separator class="q-mb-lg" style="max-width: 100%"></q-separator>
          <div class="row q-gutter-md">
            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mb-sm  q-mt-sm q-pb-none">Firstname*</p>
                <q-input 
                rounded 
                outlined 
                dense 
                standout 
                v-model="firstName" 
                lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'FIRSTNAME IS REQUIRED',
                ]" ><div class="ada">firstname</div></q-input>
              </div>
            </div>
            <div class="col">
              <div class="">
                <p class="text-bold text-body2 q-mb-sm  q-mt-sm q-pb-none">Lastname*</p>
                <q-input 
                rounded 
                outlined 
                dense standout v-model="lastName" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'LASTNAME IS REQUIRED',
                ]" ><div class="ada">lastname</div></q-input>
              </div>
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col">
              <div class="">
                <p class="text-bold text-body2  q-mt-sm q-mb-sm q-pb-none">Email*</p>
                <q-input rounded outlined dense standout v-model="email" disable lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'EMAIL IS REQUIRED',
                ]" ><div class="ada">email</div></q-input>
              </div>
            </div>
            <div class="col">
              <div class="">
                <p class="text-bold  q-mt-sm text-body2 q-mb-sm q-pb-none">Company URL*</p>
                <q-input rounded outlined dense standout v-model="companyUrl" lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'COMPANYURL IS REQUIRED',
                ]" ><div class="ada">company url</div></q-input>
              </div>
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col">
              <div class="">
                <p class="text-bold text-body2  q-mt-sm q-mb-sm q-pb-none">Role</p>
               
                <q-input rounded outlined dense standout v-if="activeAccount.userType === 2" v-model="admin" disable lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'ROLE IS REQUIRED',
                ]" ><div class="ada">role</div></q-input>
                 <q-input rounded outlined dense standout v-else v-model="role" disable lazy-rules :rules="[
                  (val) => (val && val.length > 0) || 'ROLE IS REQUIRED',
                ]" ><div class="ada">role</div></q-input>
              </div>
            </div>
            <div class="col">
              <div class="">
                <p class="text-bold text-body2  q-mt-sm q-mb-sm q-pb-none">Phone Number</p>
               <q-input rounded outlined dense standout v-model="PhoneNumber" mask="###-###-####" lazy-rules
                  :rules="[
                    (val) => (val && val.length === 12) || 'PHONE NUMBER IS REQUIRED',
                  ]" placeholder="999-999-9999"><div class="ada">phone number</div></q-input>
              </div>
            </div>
          </div>
        </q-form>
      </div>
      <div class="">
        <q-form ref="updatePassworForm" @submit="onPasswordSubmit" autocorrect="off" autocomplete="off" autocapitalize="off"
          spellcheck="false">
          <div class="q-mb-sm q-mt-lg text-subtitle1 q-mt-sm flex justify-between">
            <span class= "text-bold">Change Password</span>
            <div class="text-right">
              <q-btn label="Save" type="submit" color="primary" rounded outlined standout size="md" />
            </div>
          </div>
          <q-separator class="q-mb-lg" style="max-width: 100%"></q-separator>
          <div class="row q-gutter-md">
            <div class="col-6">
              <div class=" q-pr-md reg-input relative-position">
                <p class="text-bold text-body2 q-mb-sm  q-mt-sm q-pb-none">Old Password*</p>
                <q-input
                      rounded
                      outlined
                      dense
                      standout
                      placeholder="************"
                      autocomplete="old-password"
                      maxlength="50"
                      ref="passwordRef"
                      v-model="oldpassword"
                      :type="oldisPwd ? 'password' : 'text'"
                      @keyup="checkoldPassword"
                      @blur="showoldPassDiv = false"
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
                              :name="oldisPwd ? 'visibility_off' : 'visibility'"
                              class="cursor-pointer"
                              size="16px"
                              @click="oldisPwd = !oldisPwd"
                            ></q-icon>
                          </template>    
                    </q-input>
                         <q-list class="box-shadow passdivPosition" v-if="showoldPassDiv">
                          <q-item :class="charoldPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="charoldPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px"/>
                            </q-item-section>
                            <q-item-section class="f-12">8 Characters</q-item-section>
                          </q-item>

                          <q-item :class="numoldPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="numoldPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Number</q-item-section>
                          </q-item>

                          <q-item :class="caseoldPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="caseoldPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Uppercase</q-item-section>
                          </q-item>
                            <q-item :class="caseoldLPass ? 'text-positive text-bold' : 'text-negative'" class="bg-white">
                            <q-item-section avatar>
                              <q-icon :name="caseoldLPass ? 'mdi-check-circle' : 'mdi-close-circle'" size="16px" />
                            </q-item-section>
                            <q-item-section class="f-12">Contains Lowercase</q-item-section>
                          </q-item>                        
                        </q-list>       
              </div>
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col-6">
              <div class=" q-pr-md reg-input relative-position">
                <p class="text-bold text-body2 q-mb-sm  q-mt-sm q-pb-none">New Password*</p>
                 <q-input
                          rounded
                          outlined
                          dense
                          standout
                          placeholder="************"
                          autocomplete="new-password"
                          ref="passwordRef"
                          maxlength="50"
                          v-model="rpassword"
                           :type="risPwd ? 'password' : 'text'"
                            @keyup="checkPassword"  
                      @blur="showPassDiv = false"
                          lazy-rules
                          :rules="[
                            (val) => !!val || 'NEW PASSWORD IS REQUIRED',
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
                            <q-item-section class="f-12">Contains Lowercase</q-item-section>
                          </q-item>                         
                        </q-list>       
              </div>
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col-6">
               <div class=" q-pr-md reg-input relative-position">
                <p class="text-bold text-body2 q-mb-sm  q-mt-sm q-pb-none">Confirm Password*</p>
              
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
                              'NEW PASSWORD AND CONFIRM PASSWORD MUST BE SAME',
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
                            <q-item-section class="f-12">Contains Lowercase</q-item-section>
                          </q-item>                      
                        </q-list>     
              </div>
            </div>
          </div>
        </q-form>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>


<script>
import { LocalStorage, useQuasar } from "quasar";
import { ref, computed, reactive, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    const isVisible=ref(true)
    const firstName = ref(null)
    const lastName = ref(null)
    const showSkeleton = ref(true);
    let profileImage = ref("https://ccmweb.blob.core.windows.net/linesheetspro/userProfile/default-profile.png")

    // const firstName = ref(null)
    // const lastName = ref(null)
    const email = ref(null);
    const role = ref(null);
     const isProfilePreview = ref(false);
    const companyUrl = ref(null);
    const activeAccountData = ref(null);
    const profileText = ref(null);
    const userDetails = ref(null);
    const customerallDetails = ref({});
     let PhoneNumber = ref(null)
      const passwordRef = ref(null);
      const oldpassword = ref(null);
      const oldisPwd = ref(null);
      const caseoldLPass = ref(false);
      const charoldPass = ref(false);
      const caseoldPass = ref(false);
      const numoldPass = ref(false);
    const password = ref(null);
    const admin = ref('admin');
    const isPwd = ref(true);
    const remember = ref(false);
     const risPwd = ref(true);
    const isPwd1 = ref(true);
    const rpassword = ref(null);
    const cpassword = ref(null);
     const charPass = ref(false);
    const numPass = ref(false);
    const casePass = ref(false);
    const charCPass = ref(false);
    const numCPass = ref(false);
    const caseCPass = ref(false);
    const caseLPass = ref(false);
    const caseLCPass = ref(false);
    const isConfirmPasswordValid = ref(false)
    const isPasswordValid = ref(false)
    const isOldPasswordValid = ref(false)
    const showPassDiv = ref(false);
    const showoldPassDiv = ref(false);
    const showCPassDiv = ref(false);
    const activeAccount = ref(null);
    const profileImageSrc = ref(null)
    const updatePassworForm = ref(null);
    onBeforeMount(async () => {
      showSkeleton.value=false
      activeAccountData.value = $store.getters["auth/getAccountData"];
      activeAccount.value = $store.getters["common/getAccountName"];
       let payload = localStorage.getItem("roleId");
      $store.dispatch("common/getRole", payload) 
      $store.dispatch("common/getcustomerallDetails").then((response) => {       
        companyUrl.value = response.companyUrl;
      }),
      showSkeleton.value = false
      await initialLoad()
    });
    const initialLoad = async(event) => {
        let payload = localStorage.getItem("userId");
        $store.dispatch("common/getUser", payload).then((response) => {
          email.value =  response[0].email;
          profileText.value = response[0].name.split('')[0]
          userDetails.value = response[0];
          firstName.value = userDetails.value.firstName
          lastName.value = userDetails.value.lastName
          PhoneNumber.value = userDetails.value.phone
          profileImage.value = userDetails.value.profileImage          
          isVisible.value = profileImage.value.includes('default-profile')  ? false : true;
        });   
    }

      const previewFile = (event) => {
      isProfilePreview.value = true
      var img = document.getElementById('imageUpload');
      var preview = document.getElementById('imagePreview');
      var file = document.querySelector('input[type=file]').files[0];
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedExtensions.exec(file.name)) {
            $q.notify({
            type: "negative",
            position: "top",
            message: "Invalid image type",
            timeout: 1000,
          });
          return
        }
      profileImage.value = file
      var reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }


    const saveProfileImage = async () => {
      const data = profileImage.value
      const uploadProfile = await $store.dispatch("common/uploadProfileImage", data)
        imagePreview.src = uploadProfile.url
        isProfilePreview.value = false
        isVisible.value=true
        userDetails.value['profileImage'] = uploadProfile.url
        await $store.dispatch("common/updateUser", userDetails.value);
        await $store.dispatch("common/saveProfileUrl",uploadProfile.url)
    }

      const removePic=async()=>
      {
        
        let url="https://ccmweb.blob.core.windows.net/linesheetspro/userProfile/default-profile.png"
        imagePreview.src = url
        isProfilePreview.value = false
        isVisible.value=false
        userDetails.value['profileImage'] = url
        await $store.dispatch("common/updateUser", userDetails.value);
        await $store.dispatch("common/saveProfileUrl",url)
    }


    const onPasswordSubmit = async () => { 
      let data = {
        oldPassword : oldpassword.value,
        newPassword : cpassword.value
      }
      $store.dispatch("common/updatePassword", data).then(val=>{
        if(val){
          oldpassword.value = null;
          rpassword.value = null;
          cpassword.value = null;
          updatePassworForm.value.resetValidation() 
        }
      })
    }
    const onProfilesubmit = async () => {
      userDetails.value['firstName'] = firstName.value,
      userDetails.value['lastName'] = lastName.value,
      userDetails.value['phone'] = PhoneNumber.value,
      await $store.dispatch("common/updateUser", userDetails.value);

      initialLoad()
    };

    return {
      firstName,
      lastName,
      customerallDetails,
      profileText,
      email,
      role: computed(() => $store.getters["common/getRolename"][0]?.name),
      companyUrl,
      remember,
      activeAccountData,
      activeAccount,
      onProfilesubmit,
      profileImage,
      removePic,
      previewFile,
      saveProfileImage,
      isPwd,
      isPwd1,
      oldisPwd,
      oldpassword,
      caseoldLPass,
      caseoldPass,
      numoldPass,
      charoldPass,
      charoldPass,
       rpassword,
      cpassword,
      risPwd,
      password,
      passwordRef,
      isProfilePreview,
     charPass,
      numPass,
      casePass,
      charCPass,
      numCPass,
      caseCPass,
      caseLPass,
      isVisible,
      caseLCPass,
      isPasswordValid,
      isOldPasswordValid,
      isConfirmPasswordValid,
      showPassDiv,
      showoldPassDiv,
      showCPassDiv,
      PhoneNumber,
      showSkeleton,
      admin,
      onPasswordSubmit,
      profileImageSrc,
      updatePassworForm,
      checkoldPassword() {
      showoldPassDiv.value = true;
      let charoldPassword = oldpassword.value.length;
			const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;			
      if (charoldPassword >= 8) {
        charoldPass.value = true;
      } else {
        charoldPass.value = false;
			}			
      numoldPass.value = /\d/.test(oldpassword.value);
      caseoldPass.value = /[A-Z]/.test(oldpassword.value);
      caseoldLPass.value = /[a-z]/.test(oldpassword.value);
      
      if (charoldPass.value === true &&
					caseoldPass.value === true &&
          caseoldLPass.value === true &&
					numPass.value === true) {
						isOldPasswordValid.value = true;			
      } else {
        isOldPasswordValid.value = false;
      }
    },
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
      caseLCPass.value = /[a-z]/.test(cpassword.value);
      caseCPass.value = /[A-Z]/.test(cpassword.value);
      
      if (charCPass.value === true &&
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
        let contains_lowercase = /[a-z]/.test(val);
        if (!contains_number) {
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE NUMBER";
        }
        if (!contains_uppercase) {
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE UPPER CASE";
        }
        if (!contains_lowercase) {
          return "PASSWORD SHOULD INCLUDE ATLEAST ONE LOWER CASE";
        }

        if (
          contains_uppercase === true &&
           contains_lowercase === true &&
          contains_number === true
        ) {
          return true;
        } else {
          return false;
        }
      },

    };
  },
};
</script>


<style lang="scss" scoped>

// .main {
//         .titleUnderline{
//           padding: 0px 0 8px;
//           position: relative;
//           &::before {
//             content: "";
//             position: absolute;
//             left: 6%;
//             bottom: 15px;
//             width: 80px;
//             height: 3px;
//             transform: skew(-12deg) translateX(-50%);
//             background: $primary;
//             z-index: -1;
//           }
//         }
//     }
.profile {
  .q-tab--active {
    color: #5a68c2;
  }
}

.profile-container {
  margin-top: 10px;
  margin-left: 28px;

  .profile-image-container {
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
    height: 300px;
    max-height: 400px;
    padding: 50px;
    border-radius: 6px;
    margin-right: 70px;
    margin-top: 18px;
  }

.main-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: co;
  
}
  .avatar-upload {
    max-width: 205px;
  }

  .avatar-upload .avatar-edit {
    z-index: 1;
  }

  .avatar-upload .avatar-edit input {
    display: none;
  }

  .avatar-upload .avatar-edit input+label {
    display: inline-block;
    background: transparent;
    cursor: pointer;
    font-weight: normal;
    transition: all 0.2s ease-in-out;
    border: 1px solid $primary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // width: 180px;
    padding: 4px 10px;
    padding-left: 13px;
    padding-right: 17px;
    // margin-top: 40px;
    border-radius: 2px;
    margin-left: 5px;
  }

  .avatar-upload .avatar-edit input+label:hover {
    background: #f1f1f1;
    border-color: #d6d6d6;
  }

  .avatar-upload .avatar-preview {
    width: 142px;
    height: 142px;
    border-radius: 100%;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  }

  .avatar-upload .avatar-preview>img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // background-position: center;
    // object-fit: cover;
    // object-position: 30% 30%;
  }

  .custom-camera {
    color: $primary;
    font-size: 18px;
  }

  .custom-delete-btn{
    background-color: transparent;
    border-width: 0px;
    cursor: pointer;
  }

  .custom-delete{
    color:red;
    font-size:23px;
    margin-left: 13px;


  }

  .custom-upload {
    font-size: 14px;
    padding-right:14px;
  }
}
.login-container {
  width: 52%;
}

.ada {
  display:none;
}
.avatar-edit {
    
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: center;
}
</style>