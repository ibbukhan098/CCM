<template>
  <q-form @submit="onSubmit" class="q-mx-lg"
   autocorrect="off"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
  >
    <div class="row q-gutter-lg">
      <div class="col q-pb-md">
        <p class="text-bold text-body2 q-mb-sm q-pb-none">FTP/SFTP URL *</p>
        <q-input
        placeholder="127.0.0.1"
          rounded outlined standout dense
          v-model="url"
          lazy-rules
          :rules="[(val) => !!val || 'FTP/SFTP URL IS REQUIRED']"
          maxlength="250"
        ><div style="display:none">ada</div></q-input>
      </div>
      <div class="col q-pb-md">
        <p class="text-bold text-body2 q-mb-sm q-pb-none">Port Number *</p>
        <q-input
        placeholder="21"
          rounded outlined standout dense
          v-model="port"
          lazy-rules
          :rules="[(val) => !!val || 'PORT NUMBER IS REQUIRED']"
          maxlength="5"
        ><div style="display:none">ada</div></q-input>
      </div>
    </div>
    <div class="row q-gutter-lg">
      <div class="col">
        <p class="text-bold text-body2 q-mb-sm q-pb-none">Username *</p>
        <q-input
          autocomplete="new-password"
          rounded outlined standout dense
          placeholder="FTP Username"
          v-model="username"
          lazy-rules
          :rules="[(val) => !!val || 'USERNAME IS REQUIRED']"
          maxlength="100"
        ><div style="display:none">ada</div></q-input>
      </div>
      <div class="col">
        <p class="text-bold text-body2 q-mb-sm q-pb-none">Password *</p>
        <q-input
          autocomplete="new-password"
          rounded outlined standout dense
          placeholder="FTP Password"
          ref="passwordRef"
         :type="isPwd ? 'password' : 'text'"
          v-model="password"
          maxlength="50"
          lazy-rules
          :rules="[
            (val) => !!val || 'PASSWORD REQUIRED',
            (val) => val.length >= 5 || 'MINIMUM OF 5 CHARACTERS',
          ]"
        >
         <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                  size="xs"
                ></q-icon>
              </template>
        </q-input>
      </div>
    </div>
    <div class="row q-gutter-lg">
      <div class="col">
        <p class="q-mt-md text-bold text-body2 q-mb-sm q-pb-none">Path</p>
        <q-input
          v-model="configPath"
          rounded
          autocomplete="new-password"
          standout dense outlined
          placeholder="Path"
          maxlength="500"
        ><div style="display:none">ada</div></q-input>
      </div>
    </div>
    <div class="row q-mt-md justify-end">
       <q-btn
         label="Upgrade Plan"
                color="primary"
                size="sm"
                rounded outlined standout
                padding="q-pl-sm"
                v-if="activeAccountData?.plan?.isTrail"
                to="/account/plan">
                 <q-badge color="" rounded floating class="upgrade">
                 <i class="mdi mdi-crown" />
               </q-badge>
       </q-btn>
       <div v-else>
         <q-btn label="test" rounded outlined standout @click="onTest" color="primary" class="q-mr-md" />
         <q-btn label="Save" rounded outlined standout type="submit" color="primary" />
       </div>
    </div>
     <p class="text-body2 q-mt-md"><span class="notify"><i class="mdi mdi-information-outline"/></span>  Please make sure you whitelist our IPs (40.113.246.101, 183.82.1.176, 183.82.109.5) to connect to your FTP for pushing the files.</p>
  </q-form>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed,onBeforeMount } from "vue";
import { useStore } from "vuex";
import { api } from "boot/axios";
import {date, QSpinnerClock, QSpinnerGears } from "quasar";


export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const username = ref(null);
    const password = ref(null);
    const passwordRef = ref(null);
    const port = ref(null);
    const url = ref(null);
    const type = ref(null);
    const isPwd  = ref(true);
    const selectedTime = ref(null);
    const ftpData = ref(null);
    const configPath = ref('');
    const partialPath = ref(null)

    let activeAccountData = computed(() => $store.getters["auth/getAccountData"])
    onBeforeMount(async()=>{
      let data= await $store.dispatch("common/getFtpConfigDetails")
      ftpData.value = data
      url.value=data.url;
      port.value=data.port;
      selectedTime.value=data.scheduleTime;
      password.value = data.password
      username.value = data.userName
      configPath.value = data?.partialPath
    })

    const onTest = async() => {
      let randomText = [
        "Validating IP address",
        "Validating your credentials",
        "Establishing secure connection",
        "Connecting server"
     ];
     let notif = $q.notify({
        spinner: QSpinnerGears,
        color: "primary",
        group: false, // required to be updatable
        timeout: 0, // we want to be in control when it gets dismissed
        message: 'Validating IP address',
        position: "top",
        classes: "ftp-notification"
      })
      const notEmpty = ((url.value && username.value && password.value && port.value && type.value) != "") && password.value.length > 5
      if(notEmpty){
        let ftpDetails = {
          host: url.value,
          user: username.value,
          pass: password.value,
          port: port.value,
          type: type.value,
        };
      let count = 0
        const interval = setInterval(() => {
        if (count < 4){
          notif({
          message: `${randomText[count]}`
          })
        }
        count = count + 1
      }, 5000)
        let isValid = await $store.dispatch("common/testFTP", ftpDetails);
        if (isValid?.status == 200) {
          notif({
            spinner: false,
            message: 'FTP credentials are valid',
            timeout: 2500,
            type: "positive",
            position: "top",
            color: "positive",
            classes: "ftp-notification"
          })
          clearInterval(interval)
        }else{
          notif({
            spinner: false,
            message: 'FTP credentials are Invalid',
            timeout: 2500,
            type: "negative" ,
            position: "top",
            color: "negative",
            classes: "ftp-notification"
          })
        }
        return isValid
      }
  }
    const onSubmit = async() => {
        const isValid = await onTest()
        if(isValid.status === 200){
          const ftpID = ftpData.value?.id === undefined || ftpData.value?.id === null?  0 : ftpData.value.id
          let ftpDetails = {
          id: ftpID,
          url: url.value,
          userName: username.value,
          password: password.value,
          port: port.value,
          fileName: ftpData.value.fileName,
          partialPath: configPath.value
        };
        $store.dispatch("common/addFTP", ftpDetails);
        }
      }
    return {
      onTest,
      ftpData,
      onSubmit,
      configPath,
      username,
      password,
      port,
      isPwd,
      type,
      url,
      selectedTime,
      activeAccountData,
      partialPath,
      FTPTime: computed(() => $store.getters["common/getFTPTimes"]),
      time: ref("10:56"),
      options: ["FTP", "SFTP"],
      date: ref("2019/02/01"),
    };
  },
};
</script>

<style lang="scss">
.ftp-notification {
    padding: 0 !important;
    min-width: 20vw !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    div{
      flex: inherit !important;
    }
}
.upgrade{
  padding: 5px;
  margin: -5px;
  background: #fbbe28;
}

 .notify{
   float: left;
 }
 .notify .mdi.mdi-information-outline {
    font-size:18px;
    padding-right:6px;
    vertical-align:middle;
}
</style>
