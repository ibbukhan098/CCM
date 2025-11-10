<template>    
  <q-separator />
   <div class="q-pa-md"  style="min-width: 350px">
        <div class="row q-my-lg">
          <div class="col-6">
            <h6 class="text-subtitle1 q-ma-none col-12 text-bold text-primary"> 
              Woocommerce Mapping </h6>
          </div>
          <div class="col-4">
          <q-input
            outlined
            clearable
            debounce="100"
            dense
            v-model="keyword"
            @clear="onClear"
            placeholder="Search by Supplier Name"
          />
        </div>
          <div class="col-3 text-right">
             <!-- <q-select       
             dense                      
                            label="Select the time to Schedule"
                            v-model="selectedTime"
                            :options="scheduleTime"
                            @update:model-value="scheduleClick"
                            /> -->
          </div> 
          <div class="col-3 text-right" v-if="suppliers.length > 0">  
             <!-- <q-badge
                            style="padding: 10px 20px"
                            :color="getColor(true)"
                            :label="getLabel(true)"
                            :text-color="getTextColor(true)"
                        ></q-badge>           -->
              <!-- <q-btn
                  color="primary"
                  class="q-ml-md"
                  type="submit"
                  @click="saveMapData"
                  label="Save All"
                  />  -->
          </div> 
        </div>
        <q-list class="rounded-borders" v-show="propertyValues">
          <q-item header-class="bg-grey-1 text-primary" v-for="(supplier) in filterSuppliers" :key="supplier.id">
        <q-item-section>
              <!-- <template v-slot:header> -->
               <div class="row full-width">
                <div class="col-7">
                    <p class="q-mb-none text-primary">{{ supplier.name }}</p>
                        <!-- <span class="text-body2 text-black f-12">
                           Not Yet Scheduled
                        </span> -->
                </div>
                <div class="col-2 text-center" v-if="propertyValues[supplier.id]">
                
                </div>
                <div class="col-1 text-center">
                </div>
                <div class="col-2 text-center">
                          <!-- <q-btn color="primary" class="q-ml-md" label="Sync Now" @click="scheduleSync(supplier)"/> -->
                         <!-- <q-btn color="primary" class="q-ml-md w-25" icon="mdi-arrow-down-bold-circle" @click="downloadImports(supplier)"/> -->
                <q-btn   v-if="account.plan.downloads == true"  flat round color="primary" icon="mdi-download" no-caps @click="downloadImports(supplier)"><div style="display:none;">ada</div></q-btn>
                </div>                
              </div>
                  <q-separator />  
            <!-- </template> -->
        </q-item-section>
      </q-item>         
        </q-list>
      </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";
import { useQuasar, date,QSpinnerClock} from "quasar";


