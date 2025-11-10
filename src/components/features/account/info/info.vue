<template>
  <div class="q-pa-md q-gutter-md card">

    <div class="text-h6 q-mb-md text">Account Summary</div>
            <div class="q-pa-md">
           <div class="row items-center q-pa-md">
            
            <div class="col">
                <div class="row">
                  <q-card-section class="col overview flex q-pa-lg">
                    <q-icon name="mdi-archive" color="primary" class="cp" size="md" style="padding: 10px"> </q-icon>
                <q-item-section>
                  <q-item-label class="overview-text"> 
                   NUMBER OF PRODUCTS</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.products }}</q-item-label>

                </q-item-section>
                   </q-card-section>
                  <q-card-section class="col overview flex q-pa-lg">
                 <q-icon name="mdi-barcode" color="primary" class="cp" size="md"> </q-icon>
                <q-item-section class="q-px-md">
                  <q-item-label class="overview-text">NUMBER OF SKUs</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.skUs }}</q-item-label>
                </q-item-section>
              </q-card-section>
              </div>
                 <div class="row">
                  <q-card-section class=" col overview flex q-pa-lg">
                      <q-icon name="mdi-barcode" color="red" class="cp" size="md" style="padding: 10px"> </q-icon>
                <q-item-section >
                  <q-item-label class="overview-text">NUMBER OF SKUs OUT OF STOCK</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.skUsOutOfStock }}</q-item-label>
                </q-item-section>
                </q-card-section>

                     <q-card-section class="col overview flex q-pa-lg">
                         <q-icon name="mdi-file-download-outline" color="primary" class="cp" size="md"> </q-icon>
                <q-item-section  class="q-px-md" >
                  <q-item-label class="overview-text">NUMBER OF DOWNLOADS</q-item-label>
                  <q-item-label class="overview-num">{{ overViewDetails.catalogsDownloaded }}</q-item-label>
                </q-item-section>
                </q-card-section>
                </div>
                        <q-card-section class="col overview flex q-pa-lg" v-if="account.plan">
                          <q-icon v-if="account.plan.detail.aPI == 'true'" name="mdi-cog-outline" color="primary" class="cp" size="md" style="padding: 10px"> </q-icon>
                   <q-item-section v-if="account.plan.detail.aPI == 'true'">
                    <q-item-label class="overview-text">Number of API Requests</q-item-label>
                    <q-item-label class="overview-num">{{ overViewDetails.apiRequested }}</q-item-label>
                  </q-item-section>
                 <q-item-section>
                </q-item-section>
              </q-card-section>
            </div>
          </div>
           </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'


export default {  

//   components: {
//     users: require("src/components/features/profile/users/users.vue").default,
//   },
  setup() {
      const $store = useStore()
      const $q = useQuasar()
      const overViewDetails = ref({})
      onBeforeMount(() => {
        $store.dispatch('home/getOverviewDetails')
        .then(response=>{
          overViewDetails.value = response
        })
      })
      return{
        overViewDetails,
        tab: ref('info'),
        splitterModel: ref(20),
        account: computed(()=> $store.getters["auth/getAccountData"]),
      }
  },
}
</script>

<style lang="scss" scoped>
.overview-num {
  font-weight: bolder;
  font-size: 20px;
  color: $primary-text;
  text-align: justify;

}

.overview-num1 {
  font-weight: bolder;
  font-size: 20px;
  color: $primary-text;
  text-align: justify;
  }

.overview {
    margin: 10px;
    padding: 20px;
}
.icon {
  display: flex;
  justify-content: space-between;
}

.overview-text {
  font-weight: bolder;
  font-size: 12px;
  color:$placeholder;
  min-width: 300px !important;
  width: 100% !important;
}

.card {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%) !important;
    margin-left: 10px;
    overflow: hidden;
}


.archive {
  padding: 8px;
  color: $primary;
}

.barcode {
  padding: 8px;
  color: red;
  width: 20px;
 
}
q-icon {
  width: 100px;
}
.q-gutter-md {
    margin-top: -26px;
}
</style>