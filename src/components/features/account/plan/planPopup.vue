<template>
 

      <q-card class="my-card justify-around" >
               <div class="row  items-center" style="padding: 10px" >
                  <q-item-label class="text-caption text center" style="margin-left: 5px">
                 Company
                 Name </q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="name"
            placeholder=""
            style="min-width: 300px; padding-left: 8px"
            class="q-pr-md"
            lazy-rules
        :rules="[
          val => !!val || '* REQUIRED',
          val => val.length >=  8 || 'PLEASE USE MINIMUM 8 CHARACTER',
        ]"
        />
              </div>
               <!-- <div class="row q-gutter-md q-pb-lg items-center">
                  <q-item-label class="text-caption text" style="margin-top: 20px" >
             Notification E-mail</q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="NotificationEmail"
            placeholder=""
            style="min-width: 300px"
            class="q-pr-md"
        />
              </div> -->
                <div class="row  items-center" style="padding: 10px">
                  <q-item-label class="text-caption text center" style="margin-left: 5px">
                Country </q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="name"
            placeholder=""
            style="min-width: 300px; padding-left: 8px"
            class="q-pr-md"
            lazy-rules
        :rules="[
          val => !!val || '* REQUIRED',
          val => val.length >=  8 || 'PLEASE USE MINIMUM 8 CHARACTER',
        ]"
        />
              </div>
               <div class="row  items-center" style="padding: 10px">
                  <q-item-label class="text-caption text center" style="margin-left: 5px">
                 Address </q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="name"
            placeholder=""
            style="min-width: 300px; padding-left: 8px"
            class="q-pr-md"
             lazy-rules
        :rules="[
          val => !!val || '* REQUIRED',
          val => val.length >=  8 || 'PLEASE USE MINIMUM 8 CHARACTER',
        ]"
        />
              </div>
                <div class="row  items-center" style="padding: 10px">
                  <q-item-label class="text-caption text center" style="margin-left: 5px">
                 City </q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="name"
            placeholder=""
            style="min-width: 300px; padding-left: 8px"
            class="q-pr-md"
            lazy-rules
        :rules="[
          val => !!val || '* REQUIRED',
          val => val.length >=  8 || 'PLEASE USE MINIMUM 8 CHARACTER',
        ]"
        />
              </div>
                <div class="row  items-center" style="padding: 10px">
                  <q-item-label class="text-caption text center" style="margin-left: 5px">
                 State </q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="name"
            placeholder=""
            style="min-width: 300px; padding-left: 8px"
            class="q-pr-md"
            lazy-rules
        :rules="[
          val => !!val || '* REQUIRED',
          val => val.length >=  8 || 'PLEASE USE MINIMUM 8 CHARACTER',
        ]"
        />
              </div>
               <!-- <div class="row q-gutter-md q-pb-lg items-center">
                  <q-item-label class="text-caption text" style="margin-top: 20px" >
             Tax ID/VAT </q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder=""
            style="min-width: 300px"
            class="q-pr-md"
        />
              </div> -->
                <div class="row  items-center" style="padding: 10px">
                  <q-item-label class="text-caption text center" style="margin-left: 5px">
                 Zip Code </q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="name"
            placeholder=""
            style="min-width: 300px; padding-left: 8px"
            class="q-pr-md"
            lazy-rules
        :rules="[
          val => !!val || '* REQUIRED',
          val => val.length >=  8 || 'PLEASE USE MINIMUM 8 CHARACTER',
        ]"
        />
              </div>
               <!-- <div class="row q-gutter-md q-pb-lg items-center">
                  <q-item-label class="text-caption text" style="margin-top: 20px">
                Purchase </q-item-label>
               <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder=""
            style="min-width: 300px"
            class="q-pr-md"
        />
              </div>        -->
               <div class="row q-gutter-sm justify-end btn" style="padding-right: 10px">
           <q-btn
                style="
                  background: #5a68c2;
                  color: white;
                  padding: 10px 20px;
                  border-radius: 0;
                "
                class="btn"
                label="save"
                @click="save"
              />
           </div>
      </q-card>
</template>

<script>



import { ref, computed, onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
      //   const $store = useStore();
      //   const saveaddress = ref({});
        const city = ref(null);
      const state = ref(null)
      const countryName = ref(null);
      const zipCode = ref(null)
      const addressName = ref(null)
      
      const save = () => {
         //  let AddressDetails = {
         //    "addressName": addressName.value,
         //    "city": city.value,
         //    "state": state.value,
         //   "countryName": countryName.value,
         //    "zipcode": zipCode.value
         //  }
         //  $store.dispatch("common/saveaddress", AddressDetails)
         //   .then(response=>{
         //  saveaddress.value = response
         //   })
      }

      return {
         //  saveaddress,
          save, city,state,countryName,zipCode,addressName
      }
    }
}
</script>


<style lang="scss" scoped>

.text {
  width: 20% !important;
  padding: 5px;
   font-weight: bold;
}


.my-card {
   height: 60% !important;
    padding-top: 21px;
}
</style>