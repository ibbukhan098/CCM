<template>
  <div class="splitterDiv q-pa-lg box-shadow">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs
          class="text-primary bg-white"
          v-model="tab"
          vertical
          active-color="primary"
          indicator-color="primary"
        >
          <q-tab name="ftp" icon="mdi-desktop-classic" label="FTP" />
          <q-tab v-if="account?.plan?.detail?.aPI == 'true'" name="api" icon="mdi-cogs" label="API" />
          <q-tab name="export" icon="mdi-export" label="Export"/>
        </q-tabs>
      </template>

      <template v-slot:after>
        <div class="row">
       <q-tab-panels
          class="col-8"
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="ftp">
            <ftp></ftp>
          </q-tab-panel>

          <q-tab-panel v-if="account?.plan?.detail?.aPI == 'true'" name="api" class="q-pt-lg">
            <api></api>
          </q-tab-panel>

          <q-tab-panel name="export">
            <export></export>
          </q-tab-panel>
        </q-tab-panels>
        </div>

      </template>
    </q-splitter>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
     const $store = useStore();
    const $q = useQuasar();
    return {
      account: computed(()=> $store.getters["auth/getAccountData"]),
      tab: ref("ftp"),
      splitterModel: ref(20),
    };
  },
  components: {
    ftp: require("../configurations/ftp.vue").default,
    api: require("../configurations/api.vue").default,
    export: require("../configurations/export.vue").default,
  },
};
</script>
<style lang="scss" scoped>
.splitterDiv {
  border-radius: $border-radius;
  background: $white;
  :deep(.q-splitter__before){
      width: 8% !important;
        .q-tabs--vertical .q-tab__indicator {
            width: 2px;
        }
        .q-tab{
          text-transform: capitalize;
        }
  }
}

</style>
