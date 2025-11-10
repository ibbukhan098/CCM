<template>
  <q-layout view="lHh lpr lFf">
    <div class="row q-ma-lg">
      <q-breadcrumbs class="q-pl-lg q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Apps" icon="apps" to="/settings/apps" />
        <q-breadcrumbs-el
          label="WooCommerce"
          icon="mdi-store-outline"
        />
      </q-breadcrumbs>
      <hr />
      <h6 class="text-subtitle1 q-pl-lg q-my-md col-12 text-bold text-primary">
        App Configuration
      </h6>
      <div class="col-12">
        <div class="q-pa-md" style="min-width: 350px">
          <q-list class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="mdi-key"
              label="Credentials"
              caption="Save your API keys"
              default-opened
              header-class="bg-grey-1 text-primary"
              @show="IsCredOpen = true"
              @hide="IsCredOpen = false"
            >
              <q-card style="display: flex; justify-content: center">
                <q-card-section>
                  <div class="row justify-between items-center">
                    <div class="col-5 q-pa-xl q-mt-none" >
                      <q-form class="q-gutter-md" @submit="onSubmit">
                         <div style="display: flex">
                        <q-input
                         style="width: 90%"
                          v-model="storeURL"
                          dense
                          label="Store URL"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'STORE URL IS REQUIRED',
                          ]"
                        >
                        </q-input>
                         <q-btn
                        style="width: 10%"
                          flat round color="primary" 
                          icon="mdi-help-circle-outline" no-caps 
                          href="https://woocommerce.com/document/woocommerce-rest-api/" target="_blank"
                        ><div style="display:none;">ada</div></q-btn>
                        </div>
                        <q-input
                        style="width: 88%"
                          v-model="consumerKey"
                          label="Consumer Key"
                          dense
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'KEY IS REQUIRED',
                          ]"
                        >
                        </q-input>

                        <q-input
                         style="width: 88%"
                          v-model="secretKey"
                          label="Consumer Secret"
                          dense
                          :rules="[
                            (val) =>
                              (val && val.length > 0) || 'SECRET IS REQUIRED',
                          ]"
                        >
                        </q-input>
                        <div class="row">
                          <div class="col-12 text-right" style="width: 90%;">
                            <q-btn type="submit" color="primary" label="Save" />
                          </div>
                        </div>
                      </q-form>
                    </div>
                    <div class="col-7 row items-center q-pa-md">
                       <q-card class="my-card box-shadow q-pa-md" style="">
                      <div>
                        <q-card-section class="q-py-sm">
                          <div class="text-h6 shopify-title primary-text">
                            WooCommerce Integration Limitations
                          </div>
                        </q-card-section>
                        <q-separator class="q-mb-sm"/>
                        <div>
                          <q-card-section class="q-pt-none q-px-none">
                            WooCommerce doesn't accept products with
                            missing/broken images. So we work with the
                            respective manufacturers to source them. In case
                            they're not available, we will skip adding those
                            products to the storefront but they will remain
                            available through WooCommerce Format Export file.
                          </q-card-section>
                          <q-card-section class="q-pt-none q-px-none">
                            WooCommerce supports up to 50 SKUs of a product. To
                            accommodate suppliers with more than 50 SKUs for a
                            product, we recommend installing "Markup by
                            Attribute" plugin.
                          </q-card-section>
                        </div>
                        <div class="bg-primary q-pa-sm text-white">
                          <span
                            >Do you have more questions on WooCommerce
                            Integration?</span
                          >
                          <a
                            href="/faqs"
                            target="_blank"
                            class="text-white text-underline"
                            style="opacity: 1; text-decoration: underline"
                          >
                            Here are some answers!</a
                          >
                        </div>
                      </div>
                       </q-card>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
      <div class="col-12">
        <q-list>
          <catalogs @showSyncDiv="changeSyncDiv"></catalogs>
        </q-list>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar, copyToClipboard } from "quasar";

export default {
  components: {
    catalogs:
      require("src/components/features/settings/apps/config/woo-new.vue")
        .default,
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const storeURL = ref(null);
    const secretKey = ref(null);
    const consumerKey = ref(null);
    const IsCredOpen = ref(true);
    const isPwd = ref(true);
    const IsSyncOpen = ref(false);
    var expandedSupplier = ref({});
    const suppliers = computed(
      () => $store.getters["home/getCatalogsTableRows"]
    );
   const getShop = () => {
      $store.dispatch("woocommerce/getCredentials").then((x) => {
        if(x.configuration){

           let shop = JSON.parse(x.configuration);
        storeURL.value = shop.storeURL;
        secretKey.value = shop.consumerSecret;
         consumerKey.value = shop.consumerKey;

        }
       
      });
    };
    onBeforeMount(async () => {
     // await $store.dispatch("home/getCatalogDetails");
    });

       onMounted(() => {
      getShop();
    });
    return {
      suppliers,
      storeURL,
      consumerKey,
      IsCredOpen,
      isPwd,
      IsSyncOpen,
      expandedSupplier,
      secretKey,
      onSubmit() {
        let shopDetails = {
          configuration: {
            storeURL: storeURL.value,
            consumerKey: consumerKey.value,
            consumerSecret: secretKey.value,
          },
          accountId: parseInt(localStorage.getItem("accountId")),
          shopType: "WooCommerce",
          createdDate: Date.now(),
        };
        $store.dispatch("woocommerce/storeCredentials", shopDetails);
      },
      changeSyncDiv(val) {
        IsCredOpen.value = val.bool ? false : true;
        expandedSupplier.value = suppliers.value.filter(
          (x) => x.id == val.supplierID
        )[0];
        IsSyncOpen.value = val.bool;
      },
      copy(name) {
        copyToClipboard(name)
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

<style lang="scss">
hr {
  border: 0;
  clear: both;
  display: block;
  width: 96%;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
  margin: 0;
  transition: background 0.3s, opacity 0.3s;
  flex-shrink: 0;
}
</style>