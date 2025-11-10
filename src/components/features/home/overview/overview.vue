<template>
 <div class="mainDiv" v-if="account">
  <div class="statsSmall status q-my-xl q-ml-md">
  <!-- <div :class="account.plan.detail.aPI == 'true'?'statsDiv status q-my-xl q-mx-lg' : 'statsSmall status q-my-xl q-mx-lg'"> -->
       <div class="stats row items-center bg-white">
           <div class="col-2 text-center">
               <div class="dot bg-violet"></div>
           </div>
           <div class="col-7">
             <p class="statsTitle q-my-sm">
              Catalogs
             </p>
             <q-skeleton v-show="showSkeleton" type="text" size="20px"/>
             <p class="q-my-xs" v-show="!showSkeleton" style="color:#4F4F72;">
               {{ overViewDetails.catalogs }}
             </p>
           </div>
           <div class="col-3">
             <q-icon
              class="icon bg-violet"
              color="white"
              size="sm"
              name="mdi-book-open-page-variant"
            />
           </div>
       </div>    
        <div class="stats row items-center bg-white">
           <div class="col-2 text-center">
               <div class="dot bg-light-green"></div>
           </div>
           <div class="col-7">
             <p class="statsTitle q-my-sm">
              Products
             </p>
                          <q-skeleton v-show="showSkeleton" type="text" size="20px"/>
             <p class="q-my-xs" v-show="!showSkeleton" style="color:#4F4F72;">
               {{ overViewDetails.products }}
             </p>
           </div>
           <div class="col-3">
             <q-icon
              class="icon bg-light-green"
              color="white"
              size="sm"
              name="mdi-archive"
            />
           </div>
       </div>    
        <div class="stats row items-center bg-white">
           <div class="col-2 text-center">
               <div class="dot bg-blue"></div>
           </div>
           <div class="col-7">
             <p class="statsTitle q-my-sm">
              SKUs
             </p>
             <q-skeleton v-show="showSkeleton" type="text" size="20px"/>
             <p class="q-my-xs" v-show="!showSkeleton"  style="color:#4F4F72;">
               {{ overViewDetails.skUs }}
             </p>
           </div>
           <div class="col-3">
             <q-icon
              class="icon bg-blue"
              color="white"
              size="sm"
              name="mdi-layers"
            />
           </div>
       </div>    
        <div class="stats row items-center bg-white">
           <div class="col-2 text-center">
               <div class="dot bg-red"></div>
           </div>
           <div class="col-7">
             <p class="statsTitle q-my-sm">
              SKU's Out of Stock
             </p>
            <q-skeleton v-show="showSkeleton" type="text" size="20px"/>
             <p class="q-my-xs" v-show="!showSkeleton" style="color:#4F4F72;">
               120
             </p>
           </div>
           <div class="col-3">
              <q-icon
                class="icon bg-red"
                color="white"
                size="sm"
                name="mdi-layers-off"
              />
           </div>
       </div>
        <div class="stats row items-center bg-white">
           <div class="col-2 text-center">
               <div class="dot bg-yarrow"></div>
           </div>
           <div class="col-7">
             <p class="statsTitle q-my-sm">
              Downloads
             </p>
              <q-skeleton v-show="showSkeleton" type="text" size="20px"/>
             <p class="q-my-xs" v-show="!showSkeleton" style="color:#4F4F72;">
               {{ overViewDetails.catalogsDownloaded }}
             </p>
           </div>
           <div class="col-3">
             <q-icon
              class="icon bg-yarrow"
              color="white"
              size="sm"
              name="mdi-download-box"
            />
           </div>
       </div>
        <div class="stats row items-center bg-white" v-if="false">
           <div class="col-2 text-center">
               <div class="dot bg-yellow"></div>
           </div>
           <div class="col-7">
             <p class="statsTitle q-my-sm">
              API Request
             </p>
             <p class="light q-my-xs">
               {{ overViewDetails.apiRequested }}
             </p>
           </div>
           <div class="col-3">
             <q-icon
              class="icon bg-yellow"
              color="white"
              size="sm"
              name="mdi-book-open-page-variant"
            />
           </div>
       </div>         
  </div>
 </div>
 </template>
<script>
import { useQuasar } from "quasar";
import { ref, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    const showSkeleton = ref(true)
    const overViewDetails = ref({});
    const account = computed(() => $store.getters["auth/getAccountData"]);

    onBeforeMount(() => {
      $store.dispatch("home/getOverviewDetails").then((response) => {
        overViewDetails.value = response;
        overViewDetails.value.skUs = kFormatter(response.skUs);
        overViewDetails.value.catalogs == kFormatter(response.catalogs);
        overViewDetails.value.products = kFormatter(response.products);
        overViewDetails.value.skUsOutOfStock = kFormatter(
          response.skUsOutOfStock
        );
        overViewDetails.value.catalogsDownloaded = kFormatter(
          response.catalogsDownloaded
        );
        overViewDetails.value.apiRequested = kFormatter(response.apiRequested);
        showSkeleton.value = false
      });
    });

    const kFormatter = (num) => {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    };
    const clickOnFAQS = () => {
      router.push("/faqs");
    };

    return {
      showSkeleton,
      account,
      overViewDetails,
      clickOnFAQS,
    };
  },
};
</script>
<style lang="scss" scoped>

  .mainDiv{
    .status{
      display: grid;
      gap: 0.5rem;     
       .stats{
        height: 88px;
        border-radius: 50px; 
        box-shadow: $boxshadow !important;
        font-family: $font-family-title;
        .dot {
            max-width: 10px;
            min-width: 10px;
            max-height: 10px;
            min-height: 10px;
            border-radius: 50%;
            margin: 0 auto;
        }
        .statsTitle{
          font-weight: bold;
          font-size: 0.9rem;
          color: $dark-font;
        }
        .icon{
          border-radius: 50%;
          padding:7px;
        }    
      }
    } 
    .statsSmall{
      grid-template-columns: 19% 19% 19% 19% 19%;
    }
    .statsDiv{
      grid-template-columns: 15% 15% 15% 18% 15% 15%;
    }   
    .boxDiv{
      height: 100px;
      background: #ffffff;
      width: 200px;
      border-radius: 10px;
      box-shadow: 0 0.125rem 0.8rem rgb(0 0 0 / 10%) !important;
      .dark-font{
        color: $dark-font;
        font-weight: bold;
      }
    }
  }
  @media(max-width:767px){
    .mainDiv{
      .statsSmall{
      display: block !important;
      margin-bottom: 5px;
      margin-left: 0;
      .stats {
      margin-bottom: 10px;
      }
    }
    }

// .stats.row.items-center.bg-white {
//     margin-bottom: 10px;
// }
  }
</style>
