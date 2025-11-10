<template>
  <q-layout view="hHh lpR fFf" class="">
    <q-header
      class="bg-white row no-wrap justify-between items-center box-shadow-menu"
    >
      <q-toolbar class="col-md-2 q-ml-lg">
        <q-toolbar-title class="lh-1" v-if="!isTrailEnd">
          <img
            src="https://ccmweb.blob.core.windows.net/ccm/Um-Full.svg"
            class="logo"
            alt="uniform market logo"
            @click="$router.replace('/')"
          />
        </q-toolbar-title>
         <q-toolbar-title class="lh-1" v-else>
          <img
            src="https://ccmweb.blob.core.windows.net/ccm/Um-Full.svg"
            class="logo"
            alt="uniform market logo"
          />
        </q-toolbar-title>
      </q-toolbar>

      <div class="col-md-6 q-pl-lg">
        <q-toolbar-title class="catlogmanager-logo">
          <img
            src="https://ccmweb.blob.core.windows.net/ccm/images/um-logo-favicon.png"
            class="logo"
            alt="uniform market logo"
          />
        </q-toolbar-title>
        <div class="row q-mx-md">
          <q-tabs
            v-model="tab"
            narrow-indicator
            dense
            v-if="!isTrailEnd"
            align="justify"
            active-color="primary"
            indicator-color="primary"
            class="text-weight-bold text-color"
          >
            <q-route-tab
              exact
              v-for="page in pages"
              :key="page.pageId"
              :ripple="{ color: 'secondary' }"
              :name="page.ModuleName"
              :label="page.ModuleName"
              :to="page.PageUrl"
              no-caps
              class="q-ml-sm"
            />
          </q-tabs>
        </div>
      </div>
      <div class="col-md-4 q-px-md q-py-sm text-right">
        <span
          ><q-badge rounded color="orange" si v-if="getRemainingDays > 0">
            {{ getRemainingDays }} Days Remaining
          </q-badge>
          <span v-show="!showSkeleton" class="text-black q-mx-md" style="font-size:12 px">Hello, {{ fname.firstName }}</span>
          <span class="text-black q-mx-md inline" v-show="showSkeleton"><q-skeleton type="text" width="30%" class="vertical-middle	 inline-block"/></span>
        </span>
        <q-avatar size="lg" class="q-mr-md cursor-pointer">
         <img v-show="ProfileImage" class="profile-icon" :src="ProfileImage" alt="profile image" />
          <img v-show="!ProfileImage" class="profile-icon" src="https://ccmweb.blob.core.windows.net/linesheetspro/userProfile/default-profile.png" alt="profile image" />
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            transition-duration="600"
          >
            <q-list style="min-width: 100px">
              <q-item
              v-if="!isTrailEnd"
              clickable v-close-popup to="/profile">
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-account-edit"
                    color="primary"
                    size="md"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="!isTrailEnd" clickable v-close-popup to="/knowledgebase">
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-help"
                    color="primary"
                    size="md"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Help</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-logout"
                    color="primary"
                    text-color="white"
                    size="md"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </q-avatar>
      </div>
    </q-header>
    <q-dialog v-model="popupCheck">
      <planExpiry></planExpiry>
    </q-dialog>
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition appear name="fade" mode="out-in" duration="250">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import jwt_decode from 'jwt-decode'

export default {
  components: {
    planExpiry: require("src/components/features/home/planexpiry.vue").default,
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    let popupCheck = ref(false);
    const showSkeleton = ref(true);
    const currentAccount = ref(null)
    const userName = ref(null)
     const userDetails = ref(null);
     localStorage.removeItem('uploading')// FTP or SFTP upload 
    let userObject = computed(()=>$store.getters["common/getAccountName"])
    let token = computed(()=>$store.getters["auth/getToken"])
   let ProfileImage = computed(()=>$store.getters["common/getAccountName"].profileImage)
   let isTrailEnd = computed(()=>$store.getters["auth/getIsTrailEnded"])

    onBeforeMount(async () => {
      if (isTrailEnd.value) {
        popupCheck.value = true
      }
      if(token.value == 'null'){
        router.push('/login')
        return
      }
      await $store.dispatch('auth/getPages') 
      await $store.dispatch('common/getUsers')
      let accountDetails=await $store.dispatch('auth/getAccount')
      let UserId=localStorage.getItem('userId')
      let userData=await $store.dispatch("common/getUser", UserId)
       window.Appcues.identify(UserId, {
                first_name: userData[0].firstName,
                last_name: userData[0].lastName,
                email: userData[0].email,
                plan_type: accountDetails.plan.name
              });
      userName.value = userObject.value.firstName
      showSkeleton.value = false
      $store.dispatch('common/getUsers').then(val=>{        
      })
    })

    $store.subscribe((data) => {
      switch (data.type) {
        case "auth/closeFreePopup": {
          popupCheck.value = false
        }
      }
    })

   
    const checkingTime = () => {
      if (localStorage.getItem('token') != null) {
        let token = localStorage.getItem('token')
        let expiry = jwt_decode(token).exp
        let date = new Date().getTime()
        let currentTime = date / 1000
        let result = expiry - currentTime
        if (result <= 10) {
          $q.notify({
              color: "positive",
              position: "top",
              classes : "notifyClass",
              message: "Your session is expired!!",
              timeout: 1000,
            });
          clearInterval(myInterval)
          localStorage.removeItem("token")
          router.push('/login')
        }

      }
    }
    let myInterval = setInterval(checkingTime,5000)

    return {
      showSkeleton,
      tab: ref("dashboard"),
      userName,
      ProfileImage,
      checkingTime,
      popupCheck,
      isTrailEnd,
      pages: computed(() => $store.getters["auth/getPages"]),
      fname:computed(()=>$store.getters["common/getAccountName"]),
      getRemainingDays: computed(() => $store.getters["auth/getRemainingDays"]),
      idleCount: computed(() => $store.getters["auth/idleCount"]),
      logout() {
        $store.dispatch("auth/logout").then((val) => {
          $q.notify({
            type: "positive",
            position: "top",
            message: "Logout successfull",
            timeout: 2000,
          });
          router.push("/login");
        });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo {
  height: auto;
  cursor: pointer;
  margin-right: 2%;
}
.profile-icon{
  width: 100%;
    height: 100%;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    object-fit: cover;
    object-position: 30% 30%;
}
.catlogmanager-logo{
  display: none;
}
@media(max-width:767px){
.catlogmanager-logo{
  display: block;
}
.q-toolbar__title.ellipsis.catlogmanager-logo {
    float: left;
    width: 10%;
}
.q-toolbar.row.no-wrap.items-center.col-md-2.q-ml-lg {
    display: none;
}
}
</style>