export default {  
  props: {},
  emits: ['showSyncDiv'],
  setup(props, {emit}){
      const $store = useStore()
      const $q = useQuasar()
      const selectedTime = ref("10:00");
      const suppliers = computed(() => $store.getters["home/getCatalogsTableRows"]);
      const csvCols = computed(() => $store.getters["woocommerce/getCSVCols"]);
      const options = ref(null);
      const propertyValues = ref({});
      const sampleProperty = ref([]);
      const productData = computed(() => $store.getters["woocommerce/getPropertyFields"])
      const defaultMapData = computed(() => $store.getters["woocommerce/defaultMapData"])
      const productUpdate = reactive([]);
      const syncData = ref([]);
      const showEdit = ref(false);
      const mappedFields = ref([]);
       let keyword = ref("");
    let filterSuppliers = computed(() => {
      return suppliers.value.filter(({ name }) =>
        name.toLowerCase().includes(keyword.value.toLowerCase())
      );
    });
      onBeforeMount(async () => {
           let storedMapValues = await $store.dispatch("woocommerce/getMapData")
           $store.dispatch("home/getCatalogDetails").then(suppliers=>{
             let data = productData.value
             let defaultData = $store.getters["woocommerce/defaultMapData"]
             suppliers.forEach(supplier=>{
               let defaultMapData = storedMapValues.filter(x=>x.supplierId == supplier.id)
               let localData = []; let updateIndex = []
               propertyValues.value[supplier.id] = {}
               propertyValues.value[supplier.id]["Map"] = []
               data.forEach((val, index)=>{
                  if(defaultMapData.length > 0 && defaultMapData[0].mappedData && defaultMapData[0].mappedData[val.property]){
                      localData[index] =  defaultMapData[0].mappedData[val.property]
                      updateIndex[index] = true
                  }
                   else if(defaultMapData.length > 0 && defaultMapData[0].mappedData && !defaultMapData[0].mappedData[val.property]){
                     localData[index] = defaultData[val.property]
                     updateIndex[index] = false
                  }
                  else{
                    localData[index] = defaultData[val.property]
                    updateIndex[index] = true
                  }
               })
               propertyValues.value[supplier.id]["Map"] = localData
                
                propertyValues.value[supplier.id]["IsUpdate"] = updateIndex
                let mapData = {
                  accountId : parseInt(localStorage.getItem('accountId')),
                  scheduleTime : supplier.scheduleTime ? supplier.scheduleTime : "10:00",
                  supplierId : supplier.id,
                  mappedData : localData,
                }
                syncData.value.push(mapData)
              })
          })
      })
      onMounted(() => {
          options.value = csvCols.value;
          let productColumns = $store.getters["shopify/getShopifyFields"]
          productColumns.forEach((val,index) => {
              productUpdate[index] = true
          });
        });

        const downloadImports = async(supplier) => {
          $q.loading.show({
            spinner: QSpinnerClock,
            spinnerColor: "indigo",
            backgroundColor: "white",         
          })
          await $store.dispatch('woocommerce/download', supplier)
          $q.loading.hide()
        }
      return{   
         account: computed(()=> $store.getters["auth/getAccountData"]),     
        sampleProperty,
        getColor: (value) => (value ? "light-green-2" : "red-2"),
        getLabel: (value) => (value ? "Scheduler Running" : "Scheduler Not Running"),
        getTextColor: (value) => (value ? "green-10" : "red-10"),
        scheduleTime: computed(() => $store.getters["common/getFTPTimes"]),
        schedule: ref(false),
        mappedFields,
        suppliers, productUpdate, options, propertyValues, showEdit, productData,defaultMapData,
        getDate(pDate){
          return date.formatDate(pDate, 'DD HH:MM A MMM')
        },
             onClear() {
        keyword.value=""
      },
        editMap(supplier){   
           
          //  let IsExist = syncData.value.findIndex(x=> x.supplierId == supplier.id)       
          //  let pdata = IsExist >= 0 ? syncData.value[IsExist].mappedData : defaultMapData.value

          //   showEdit.value = true 
        },
        saveMapData(){
             Object.entries(propertyValues.value).forEach(([key, value]) => {
                let data = {}
                value.IsUpdate.forEach((bool,index) => {
                    if(bool == true){                         
                         data[productData.value[index].property] = value.Map[index]
                    }
                });
                let filteredIndex  = syncData.value.findIndex(x=>x.supplierId==parseInt(key))                
                filteredIndex >= 0 ? syncData.value[filteredIndex].mappedData = data : ''  
                syncData.value[filteredIndex].scheduleTime = selectedTime.value              
            })
            $store.dispatch('woocommerce/saveAll', syncData.value)
        },
        saveMap(supplier, IsAll){
            showEdit.value = false
            let pdata = {}; let mapData = {}; let updateData = {};
                          Object.entries(propertyValues.value).forEach(([key, value]) => {
                let data = {}
                value.IsUpdate.forEach((bool,index) => {
                    if(bool == true){                         
                         data[productData.value[index].property] = value.Map[index]
                    }
                });
                let filteredIndex  = syncData.value.findIndex(x=>x.supplierId==parseInt(key))                
                filteredIndex >= 0 ? syncData.value[filteredIndex].mappedData = data : ''  
                syncData.value[filteredIndex].scheduleTime = selectedTime.value              
            })
            
            let finalObject = syncData.value.filter(x=> x.supplierId == supplier.id)                        
              syncData.value = syncData.value.map(x=>{
                let mdata = Object.assign({}, x)
                mdata.mappedData = finalObject[0].mappedData
                return mdata
              })
            $store.dispatch('woocommerce/saveAll', syncData.value)
        },
        changeSyncDiv(bool , supplier){
          let IsExist = syncData.value.findIndex(x=> x.supplierId == supplier.id)
          mappedFields.value = IsExist >= 0 ? syncData.value[IsExist].mappedData : defaultMapData.value
          if(bool == true){
             this.editMap(supplier)
          }
        },
        updateSync(supplier){
            let IsExist = syncData.value.findIndex(x=> x.supplierId == supplier.id)
            let finalObject;
            if(IsExist >= 0){
              let objectData = syncData.value[IsExist]
              finalObject = {
                  accountId : localStorage.getItem('accountId'),
                  scheduleTime : supplier.scheduleTime ? supplier.scheduleTime : '00:00',
                  supplierId : supplier.id,
                  mappedData : objectData.updateData
              }
            }
            else{
               $q.notify({
                      type: 'negative',
                      position: 'top',
                      message: 'Select check box to update',
              })
            }
        },
        scheduleSync(supplier){          
           Object.entries(propertyValues.value).forEach(([key, value]) => {
                let data = {}
                value.IsUpdate.forEach((bool,index) => {
                    if(bool == true){                         
                         data[productData.value[index].property] = value.Map[index]
                    }
                }); 
                let filteredIndex  = syncData.value.findIndex(x=>x.supplierId==parseInt(key))                
                filteredIndex >= 0 ? syncData.value[filteredIndex].mappedData = data : ''  
                syncData.value[filteredIndex].scheduleTime = selectedTime.value                            
            })
          let finalObject = syncData.value.filter(x=> x.supplierId == supplier.id)          
          $store.dispatch('woocommerce/saveAll', finalObject)         
        },
      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          options.value = csvCols.value.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    downloadImports, filterSuppliers,keyword,
        selectedTime
      }
  }
}
</script>

<style>

</style>