<template>
<div>
  <q-separator />
  <div class="q-pa-md" style="min-width: 350px">
    <div class="row justify-between q-my-lg">
      <div class="col-5">
        <h6 class="text-subtitle1 q-ma-none col-12 text-bold text-primary">
          Schedule Configurations
        </h6>
      </div>
      <div
        class="col-7 schedule-config-grid row justify-between q-pl-lg q-pr-xl"
      >
        <div class="col-4">
          <q-input
            outlined
            clearable
            debounce="100"
            dense
            v-model="keyword"
            @clear="onClear"
            placeholder="Search by Supplier Name"
          ><div style="display:none">ada</div></q-input>
        </div>
        <div class="col-3 text-right justify-end">
          <q-select
            class="items-center justify-center"
            dense
            label="Select the time to Schedule"
            v-model="selectedTime"
            :options="scheduleTime"
            @update:model-value="scheduleClick"
          />
        </div>
        <div class="col-3 text-left">
          <q-btn
            v-if="suppliers.length > 0"
            color="primary"
            class=""
            type="submit"
            @click="saveMapData"
            label="Save & Sync All"
          />
        </div>
      </div>
    </div>
    <div class="row" v-if="filterSuppliers.length!==0">
      <div class="col-2 q-pl-md">
        <q-toggle
          class="selectAll"
          :label="statusAll"
          color="primary"
          checked-icon="check"
          unchecked-icon="clear"
         false-value="Select All"
          true-value="Unselect All"
          v-model="statusAll"
          keep-color
          @update:model-value="updateStatusAll(statusAll)"
        ><div style="display:none;">ada</div></q-toggle>
      </div>
    </div>
    <q-list class="rounded-borders" v-show="propertyValues">
      <template v-if="filterSuppliers.length==0">
          <div
            class="full-width full-height text-accent q-gutter-sm"
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
          >
            <img src="~assets/vectors/NoDesign.svg" alt="Login_banner" />
            <span class="norecords"> No Records Found ! </span>
          </div>
        </template>
      <q-expansion-item
        expand-icon-toggle
        expand-separator
        header-class="bg-grey-1 text-primary"
        class="catalog-item"
        v-for="(supplier, index) in filterSuppliers"
        :key="supplier.catalogId"
      >
        <template v-slot:header>
          <div class="row full-width justify-between">
            <div class="col-8 row justify-start">
              <div class="col-1" v-if="propertyValues[supplier.catalogId]">
                <q-toggle
                  v-model="propertyValues[supplier.catalogId].isEnabled"
                  checked-icon="check"
                  color="primary"
                  unchecked-icon="clear"
                  keep-color
                />
              </div>
              <div class="col-6 column justify-center">
                <p class="q-mb-none">{{ supplier.catalogName }}</p>
                <span
                  class="text-body2 text-black f-12"
                  v-if="propertyValues[supplier.catalogId]"
                >
                  {{
                    propertyValues[supplier.catalogId].LastScheduled == 0
                      ? "Not Yet Scheduled"
                      : "Last Synced At " +
                        getDate(propertyValues[supplier.catalogId].LastScheduled)
                  }}
                </span>
              </div>
            </div>
            <div class="col-4 row justify-between q-pr-md">
              <div
                class="col row items-center justify-center text-center"
                v-if="propertyValues[supplier.catalogId]"
              >
                <q-badge
                  style="padding: 10px 20px; height: 36px"
                  :color="getColor(propertyValues[supplier.catalogId].IsProgress)"
                  :label="getLabel(propertyValues[supplier.catalogId].IsProgress)"
                  :text-color="
                    getTextColor(propertyValues[supplier.catalogId].IsProgress)
                  "
                ></q-badge>
              </div>
              <div class="col column justify-center items-center text-center">
                <q-btn
                   v-if="account?.plan?.isTrail == false" flat round color="primary" icon="mdi-download" no-caps
                  @click="downloadImports(supplier)"
                ><div style="display:none;">ada</div></q-btn>
              </div>
              <div class="col row items-center justify-center text-center">
                <q-btn
                  color="primary"
                  style="height: 36px"
                  class="q-ml-md"
                  label="Sync Now"
                  @click="scheduleSync(supplier)"
                  :disable="checkDisabled(supplier)"
                />
              </div>
            </div>
          </div>
          <!-- <q-item-section>
                        <p class="q-mb-none">{{ supplier.name }}</p>
                        <span class="text-body2 text-black f-12" v-if="propertyValues[supplier.id]">
                               {{ propertyValues[supplier.id].LastScheduled == 0 ? "No Last Schedule" :  "Last Sync at"+getDate(propertyValues[supplier.id].LastScheduled) }}
                        </span>
                    </q-item-section>
                    <q-item-section>
                    </q-item-section>
                    <q-item-section>
                    </q-item-section>                    -->
          <!-- <q-item-section v-if="propertyValues[supplier.id]">
                        <q-badge
                            style="padding: 10px 20px"
                            :color="getColor(propertyValues[supplier.id].IsProgress)"
                            :label="getLabel(propertyValues[supplier.id].IsProgress)"
                            :text-color="getTextColor(propertyValues[supplier.id].IsProgress)"
                        ></q-badge>
                    </q-item-section> -->
          <!-- <q-item-section class="text-right">
                          <q-btn color="primary" class="q-ml-md w-25" icon="mdi-arrow-down-bold-circle" @click="downloadImports(supplier)"/>
                    </q-item-section> -->
          <!-- <q-item-section>
                          <q-btn color="primary" class="q-ml-md" label="Sync Now" @click="scheduleSync(supplier)"/>
                    </q-item-section> -->
        </template>
        <q-card v-show="propertyValues[supplier.catalogId]">
          <q-card-section>
            <div class="row q-py-sm">
              <div v-show="false" class="col-3">
                <q-select
                  dense
                  label="Select the time to Schedule"
                  v-model="suppliers[index].scheduleTime"
                  :options="scheduleTime"
                  @update:model-value="scheduleClick"
                />
              </div>
              <div class="col-12 text-right">
                <!-- <q-btn color="primary" class="q-ml-md" v-show="!showEdit" label="Edit Mapping" @click="editMap(supplier)"/> -->
                <!-- <q-btn color="primary" class="q-ml-md" v-show="!showEdit" label="Schedule" @click="scheduleSync(supplier, true)"/>                                   -->
                <!-- <q-btn
                                color="primary"
                                class="q-ml-md"
                                type="submit"
                                @click="saveMap(supplier, false)"
                                label="Save"
                                />  -->
                <!-- <q-btn
                  color="primary"
                  class="q-ml-md"
                  type="submit"
                  @click="saveMap(supplier, true)"
                  label="Copy Settings"
                /> -->
              </div>
              <div class="col-12 q-py-md">
                <q-list bordered separator>
                  <q-item class="q-pa-md row q-gutter-lg">
                    <q-item-section class="col-3 text-bold"
                      >WooCommerce Fields</q-item-section
                    >
                    <q-item-section class="col-6 text-bold"
                      >Catalog Fields</q-item-section
                    >
                    <q-item-section class="col-3 text-bold"
                      >Update</q-item-section
                    >
                  </q-item>
                  <q-item
                    class="row"
                    v-for="(item, index) in productData"
                    v-bind:key="item.label"
                  >
                    <q-item-section class="col-3">
                      <q-item-label class="text-black">{{
                        item.label
                      }}</q-item-label>
                      <!-- <q-item-label caption class="text-black">
                      Set the content filtering level to restrict apps that can
                      be downloaded and used later
                    </q-item-label> -->
                    </q-item-section>
                    <q-item-section class="col-6">
                      <div
                        class="q-gutter-md row"
                        v-if="
                          item.property == 'categories' ||
                          item.property == 'tags' ||
                          item.property == 'attributes' ||
                          item.property == 'default_attributes'
                        "
                      >
                        <div v-if="propertyValues[supplier.catalogId]">
                          <q-select
                            v-model="propertyValues[supplier.catalogId].Map[index]"
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
                        <div v-if="propertyValues[supplier.catalogId]">
                          <q-select
                            v-model="propertyValues[supplier.catalogId].Map[index]"
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
                      </div>
                    </q-item-section>
                    <q-item-section class="col-3">
                      <q-item-label></q-item-label>
                      <div v-if="propertyValues[supplier.catalogId]">
                        <q-checkbox
                          v-model="propertyValues[supplier.catalogId].IsUpdate[index]"
                          val="orange"
                          color="primary"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import { useQuasar, date, QSpinnerClock, QSpinnerGears } from "quasar";
