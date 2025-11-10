<template>
  <div class="q-mx-sm">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row q-gutter-md items-center">
        <div class="col">
                <p class="text-bold text-body2 q-mb-sm q-pb-none">File Name *</p>
          <q-input
            rounded outlined standout dense
            v-model="filename"
            placeholder = "{supplier_name}_{date}"
            lazy-rules
            :rules="[
              (val) => checkFileName(val),
              (val) => val.length <= 250 || 'FILE SHOULD NOT EXCEED 250 CHARACTERS']"
          ><div style="display:none">ada</div></q-input>
        </div>
        <div class="col">
          <p class="text-bold text-body2 q-mb-sm q-pb-none"> </p>
          <q-btn
                label="Upgrade Plan"
                color="primary"
                size="sm"
                rounded outlined standout
                padding="q-pl-sm"
                v-if="account.plan.downloads == false"
                to="/account/plan"
              >
               <q-badge color="" rounded floating class="upgrade">
                 <i class="mdi mdi-crown" />
               </q-badge>
              </q-btn>
        <q-btn
          v-else
          rounded outlined standout
          label="Save"
          class="q-ml-md"
          type="submit"
          color="primary"
        />
        </div>
      </div>
      <div class="row q-mb-lg">

      </div>
      <div class="q-ma-md q-border">
        <p class="q-ma-md text-weight-small">
          Use the below placeholders to define a name format for all your
          exports.
        </p>
        <div class="q-mb-sm q-mt-md q-ml-md q-my-none">
          <p class="q-my-xs"><span class="text-weight-medium">{supplier_name}</span> for supplier name</p>
          <p class="q-my-xs"><span class="text-weight-medium">{date}</span> for date</p>
          <p class="q-my-xs"><span class="text-weight-medium">{date_time}</span> for date time</p>
        </div>
        <p class="q-mx-md text-weight-small">
          Examples: <span class="text-weight-medium">{supplier_name}_{date}, {supplier_name}_CCM_DATA</span>
        </p>
       <p class="q-mx-md export-info"><span class="notify"><i class="mdi mdi-information-outline"/></span>Shopify and WooCommerce exports wil be appended with "_Shopify" and "_WooCommerce" respectively.</p>
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    let filename = ref();
    // const filename = computed(()=>{
    //   get:()=>$store.state.common.exportFileName
    // });
    const isdatestamp = ref(false);
    onBeforeMount(async () => {
      let data = await $store.dispatch("common/getConfigDetails");
      const updatedFileName = data.fileName === null ? '' : data.fileName
      filename.value = updatedFileName
    });
    const checkFileName = (val) => {
      const format = /[!@#$%^&*()+\-=\[\];':"\\|,.<>\/?]/;
      let isAllowedSpecialCharacters = format.test(val);
      if(val?.length <= 0){
        return "FILENAME IS REQUIRED";
      }
      if (isAllowedSpecialCharacters) {
        return "SPECIAL CHARACTERS ARE NOT ALLOWED";
      }
      const paramsPattern = /[^{\}]+(?=})/g;
      let extractParams = val.match(paramsPattern);
      let isValid = false
        for(let eachEl = 0 ; eachEl < extractParams?.length ; eachEl++){
          if(extractParams?.length > 0){
          if(extractParams[eachEl] === "supplier_name" || extractParams[eachEl] === "date" || extractParams[eachEl] === "date_time"){
            isValid = true
          }else{
            isValid = false
            break
          }
        }
        }
      if(extractParams?.length === 0 || extractParams === null){
        if(val.length === 0){
          return "FILE NAME IS REQUIRED"
        }
        return
      }

      if(!isValid) return "INVALID FORMAT"

    };
    return {
      filename,
      checkFileName,
      isdatestamp,
      popup: ref(false),
      account: computed(() => $store.getters["auth/getAccountData"]),
      onSubmit() {
        let exportDetails = {
          fileName: filename.value,
          enableTime: false,
        };
        $store.dispatch("common/addExportData", exportDetails);
      },
    };
  },

  components: {
    "select-plans-dialog":
      require("src/components/features/account/plan/getPlan.vue").default,
  },
};
</script>

<style lang="scss" scoped>
.upgrade{
  padding: 5px;
  margin: -5px;
  background: #fbbe28;
}
  .export-info{
        color: #ffffff;
    background-color: #5a68c2;
    padding: 4px 12px;
    border-radius: 2px;
    display: inline-block;
  }
 .export-info i.mdi-info-outline {color: #000;}
 .export-info i.mdi.mdi-information-outline {padding-right: 7px;font-size: 18px;vertical-align: middle;}
 .notify{
   float: left;
 }
</style>
