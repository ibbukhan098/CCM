<template>
  <q-page>
    <!-- <p class="text-h6 q-mt-lg q-px-lg text-black">Shopify Product Sync</p> -->
    <q-card class="my-card" flat>
      <q-card-section class="row" horizontal>
        <q-card-section class="col-8">
          <div>           
            <q-form @submit="syncProduct" @reset="onReset" class="q-gutter-md">
              <q-list bordered padding class="q-ma-lg q-pa-lg q-pl-xl q-ml-xl justify-center">
                <!-- <q-item-label class="text-h6 text-black text-bold" header
                  >Shopify Details</q-item-label
                > -->
                  <q-item class="q-pa-md q-gutter-lg justify-center">
                   <q-item-section class="col-3 text-subtitle1 text-bold text-primary">Shopify Fields</q-item-section>
                   <q-item-section class="col-6 text-subtitle1 text-bold text-primary">Catalog Fields</q-item-section>
                   <q-item-section class="col-2 text-subtitle1 text-bold text-primary">Update</q-item-section>
            </q-item>
                <q-item
                  class="q-pa-md q-gutter-lg justify-center"
                  v-for="(item, index) in productData"
                  v-bind:key="item.label"
                >
                  <q-item-section class="col-3">
                    <q-item-label class="text-black">{{ item.label }}</q-item-label>
                    <!-- <q-item-label caption class="text-black">
                      Set the content filtering level to restrict apps that can
                      be downloaded and used later
                    </q-item-label> -->
                  </q-item-section>
                  <q-item-section class="col-6">
                    <q-item-label>Map</q-item-label>
                    <div
                      class="q-gutter-md row"
                      v-if="
                        item.property == 'categories' ||
                        item.property == 'tags' ||
                        item.property == 'attributes' ||
                        item.property == 'default_attributes'
                      "
                    >
                      <q-select
                        v-model="propertyValues[index]"
                        use-input
                        dense
                        multiple
                        input-debounce="0"
                        :options="options"
                        @filter="filterFn"
                        style="width: 250px"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                    <div
                      class="q-gutter-md row"
                      v-if="
                        item.property != 'categories' &&
                        item.property != 'tags' &&
                        item.property != 'attributes' &&
                        item.property != 'default_attributes'
                      "
                    >
                      <q-select
                        v-model="propertyValues[index]"
                        use-input
                        dense
                        input-debounce="0"
                        :options="options"
                        @filter="filterFn"
                        style="width: 250px"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </q-item-section>
                  <q-item-section class="col-2">
                    <q-item-label></q-item-label>
                    <q-checkbox
                      v-model="productUpdate[index]"
                      val="orange"
                      color="primary"
                    />
                  </q-item-section>
                </q-item>
                <div class="col-12 q-mt-sm q-mr-xl text-right">
                  <q-btn
                    color="primary"
                    type="submit"
                    icon-right="mdi-plus-circle-outline"
                    label="Add Now"
                    class="q-ml-md q-mt-lg q-py-sm"
                  />
                  <q-btn
                  @click="updateNow"
                    color="primary"
                    type="button"
                    icon-right="update"
                    label="Update Now"
                    class="q-ml-md q-mt-lg q-py-sm"
                  />
                </div>
              </q-list>
            </q-form>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
// import { defineComponent } from 'vue';
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { ref, reactive, computed, inject, onBeforeMount, onMounted } from "vue";
import { merge } from "lodash";

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

export default {
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const selection = ref(false);
    const csvCols = computed(() => $store.getters["woocommerce/getCSVCols"]);
    // const wooCols = ref([]);
    const options = ref(null);
    const model = ref(null);
    const modelOption = ref(false);
    const type = ref(null);
    const typeOption = ref(false);
    const rPrice = ref(null);
    const priceOption = ref(false);
    const description = ref(null);
    const descriptionOption = ref(false);
    const shortDescription = ref(null);
    const shortOption = ref(false);
    const categories = ref(null);
    const categoryOption = ref(false);
    const images = ref(null);
    const imageOption = ref(false);
    const propertyValues = reactive([]);
    const productData = reactive([]);
    const productUpdate = reactive([]);
    onBeforeMount(() => {
      $store.dispatch("shopify/getProductData");
    });
    onMounted(() => {
      options.value = csvCols.value;
      let productColumns = $store.getters["shopify/getShopifyFields"]
      productColumns.forEach((val,index) => {
          productUpdate[index] = false
      });
    });
    return {
      selection,
      model,
      modelOption,
      type,
      typeOption,
      rPrice,
      priceOption,
      description,
      descriptionOption,
      shortDescription,
      shortOption,
      categories,
      categoryOption,
      options,
      productUpdate,
      productData: computed(() => $store.getters["shopify/getShopifyFields"]),
      csvCols,
      //   wooCols: computed(()=> $store.getters['woocommerce/getProduct']),
      images,
      imageOption,
      propertyValues,
      updateNow(){
        let updatedProperties = [];
        let productFields = $store.getters["shopify/getShopifyFields"];
        for (let index = 0; index < productFields.length; index++) {
          if (productUpdate[index] !== false) {
            let propertyValue = propertyValues[index];
            if (propertyValue === undefined) {
              updatedProperties.push("");
            } else {
              updatedProperties.push(propertyValue);
            }
          }
        }

        let productUpdated={
            selectedFields:productUpdate,
            propertyValues
          }
        $store.dispatch("shopify/storeUpdatedMapData", productUpdated);
      },
      syncProduct() {
        let updatedProperties = [];
        let productFields = $store.getters["shopify/getShopifyFields"];
        if(propertyValues[0] == undefined){
            $q.notify({
            type: "negative" ,  
            position: "top-right",
            message: "Product name mandatory",
            timeout: 1000,
          });
        }else{
          for (let index = 0; index < productFields.length; index++) {
            if (productUpdate[index] !== false) {
              let propertyValue = propertyValues[index];
              if (propertyValue === undefined) {
                updatedProperties.push("");
              } else {
                updatedProperties.push(propertyValue);
              }
            }
          }

          let productCreate={
            selectedFields:productUpdate,
            propertyValues
          }
          // productFields.forEach((element, index) => {
          //   if (!productUpdate[index]) {
          //     updatedProperties.push("");
          //   } else {
          //     if (productData[index] === undefined) {
          //       updatedProperties.push("");
          //     } else {
          //       updatedProperties.push(productData[index]);
          //     }
          //   }
          // });
          $store.dispatch("shopify/storeMapData", productCreate);
        }
      },
      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          options.value = csvCols.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      onReset() {
        // name.value = null
        // age.value = null
        // accept.value = false
      },
    };
  },
};
</script>
