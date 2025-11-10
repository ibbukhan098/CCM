<template>
  <q-layout view="lHh lpr lFf">
    <div class="row q-ma-lg">
      <q-breadcrumbs class="q-pl-lg q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Apps" icon="apps" to="/settings/apps" />
        <q-breadcrumbs-el label="Shopify" icon="mdi-store-outline" />
      </q-breadcrumbs>
      <hr />
      <h6 class="text-subtitle1 q-pl-lg q-my-md col-12 text-bold text-primary">
        App Configuration
      </h6>
      <div class="col-12">
        <div class="q-pa-md" style="min-width: 350px">
          <q-list class="rounded-borders">
            <q-expansion-item expand-separator icon="mdi-key" label="Credentials" caption="Save your API keys"
              default-opened header-class="bg-grey-1 text-primary" @show="IsCredOpen = true" @hide="IsCredOpen = false">
              <q-card>
                <q-card-section>
                  <div class="row justify-between items-center">
                    <div class="col-5 q-pa-xl q-mt-none">
                      <q-form class="q-gutter-md" @submit="onSubmit">
                        <div style="display: flex">
                          <q-input style="width: 90%" v-model="sname" dense label="Shop Name" lazy-rules :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'SHOP NAME IS REQUIRED',
                          ]">
                          </q-input>
                          <q-btn style="width: 10%;cursor:pointer;" flat round color="primary" icon="mdi-help-circle-outline" no-caps
                            href="https://www.shopify.in/partners/blog/17056443-how-to-generate-a-shopify-api-token"
                            target="_blank" ><div style="display:none;">ada</div></q-btn>
                        </div>
                        <q-input style="width:88%" v-model="skey" label="Admin API Access Token" dense :rules="[
                          (val) =>
                            (val && val.length > 0) || 'ADMIN API ACCESS TOKEN IS REQUIRED',
                        ]">
                        </q-input>
                        <!-- <p class="q-pb-lg q-ml-lg" style="font-style: italic"><span style="text-decoration: underline; font-style: italic;">Note : </span> <br> Due to limitations in Shopify, we can not push products having more than 100 variants or 3 options. </p> -->
                        <div class="row">
                          <div class="col-7">
                            <p><a href="/knowledgebase/apiintegration/generate-shopify-api-access-token" target="_blank">How to generate an access token </a></p>
                          </div>
                          <div class="col-5 text-right">
                            <q-btn type="submit" color="primary" label="Save" rounded outlined standout/>
                          </div>
                        </div>
                      </q-form>
                    </div>
                    <div class="col-7">
                      <q-card class="my-card box-shadow" style="">
                        <q-card-section class="q-py-sm">
                          <div class="text-h6 shopify-title primary-text">
                            Shopify Integration Limitations
                          </div>
                        </q-card-section>

                        <q-separator />

                        <div class="row items-center q-pa-md">
                          <div class="col-12">
                            <div>
                              <!-- <q-item-label style="margin-bottom:5px;">
                    <i class="mdi mdi-bell-ring" style="font-size: 20px; margin-right: 5px; color: #5a68c2;"></i>
                    <b style="position: relative; top: -2px;">Restriction on variants</b>
                  </q-item-label> -->
                              <!-- <q-card-section class="q-pt-none q-px-none">
                                Due to limitations with Shopify on the number of
                                variants and options that can be added to a
                                product, Catalog Manager only push the products
                                that are having less than 100 variants and 3
                                options. Entire product feed is available for
                                you through exports.
                              </q-card-section> -->
                              <q-card-section class="q-pt-none q-px-none">
                                Shopify accepts only one category to be tagged
                                to a product through imports. To overcome this,
                                first import the tags file in to your Shopify
                                store and then import the product file.
                              </q-card-section>
                            </div>
                            <div class="bg-primary q-pa-sm text-white">
                              <span>Do you have more questions on Shopify
                                Integration?</span>
                              <a href="/faqs" target="_blank" class="text-white text-underline"
                                style="opacity: 1; text-decoration: underline">
                                Here are some answers!</a>
                            </div>
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
      require("src/components/features/settings/apps/config/catalog-grid.vue")
        .default,
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const sname = ref(null);
    const skey = ref(null);
    const IsCredOpen = ref(true);
    const isPwd = ref(true);
    const IsSyncOpen = ref(false);
    var expandedSupplier = ref({});
    const suppliers = computed(
      () => $store.getters["home/getCatalogsTableRows"]
    );
    const getShop = () => {
      $store.dispatch("shopify/getShopifyCredentials").then((x) => {
        if (x.configuration) {
          let shop = JSON.parse(x.configuration);
          sname.value = shop.shopname;
          skey.value = shop.shopkey;
        }
      });
    };
    onBeforeMount(async () => {
      await $store.dispatch("home/getCatalogDetails");
    });
    onMounted(() => {
      getShop();
    });
    return {
      suppliers,
      shopifyName: computed(() => $store.getters["shopify/getShopifyName"]),
      shopifyKey: computed(() => $store.getters["shopify/getShopifyKey"]),
      sname,
      IsCredOpen,
      IsSyncOpen,
      expandedSupplier,
      skey,
      isPwd,
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
              getShop();
            } else {
            }
          });
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

<style>
.shopify-title {
  font-size: 1.15rem;
}

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
