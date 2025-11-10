<template>
  <div class="q-mx-lg" style="min-height: 180px;" v-show="!showSkeleton">
    <div class="row">
    <q-btn
      v-show="apiCredentials.apiPassword=='' && !showSkeleton"
      color="primary"
      icon="mdi-plus"
      class="q-ml-md"
      label="Generate"
      @click="generate"
    />
    </div>
    <div v-show="apiCredentials.apiPassword!=''">
      <q-list>
        <q-item class="" style="display:block">
          <div class="user q-pb-sm"><strong>Username:</strong> {{ apiCredentials.userName }}</div>
          <div class="password q-pb-sm"><strong>Password:</strong> {{ apiCredentials.password }}</div>
        </q-item>
        <q-item>
          <p class="text-body2">
            The Catalog Communication Manager API allows you to connect to our catalog library to pull in the entire catalog or any updates. For more information, 
             <a class="cp" href="https://ccm.sellerscommerce.com/swagger/index.html" target="_blank">
            check out the API reference documents.
            </a>
          </p>            
        </q-item>
      </q-list>
    </div>
  </div>
  <div class="q-pa-md" v-show="showSkeleton">
                 <q-skeleton v-show="showSkeleton" type="text" width="30%"/>
                 <q-skeleton v-show="showSkeleton" type="text" width="35%"/>
                 <q-skeleton class="q-mt-lg" v-show="showSkeleton" type="text" width="75%"/>
                 <q-skeleton v-show="showSkeleton" type="text" width="75%"/>
                 <q-skeleton v-show="showSkeleton" type="text" width="75%"/>
  </div>
</template>

<script>
import { useQuasar, copyToClipboard } from "quasar";
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const apiDetails = ref(null);
    const showSkeleton = ref(true);
    let APIvisiblity = ref(false);
    onBeforeMount(() => {
       $store.dispatch("common/getAPIDetails").then(val=>{ 
          showSkeleton.value = false
          APIvisiblity.value = val
        })
    });
    return {
      APIvisiblity,
      showSkeleton,
      apiDetails: $store.state.common.apiDetails,
      apiCredentials: computed(
        () => $store.getters["common/getAPICredentials"]
      ),
      generate(){
        $store.dispatch("common/getAPIDetails").then(val=>{
          APIvisiblity.value = val
        })
      },
      copy(apiname) {
        copyToClipboard(apiname)
          .then(() => {
            $q.notify({
              type: "positive",
              position: "top",
              message: "Copied to clipboard",
            });
          })
          .catch(() => {
            $q.notify({
              type: "negative",
              position: "top",
              message: "Error while copying",
            });
          });
      },
    };
  },
};
</script>

<style>
</style>