import { cloneDeep } from "lodash";

export default {
  props: {},
  emits: ["showSyncDiv"],
  setup(props, { emit }) {
    const $store = useStore();
    const $q = useQuasar();
    const selectedTime = ref("10:00");
    const suppliers = computed(
      () => $store.getters["home/getCatalogsTableRows"]
    );
    let isShopUrlPresent= ref()
    let isShopKeyPresent= ref()
    let isShopSecretPresent=ref()
    const csvCols = computed(() => $store.getters["woocommerce/getCSVCols"]);
    const options = ref(null);
    const propertyValues = ref({});
    const sampleProperty = ref([]);
    const productData = computed(
      () => $store.getters["woocommerce/getPropertyFields"]
    );
    const defaultMapData = computed(
      () => $store.getters["woocommmerce/defaultMapData"]
    );
    const productUpdate = reactive([]);
    const syncData = ref([]);
    const showEdit = ref(false);
    const mappedFields = ref([]);
    let keyword = ref("");
    let filterSuppliers = computed(() => {
      return suppliers.value.filter(({ catalogName }) =>
        catalogName.toLowerCase().includes(keyword.value.toLowerCase())
      );
    });
    onBeforeMount(async () => {
    await $store.dispatch("woocommerce/getCredentials")
    isShopUrlPresent.value = computed(() =>  $store.getters["woocommerce/getWoocommerceUrl"]);
    isShopKeyPresent.value = computed(() =>  $store.getters["woocommerce/getWoocommerceKey"]);
    isShopSecretPresent.value= computed(() =>  $store.getters["woocommerce/getWoocommerceSecret"]);
      let storedMapValues = await $store.dispatch("woocommerce/getMapData");
      selectedTime.value =
        storedMapValues.length > 0 ? storedMapValues[0].scheduleTime : "10:00";
      // let getScheduleStatus = await $store.dispatch(
      //   "woocommerce/getScheduleStatus"
      // );
      
      $store.dispatch("home/getCatalogDetails").then((suppliers) => {
        let data = $store.getters["woocommerce/getPropertyFields"];
        let defaultData = $store.getters["woocommerce/defaultMapData"];
        suppliers.forEach(async (supplier,ind) => {
          let isProgress = false;
          let isEnabled = false;
          let isInProgress = await $store.dispatch(
            "woocommerce/getProgressStatus",
            { supplierId: supplier.catalogId }
          );
          isProgress = isInProgress.catalogStatus; //== "Scheduled" ? "Not Scheduled" : "InProgress"
          let defaultMapData = storedMapValues.filter(
            (x) => x.supplierId == supplier.catalogId
          );
          isEnabled=defaultMapData[0]?.isEnabled === undefined ? false : defaultMapData[0]?.isEnabled
          let localData = [];
          let updateIndex = [];
          propertyValues.value[supplier.catalogId] = {};
          propertyValues.value[supplier.catalogId]["Map"] = [];
          data.forEach((val, index) => {
            if (
              defaultMapData.length > 0 &&
              defaultMapData[0].mappedData &&
              defaultMapData[0].mappedData[val.property]
            ) {
              localData[index] = defaultMapData[0].mappedData[val.property];
              updateIndex[index] = true;
            } else if (
              defaultMapData.length > 0 &&
              defaultMapData[0].mappedData &&
              !defaultMapData[0].mappedData[val.property]
            ) {
              localData[index] = defaultData[val.property];
              updateIndex[index] = false;
            } else {
              localData[index] = defaultData[val.property];
              updateIndex[index] = true;
            }
          });
          propertyValues.value[supplier.catalogId]["Map"] = localData;

          propertyValues.value[supplier.catalogId]["IsProgress"] = isProgress;

          propertyValues.value[supplier.catalogId]["isEnabled"] = isEnabled;

          propertyValues.value[supplier.catalogId]["LastScheduled"] =
            isInProgress.lastScheduled == null ? 0 : isInProgress.lastScheduled;

          propertyValues.value[supplier.catalogId]["IsUpdate"] = updateIndex;
          let mapData = {
            accountId: parseInt(localStorage.getItem("accountId")),
            scheduleTime: supplier.scheduleTime
              ? supplier.scheduleTime
              : "10:00",
            supplierId: supplier.catalogId,
            mappedData: localData,
            isEnabled:isEnabled
          };
          syncData.value.push(mapData);
        });
      });
    });
    onMounted(() => {
      options.value = csvCols.value;
      let productColumns = $store.getters["woocommerce/getPropertyFields"];
      productColumns.forEach((val, index) => {
        productUpdate[index] = true;
      });
    });
    const downloadImports = async (supplier) => {
      $q.loading.show({
        spinner: QSpinnerClock,
        spinnerColor: "indigo",
        backgroundColor: "white",
      });
      await $store.dispatch("woocommerce/download", supplier);
      $q.loading.hide();
    };
    return {
       account: computed(()=> $store.getters["auth/getAccountData"]),
      statusCatalog: ref(false),
     statusAll: ref("Select All"),
      sampleProperty,
      downloadImports,
      keyword,
      getColor: (value) =>
        value == "InProgress"
          ? "green"
          : value == "Scheduled"
          ? "light-green-2"
          : "red-2",
      getLabel: (value) =>
        value == "InProgress"
          ? "InProgress"
          : value == "Scheduled"
          ? "Scheduled"
          : "Not Scheduled",
      getTextColor: (value) =>
        value == "InProgress"
          ? "white"
          : value == "Scheduled"
          ? "black"
          : "red-10",
      scheduleTime: computed(() => $store.getters["common/getFTPTimes"]),
      filterSuppliers,
      schedule: ref(false),
      mappedFields,
      suppliers,
      productUpdate,
      options,
      propertyValues,
      showEdit,
      productData,
      defaultMapData,
      isShopUrlPresent,
      isShopSecretPresent,
      isShopKeyPresent,
      updateStatusAll(val) {
      let bool = val == "Select All" ? false : true;
        for (const key in propertyValues.value) {
          propertyValues.value[key].isEnabled = bool;
        }
      },
      getDate(pDate) {
        return date.formatDate(pDate, "MMM DD HH:MM A");
      },
      scheduleClick() {
        let data = {
          scheduleTime: selectedTime.value,
          accountId: parseInt(localStorage.getItem("accountId")),
        };
        $store.dispatch("woocommerce/storeScheduleTime", data);
      },
      editMap(supplier) {
        //  let IsExist = syncData.value.findIndex(x=> x.supplierId == supplier.id)
        //  let pdata = IsExist >= 0 ? syncData.value[IsExist].mappedData : defaultMapData.value
        //   showEdit.value = true
      },
      checkDisabled(supplier){
        if ((propertyValues.value[supplier.catalogId])?.isEnabled){
          return false
        }
        else{
          return true
        }
      },
      async saveMapData() {
        await $store.dispatch("woocommerce/getCredentials")

        const isShopUrlPresent =$store.getters["woocommerce/getWoocommerceUrl"];
        const isShopKeyPresent = $store.getters["woocommerce/getWoocommerceKey"];
        const isShopSecretPresent= $store.getters["woocommerce/getWoocommerceSecret"];
        if(isShopKeyPresent === "" && isShopUrlPresent === "" &&  isShopSecretPresent==="" ){
          $q.notify({
            type: "negative",
            position: "top",
            message: "Store Url , Consumer Key and Consumer secret is required! ",
          });
          return
        }
        Object.entries(propertyValues.value).forEach(([key, value]) => {
          let data = {};
          value.IsUpdate.forEach((bool, index) => {
            if (bool == true) {
              data[productData.value[index].property] = value.Map[index];
            }
          });
          let filteredIndex = syncData.value.findIndex(
            (x) => x.supplierId == parseInt(key)
          );
          filteredIndex >= 0
            ? (syncData.value[filteredIndex].mappedData = data)
            : "";
          syncData.value[filteredIndex].scheduleTime = selectedTime.value;
          syncData.value[filteredIndex].isEnabled = value.isEnabled;
        });
        let savedata = $store.dispatch("woocommerce/saveAll", syncData.value);
        $q.notify({
          spinner: QSpinnerGears,
          color: "primary",
          message: "Mapping will save shortly...",
          timeout: 2000,
          position: "top",
        });
      },
      onClear() {
        keyword.value=""
      },
      saveMap(supplier, IsAll) {
        showEdit.value = false;
        let pdata = {};
        let mapData = {};
        let updateData = {};
        Object.entries(propertyValues.value).forEach(([key, value]) => {
          let data = {};
          value.IsUpdate.forEach((bool, index) => {
            if (bool == true) {
              data[productData.value[index].property] = value.Map[index];
            }
          });
          let filteredIndex = syncData.value.findIndex(
            (x) => x.supplierId == parseInt(key)
          );
          filteredIndex >= 0
            ? (syncData.value[filteredIndex].mappedData = data)
            : "";
          syncData.value[filteredIndex].scheduleTime = selectedTime.value;
        });

        let finalObject = syncData.value.filter(
          (x) => x.supplierId == supplier.catalogId
        );
        syncData.value = syncData.value.map((x) => {
          let mdata = Object.assign({}, x);
          mdata.mappedData = finalObject[0].mappedData;
          return mdata;
        });
        let storedata = $store.dispatch("woocommerce/saveAll", syncData.value);
        $q.notify({
          spinner: QSpinnerGears,
          color: "primary",
          message: "Settings will apply soon...",
          timeout: 2000,
          position: "top",
        });
      },
      changeSyncDiv(bool, supplier) {
        let IsExist = syncData.value.findIndex(
          (x) => x.supplierId == supplier.catalogId
        );
        mappedFields.value =
          IsExist >= 0
            ? syncData.value[IsExist].mappedData
            : defaultMapData.value;
        if (bool == true) {
          this.editMap(supplier);
        }
      },
      updateSync(supplier) {
        let IsExist = syncData.value.findIndex(
          (x) => x.supplierId == supplier.catalogId
        );
        let finalObject;
        if (IsExist >= 0) {
          let objectData = syncData.value[IsExist];
          finalObject = {
            accountId: localStorage.getItem("accountId"),
            scheduleTime: supplier.scheduleTime
              ? supplier.scheduleTime
              : "00:00",
            supplierId: supplier.catalogId,
            mappedData: objectData.updateData,
          };
        } else {
          $q.notify({
            type: "negative",
            position: "top",
            message: "Select check box to update",
          });
        }
      },
      async scheduleSync(supplier) {

        await $store.dispatch("woocommerce/getCredentials")
        const isShopUrlPresent =$store.getters["woocommerce/getWoocommerceUrl"];
        const isShopKeyPresent = $store.getters["woocommerce/getWoocommerceKey"];
        const isShopSecretPresent= $store.getters["woocommerce/getWoocommerceSecret"];
        if(isShopKeyPresent === "" && isShopUrlPresent === "" &&  isShopSecretPresent==="" ){
          $q.notify({
            type: "negative",
            position: "top",
            message: "Store Url , Consumer Key and Consumer secret is required! ",
          });
          return
        }
        Object.entries(propertyValues.value).forEach(([key, value]) => {
          let data = {};
          value.IsUpdate.forEach((bool, index) => {
            if (bool == true) {
              data[productData.value[index].property] = value.Map[index];
            }
          });
          let currentDate = new Date();
          currentDate = date.addToDate(currentDate, { minutes: 0 });
          currentDate = date.formatDate(currentDate, "HH:mm A");
          let filteredIndex = syncData.value.findIndex(
            (x) => x.supplierId == parseInt(key)
          );
          filteredIndex >= 0
            ? (syncData.value[filteredIndex].mappedData = data)
            : "";
          syncData.value[filteredIndex].scheduleTime = selectedTime.value;
          syncData.value[filteredIndex].isEnabled = value.isEnabled;
        });
        let finalObject = syncData.value.filter(
          (x) => x.supplierId == supplier.catalogId
        );
        let status = await $store.dispatch("woocommerce/saveAll", finalObject);
        propertyValues.value[supplier.catalogId].IsProgress = status.catalogStatus;
      },
      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          options.value = csvCols.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      selectedTime,
    };
  },
};
</script>

<style lang="scss" scoped>
// Variables
$laptop-breakpoint: 1440px;

.catalog-item {
  border-bottom: 1px solid #ccc;
}
// .selectAll {
//   ::v-deep {
//     .q-toggle__label {
//       margin-left: 8px;
//     }
//   }
// }

// .parent ::v-deep(.child) {


.schedule-config-grid {
  @media screen and (min-width: $laptop-breakpoint) {
    padding-right: 0;
  }
}
</style>
