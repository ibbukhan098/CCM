<template>
  <h1 class="text-h6 titleUnderline">Integrations</h1>
    <div class="reminder q-pa-sm q-ml-md q-mt-lg text-black">
       <div>
       <img
             src="~src\assets\images\reminder1.png" class="reminder-icon" alt="woo-commerce"
           />
      </div>
      <div class="q-pa-xs q-ml-sm">
       <p class="intText">Only one integration is allowed for an account, choosing one app will lock the other app. To use both Shopify and WooCommerce, please raise a request 
       <a href="/contactus"  class="text-primary text-underline " style="opacity: 1; text-decoration: underline">
              here
       </a>
       </p>
       </div>
    </div>
  <div style="margin-top:30px" class="row">
  <div class="q-pa-md row items-start q-gutter-md" style="height: 76vh">
    <q-card style="padding:10px; max-height: 300px;" class="box-shadow my-card box-shadow border-radius" flat bordered>
      <div :style="shopifyDisable==true ? ' opacity:0.8;cursor:not-allowed':''"> 
      <div class="image-container">
        <img
          src="~assets\images\ccm-shopify.jpg" class="shopify-image" fit="contains" alt="shopify"
        />
      </div>
      <q-card-section>
        <div class="text-h6 q-mt-sm q-mb-xs">Shopify</div>
        <div class="text-caption" style="color=#929DB9 !important">
          Connect to your Shopify store to sync catalogs automatically. 
        </div>
      </q-card-section>
      <q-card-actions> 
         <div v-if="shopifyOpen" class="stats row items-center q-mr-lg">
            <div class="text-caption q-pa-sm q-ml-xs q-mr-xs">
          Installed
           <q-icon name="mdi-check-all" style="font-size:1.25em;"/>
        </div>
         </div>
        <q-btn v-if="!shopifyDisable" class="connect-button" style="max-width: 250px; cursor-pointer background: #fff; border: 1px solid #c8ccc9; border-radius: 6px" flat color="primary" no-caps  :label="shopifyOpen==true ? 'Open':'Install'" @click="toConfig" ><q-icon name="mdi-chevron-right"/></q-btn>
         <q-btn v-if="shopifyDisable" class="connect-button" icon="mdi-lock" style="max-width: 250px; cursor-pointer background: #fff; border: 1px solid #c8ccc9; border-radius: 6px;  margin-right:5px" flat color="primary" no-caps label="Install"> <q-icon name="mdi-chevron-right"/> </q-btn>
      </q-card-actions>
      </div>
       <!-- <div :style="shopifyDisable==true ? 'display:block;cursor:not-allowed':''" class="overlay">
          <img
             src="~src\assets\images\lock1.png" class="lock-image" alt="woo-commerce"
           />
      </div> -->
    </q-card>
  </div>
    <div class="q-pa-md row items-start q-gutter-md">
    <q-card style="padding:10px; max-height: 300px;" class="box-shadow my-card box-shadow border-radius" flat bordered   >
     <div :style="wooDisable==true ? ' opacity:0.8; cursor:not-allowed':''"> 
      <div class="image-container">
      <img
        src="~src\assets\images\WooCommerceNew.jpg" class="woo-image" alt="woo-commerce"
      />
      </div>
      <q-card-section>
        <div class="text-h6 q-mt-sm q-mb-xs">WooCommerce</div>
        <div class="text-caption" style="color=#929DB9 !important">
          Connect to your WooCommerce store to sync catalogs automatically.
        </div>
      </q-card-section>
      <q-card-actions>
       <div v-if="wooOpen" class="stats row items-center q-mr-lg">
            <div class="text-caption q-pa-sm q-ml-xs q-mr-xs">
          Installed
           <q-icon name="mdi-check-all" style="font-size:1.25em;"/>
        </div>
        </div>
        <q-btn v-if="!wooDisable" style="max-width: 250px; cursor-pointer background: #fff; border: 1px solid #c8ccc9; border-radius: 6px" flat color="primary" no-caps :label="wooOpen==true ? 'Open':'Install'" @click="toWoo"><q-icon name="mdi-chevron-right"/></q-btn>
         <q-btn v-if="wooDisable" icon="mdi-lock" style="max-width: 250px; cursor-pointer background: #fff; border: 1px solid #c8ccc9; border-radius: 6px; margin-right:5px" flat color="primary" no-caps label="Install"><q-icon name="mdi-chevron-right"/></q-btn>
      </q-card-actions>
      </div>
      <div :style="wooDisable==true ? 'display:block;cursor:not-allowed':''" class="overlay">
          <img
             src="~src\assets\images\lock1.png" class="lock-image" alt="woo-commerce"
           />
      </div>
    </q-card>
  </div>
  </div> 
</template>
<script>
import { ref,onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const $store = useStore();
    let result = ref();
    let wooDisable=ref(false);
    let shopifyDisable=ref(false);
    let wooOpen=ref(false);
    let shopifyOpen=ref(false);
    onBeforeMount(async()=>{
      let shopifyCred=await $store.dispatch("shopify/getShopifyCredentials")
      let wooCred=await $store.dispatch("woocommerce/getCredentials")
      if(shopifyCred?.statusCode==200){
        wooDisable.value=true
        shopifyDisable.value=false
       shopifyOpen.value=true
      }
      else if(wooCred?.statusCode==200){
        shopifyDisable.value=true
        wooDisable.value=false
        wooOpen.value=true
      }
    })
    const alert = () => {
      result.value = !result.value;
    };
    const toConfig = () =>{
      router.push('/settings/apps/shopify')
    };
    const toWoo = () =>{
      router.push('/settings/apps/woocommerce')
    }    
    return { result, alert, toConfig, toWoo , wooDisable,wooOpen,shopifyDisable,shopifyOpen};
  },
};
</script>


<style lang="scss" scoped>
.my-card{
    overflow: hidden;
    transition: 0.2s ease-in;
    transition: 0.5s ease-in-out;
    max-width: 300px;
}
.overlay {
  display:none;
  position: absolute;
  top: 75px;
  bottom: 0;
  left: 90px;
  right: 0;
  height: 100%;
  width: 100%;
  opacity:0;
  transition: .3s ease;
  
}
.my-card:hover{
  transform: scale(1.1);
  transform-origin: 0 1;
  transition: 0.5s ease-in-out;
  z-index: 2;
  .overlay{
      opacity: 1;
  }
}
.lock{
  font-size: 1.250em ;
   margin-left: 6px;
  
}
.image-container{
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content:space-between;
  height: 70px;
}
.shopify-image{
  object-fit: contain;
  max-width: 50px;
  max-height: 50px;
}
.woo-image{
    object-fit: contain;
    height: 71px;
    width: 64px;
}
.lock-image{
   height: 110px;
    width: 110px;
}

.titleUnderline{
  padding: 30px 0 8px;
  position: relative;
  background-size: 1px 1em;
  box-shadow: $primary-border;
  display: inline;
}
.stats{
    background-color: #0b9526;
    color: #ffff;
    height: 35px;
    border-radius: 4px; 
    font-family: $font-family-title;
}
.reminder{
  display:flex;
    background-color:#f5f5f5; 
    border-radius:10px;
   border: 1px solid rgb(200, 204, 201);
}
.reminder-icon{
  object-fit: contain;
    height: 50px;
    width: 50px;
}  

.intText, .reminder-icon {
  position: relative;
  transform: translateY(-50%);
  top: 50%;
}
</style>
