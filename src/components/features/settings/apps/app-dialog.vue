<template>
  <div class="q-pa-md q-dialog-container">

    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        keep-alive
        :name="1"
        title="Configuration"
        icon="settings"
        :done="done1"
      >
      
        <div class="q-pa-xs q-mt-none" style="max-width: 400px">
     
        
          <q-form class="q-gutter-md" @submit="onSubmit">
            <q-input
              filled
              v-model="sname"
              label="Shop Name"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'SHOP NAME IS REQUIRED',
              ]"
            >
            </q-input>

            <q-input
              v-model="skey"
              label="API Secrect Key"
              filled
              :type="isPwd ? 'password' : 'text'"
              :rules="[(val) => (val && val.length > 0) || 'KEY IS REQUIRED']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                ></q-icon>
              </template>
            </q-input>
            <p class="q-pb-lg q-ml-lg" style="font-style: italic"><span style="text-decoration: underline; font-style: italic;">Note : </span> <br> Due to limitations in Shopify, we can not push products having more than 100 variants or 3 options. </p>
            <div class="row">
              <div class="col-12 text-right">
               <q-btn type="submit" color="primary" label="Continue" />
            </div>
            </div>                        
          </q-form>
        </div>
        <q-stepper-navigation> </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Supplier Sync"
        icon="create_new_folder"
        :done="done2"
      >
     <div class="q-pa-md">
        <div class="text-h7 text-weight-medium" style="padding-bottom: 7px">
          Please select the suppliers to sync:
        </div>
        <q-select
      v-model="selectedSuppliers"
      multiple
      dense
        :options="options"
        option-label="name"
        option-value="id"
      color="green"
      class="option"
    />
        <div class="">
          <p class="q-my-none text-weight-bold text-h6" style="padding-top: 10px">Scheduling</p>
          <p class="text-caption sched-cap" style="padding-top: 10px">
            Setup periodic processing for your feed
          </p>
          <div class="row">
            <p class="q-my-sm q-mr-md">Run Every day at:</p>
            <q-select
              class="col-md-6"
              dense
              outlined
              v-model="selectedTime"
              :options="FTPTime"
              label="Download Every"
            />
          </div>
        </div>
        <div class="col-12 q-mt-lg text-right">
          <q-btn
            type="submit"
            color="primary"
            align="left"
            @click="toSync"
            label="Continue to Sync"
          />
        </div>
        </div>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed, reactive } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const $store = useStore();
    const sname=ref(null);
    const skey = ref(null);
    const step = ref(1);
    const done1 = ref(false);
    const done2 = ref(false);
    const name = ref(null);
    const router = useRouter();
    const selectedTime = ref(null);
    const isPwd  = ref(true)
    const selectedSuppliers = ref(null)
    onBeforeMount(() => {
      $store.dispatch("shopify/getShopifyCredentials");
      $store.dispatch("shopify/getSuppliersList");
      //$store.dispatch("home/getCatalogDetails");
     $store.dispatch("shopify/getCatalogDetails");
    });
    return {
      step,
      isPwd,
      sname,
      skey,
      done1,
      done2,
      time: ref("10:56"),
      // options: ["FTP", "SFTP"],
      date: ref("2019/02/01"),
      selectedTime,
      selectedSuppliers,
      FTPTime: computed(() => $store.getters["common/getFTPTimes"]),
       options: computed(() => $store.getters["shopify/getSuppliers"]),
      updateShopname(val) {
        $store.state.shopName = val;
      },
      onSubmit() {
        let shopDetails = {
          shopName: sname.value,
          shopKey: skey.value,
        };
        $store
          .dispatch("shopify/validateAPICredentials", shopDetails)
          .then((val) => {
            if (val) {
              done1.value = true;
              step.value = 2;
              $store.dispatch("home/getCatalogDetails");
            } else {
            }
          });
      },
      toSync() {
        let supplierIDs = []
        selectedSuppliers.value.forEach(element => {
             supplierIDs.push(element.id)
        });
        $store.dispatch('shopify/storeSelectedSuppliers', supplierIDs).then(val=>{
          router.push("/shopify");
        })
      },
      // options: computed(() => $store.getters["home/getCatalogsTableRows"]),
      group: ref([]),
      // options: [{ label: "Tri-Mountain", value: "TM" }],
    };
  },
};
</script>
<style scoped>
.q-dialog-container {
  width: 100%;
  max-width: 600px;
  padding: 80px;
  min-height: 600px;
  box-shadow: none;
  overflow: hidden;
}
.q-option-group > div {
  margin-left: -8px !important;
 
}
.sched-cap {
  margin-bottom: 8px;
}
.option {
   max-height: 150px !important;
  overflow-y: scroll;

}
</style>