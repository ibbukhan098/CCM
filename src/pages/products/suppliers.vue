<template>
  <q-layout class="background-color" style="height:auto" view="hHh lpR fFf">
    <div class="q-pt-lg">
      <div class="q-gutter-y-md">
        <div class="q-px-lg row justify-between items-end mainDiv">
          <q-tabs
            v-model="tab"
            narrow-indicator
            dense
            align="justify"
            active-color="primary"
            indicator-color="primary"
            class="text-color border bg-white col"
            style="max-width: 300px"
          >
            <q-route-tab
              :ripple="{ color: 'primary' }"
              name="suppliers"
              label="Subscribed Catalogs"
              class="q-py-md"
              no-caps
              to="/products/subscribed"
            />
            <q-separator vertical inset />
            <!-- <q-route-tab
              :ripple="{ color: 'primary' }"
              name="subscription"
              label="Manage Subscriptions"
              class="q-py-md"
              no-caps
              to="/products/subscriptions"
            /> -->
            <q-separator vertical inset />
            <q-route-tab
              :ripple="{ color: 'primary' }"
              name="history"
              label="History"
              class="q-py-md"
              no-caps
              to="/products/history"
            />
          </q-tabs>          
        </div>
        <q-tab-panels class="transparent" v-model="tab" animated>
          <q-tab-panel name="suppliers" class="q-px-lg">
            <suppliers />
          </q-tab-panel>
           <q-tab-panel name="subscription" class="q-px-lg">
            <subscription />
          </q-tab-panel>
          <q-tab-panel name="history" class="q-px-lg">
            <history />
          </q-tab-panel>         
        </q-tab-panels>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
export default {
  components: {
    suppliers:
      require("src/components/features/products/suppliers/suppliers.vue")
        .default,
    subscription: require("src/components/features/products/subscriptions.vue")
      .default,
    history: require("src/components/features/products/history/history.vue")
      .default,
  },
  setup() {
      const $store = useStore();
      const router = useRouter();
        onBeforeMount(() => {      
      $store.dispatch("auth/getPages").then(pages=>{
        let isPageRoute = pages.filter(val=> val.PageUrl == "/products")
        if(isPageRoute.length == 0){
          router.push('/')
        }
      })
    });
    return {
      tab: ref("subscription"),
    };
  },
};
</script>

<style lang="scss" scoped>
.mainDiv :deep(.q-separator--vertical) {
    width: 0px;
    background: #fafbfc;
     height: auto; 
    align-self: stretch;
}
.mainDiv :deep(.q-tabs--dense .q-tab) {
    min-height: 36px;
    background: #fafbfc;
    // padding: 0;
}
</style>