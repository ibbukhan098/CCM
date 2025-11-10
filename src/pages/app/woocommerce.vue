<template>
  <q-page>
    <p class="text-h4">WooCommerce Product Sync</p>
     <q-card class="my-card" flat>
      <q-card-section class="row" horizontal>
        <q-card-section class="col-12"> 
          <div>
             <q-form
      @submit="syncProduct"
      @reset="onReset"
      class="q-gutter-md"
    >
            <q-list bordered padding>
              <q-item-label header>Prodcut Details</q-item-label>
 <q-item class="q-pa-md" v-for="(item,index) in productData" v-bind:key="item.label">
        <q-item-section class="col-4">
           <q-item-label>{{item.label}}</q-item-label>
                  <q-item-label caption>
                    Set the content filtering level to restrict
                    apps that can be downloaded
                  </q-item-label>
        </q-item-section>
        <q-item-section class="col-6">
                <q-item-label>Map</q-item-label>
         <div class="q-gutter-md row" 
         v-if="item.property == 'categories' || item.property == 'tags' || item.property == 'images' || 
         item.property == 'attributes' || item.property == 'default_attributes'">
      <q-select
        v-model="propertyValues[index]"
        use-input
        dense
        multiple
        input-debounce="0"        
        :options="options"
        @filter="filterFn"
        style="width: 250px">
       <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="q-gutter-md row" 
         v-if="item.property != 'categories' && item.property != 'tags' && item.property != 'images' && 
         item.property != 'attributes' && item.property != 'default_attributes'">
      <q-select
        v-model="propertyValues[index]"
        use-input
        dense
        input-debounce="0"        
        :options="options"
        @filter="filterFn"
        style="width: 250px">
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
      <q-checkbox v-model="modelOption" val="orange" label="Updated" color="orange" />
        </q-item-section>
      </q-item>          
      <q-separator spaced inset />
          <q-btn color="positive" type="submit" icon="mail" icon-right="send" label="Sync Now" />
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
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import { ref, reactive, computed, inject, onBeforeMount, onMounted } from 'vue'
import { merge } from 'lodash'

const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]

export default{
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const selection = ref(false);
    const csvCols = computed(()=> $store.getters['woocommerce/getCSVCols']);
    const wooCols = ref([]);
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
    onBeforeMount(() => {
      $store.dispatch('woocommerce/getProductData')
    });
    onMounted(() => {
      options.value = csvCols.value
    })
    return{
      selection,     
      model,modelOption,
      type,typeOption,
      rPrice,priceOption,
      description,descriptionOption,
      shortDescription,shortOption,
      categories,categoryOption,
      options,      
      productData: computed(()=> $store.getters['woocommerce/getProduct']),
      csvCols,
      wooCols: computed(()=> $store.getters['woocommerce/getProduct']),
      images,imageOption,
      propertyValues,
      syncProduct(){
          $store.dispatch('woocommerce/storeMapData', propertyValues);
      },
      filterFn (val, update, abort) {
        update(() => {
          const needle = val.toLowerCase()
          options.value = csvCols.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      },
       onReset () {
        // name.value = null
        // age.value = null
        // accept.value = false
      } 
  }
}
}
</script>
