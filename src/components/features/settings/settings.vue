<template>
  <div class="q-pt-lg background-color">
    <div class="q-gutter-y-md mainDiv">
      <q-tabs
        v-model="tab"
        narrow-indicator
        dense
        align="justify"
        active-color="primary"
        indicator-color="primary"
        class="text-color bg-white border q-mx-lg"
        style="max-width:270px;" 
        active-class=""
      >
       <!-- <q-route-tab
          :ripple="{ color: 'primary' }"
          name="roles"
          label="Roles"
          class="q-py-md q-px-lg"
          to="/settings/roles"
          no-caps
        /> -->
        <!-- <q-route-tab
          :ripple="{ color: 'primary' }"
          name="users"
          label="Users"
          class="q-py-md q-px-lg"
          to="/settings/users"
          no-caps
        /> -->
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="configuration"
          label="Configurations"
          class="q-py-md"
          to="/settings/configurations"
          no-caps
        />
        <q-separator vertical inset />
        <q-route-tab
          :ripple="{ color: 'primary' }"
          name="apps"
          label="Apps"
          class="q-py-md"
          no-caps
          to="/settings/apps"
        />
      </q-tabs>
      <q-tab-panels class="transparent" v-model="tab" animated>
        <!-- <q-tab-panel name="users" class="q-px-xl">
          <users></users>
        </q-tab-panel> -->

        <!-- <q-tab-panel name="roles" class="q-px-xl">
          <roles></roles>
        </q-tab-panel> -->

        <q-tab-panel
          name="configuration"
          class="configuration-tabpanel q-px-xl"
        >
          <configurations></configurations>
        </q-tab-panel>

        <q-tab-panel name="apps" class="app-tabpanel q-px-xl">
          <apps></apps>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';


export default {
  components: {
    users: require("src/components/features/settings/users/users.vue").default,
    roles: require("src/components/features/settings/roles/roles.vue").default,
    configurations:
      require("src/components/features/settings/configurations/configurations.vue")
        .default,
    apps: require("src/components/features/settings/apps/app-config.vue")
      .default,
  },
  setup() {
        const $store = useStore();
            const router = useRouter();

        onBeforeMount(() => {      
      $store.dispatch("auth/getPages").then(pages=>{
        let isPageRoute = pages.filter(val=> val.PageUrl == "/settings")
        if(isPageRoute.length == 0){
          router.push('/')
        }
      })
    });
    return {
      tab: ref("configuration"),
    };
  },
};
</script>

<style lang="scss" scoped>
.configuration-tabpanel .q-splitter__panel {
  width: 15% !important;
}
.heading-logo{
  padding-top:10px;
  padding-bottom:0px;
}
.mdi-new-box {
  color: $primary;
  position: absolute;
  right: -24px;
  top: -6px;
}
.mainDiv :deep(.q-separator--vertical) {
    width: 0px;
    background: #fafbfc;
     height: auto; 
    align-self: stretch;
}
.mainDiv :deep(.q-tabs--dense .q-tab) {
    min-height: 36px;
    background: #fafbfc;
}
</style>