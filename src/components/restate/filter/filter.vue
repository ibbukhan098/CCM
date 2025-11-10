<template>
  <div class="q-pa-md filter-div">
    <div class="">
      <!-- <p>{{kv}}</p> -->
      <q-form @submit="onSubmit" class="q-mt-xs q-gutter-md">
        <q-select
          outlined
          dense
          v-model="model"
          :options="optionsNumber"
          label="Filter Type"
        />
        <div v-if="model == 'Contains'">
          <q-input dense outlined v-model="text" label="Filter..." />
        </div>
        <div v-if="model== 'Between'">
          <q-input :mask="maskValue" dense outlined v-model="text" class="between-input" label="From" />
          <q-input :mask="maskValue" dense outlined v-model="text1" label="To"/>
        </div>
        <div class="row justify-between">
          <q-btn v-close-popup
            label="Reset"
           @click='onReset'
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn label="Apply" type="submit" color="primary"  v-close-popup  />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
      props:{
        kv:String
      },

  setup(props) {
    const $store = useStore();
    const model=ref(null)
    const text=ref(null)
    const text1=ref(null)
    let maskValue=ref(null)
    onBeforeMount(()=>{
      if(props.kv=="publishedDate" || props.kv=="subscribedDate"){
        maskValue.value="##-##-####"
      }
      else{
        maskValue.value="#######"
      }
    })
    const onSubmit=()=>{
      if(model.value==="Contains"){
         $store.dispatch("home/sendData",{option:model.value,input:text.value,label:props.kv})
      }
      else{
         $store.dispatch("home/sendData1",{option:model.value,input:[text.value,text1.value],label:props.kv})
      }

    }
    const onReset=()=>{
      $store.dispatch("home/getCatalogDetails")
    }
    return {
      model,
      maskValue,
      text,
      text1,
      optionsDate: ["Contains"],optionsNumber: ["Between"],onSubmit,onReset
    };
  },
};
</script>
<style lang="scss" scoped>
.between-input{
  margin-bottom: 5px;
}
</style>
