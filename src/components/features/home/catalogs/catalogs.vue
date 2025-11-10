<template>
  <div class="q-pt-none q-px-md q-gutter-sm catalogsDiv">
    <div class="catalogDiv h-70" v-show="showSkeleton">
      <table-skeleton></table-skeleton>
       </div>
    <div class="catalogDiv" v-show="!showSkeleton">
      <q-table
        virtual-scroll
        v-model:pagination="pagination"
        :binary-state-sort="sorted"
        class="box-shadow catalogs-table primary-text border-radius my-sticky-header-column-table"
        title="Subscribed Catalogs"
        title-class="table-title"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        row-key="name"
        :rows-per-page-options="[0]"
        flat
        bordered
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
      >

        <template v-slot:top-right>
          <q-btn v-if="catalogPageCheck()"
            label="Download Sample File"
            icon="mdi-download"
            color="primary"
            id="downloadCatalog"
            @click="downloadSample"
            no-caps
            rounded outlined standout
            class="q-mr-md subscribe_btn"
          />
          <q-btn v-if="catalogPageCheck() || !activeAccountData?.plan?.isTrail"
            label="Subscribe Catalogs"
            icon="mdi-gesture-tap"
            color="primary"
			      to="/products/managesubscriptions"
            no-caps
            id="subscibeCatalogs"
            rounded outlined standout
            class="q-mr-md subscribe_btn"
          />
          <q-input
            style="min-width: 300px"
            rounded outlined standout
            clearable
            debounce="100"
            dense
            v-model="filter"
            placeholder="Search by Catalog Name"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:header-cell="props">
          <q-th :props="props">
            {{ props.col.label }}
            <q-btn-dropdown  v-if="props.col.name=='productCount' || props.col.name=='publishedDate' ||  props.col.name=='subscribedDate'"
              size="xs"
              unelevated
              rounded outlined standout
              flat
              label="Filter"
              padding="6px"
              dropdown-icon="mdi-filter"
            >
              <colFilter :kv='props.col.name'></colFilter>
            </q-btn-dropdown>
          </q-th>
        </template>
        <template v-slot:no-data="">
          <div class="full-width full-height text-accent q-gutter-sm" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <img src="~assets/vectors/NoDesign.svg"  alt="Login_banner">
            <span class="norecords">
              No Records Found !
            </span>
          </div>
        </template>
        <template v-slot:body="props" class="">
          <q-tr :props="props">
            <q-td key="logo" :props="props" style="text-align: center;" >
                <img
                  class="catalogLogo"
                  :src="'https://az777500.vo.msecnd.net/images/' + props.row.logo"
                  :alt="props.row.catalogName"
                />
                  <template v-slot:error>
                    <div class="flex flex-center text-white">
                      <img src="~assets/images/no-image.png" class="noImage" alt="no image">
                    </div>
                  </template>
            </q-td>
            <q-td key="catalogName" :props="props" style="padding-right:38px" >
            <a :href="props.row.storeURL" target="_blank">
              <q-icon
                  name="mdi-link-variant"
                  size="14px"
                  color="primary"
                  class="cursor-pointer q-pr-xs"
                >
                </q-icon>
                <span class="anchor-link cp">{{ props.row.catalogName }}</span>
            </a>
            </q-td>
            <q-td key="productCount" :props="props" style="padding-right:38px">
              {{ props.row.productCount }}
            </q-td>
            <!-- <q-td key="publishedDate" :props="props" style="padding-right:38px">
              {{ getDate(props.row.publishedDate) }}
            </q-td> -->
            <q-td key="subscribedDate" :props="props" style="padding-right:38px">
              {{ getDate(props.row.subscribedDate) }}
            </q-td>
            <q-td key="enableInventory" :props="props" style="padding-right:38px">
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.enableInventory)"
                :label="getLabel(props.row.enableInventory)"
                :text-color="getTextColor(props.row.enableInventory)"
              ></q-badge>
            </q-td>
            <q-td key="enableDropship" :props="props" style="padding-right:38px">
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.enableDropship)"
                :label="getLabel(props.row.enableDropship)"
                :text-color="getTextColor(props.row.enableDropship)"
              ></q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
     <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab
              icon="mdi-menu"
              direction="left"
              color="primary"
            >
              <!-- <q-fab-action @click="enableTourRoute" label="Tour" padding="sm" margin="sm" color="primary" icon="mdi-filmstrip" /> -->
               <q-fab-action to="/knowledgebase" label="Knowledge Base" padding="sm" color="primary" icon="mdi-bookshelf" />
              <q-fab-action to="/contactus" label="Contact Us" padding="sm" color="primary" icon="mdi-card-account-phone-outline" />
               </q-fab>
      </q-page-sticky>
  </div>
</template>
<script>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar, date } from "quasar";
import { useRouter, useRoute } from "vue-router";


export default {
  components: {
    colFilter: require("src/components/restate/filter/filter.vue").default,
    'table-skeleton': require("src/components/restate/skeleton/table.vue").default
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const showSkeleton = ref(true)
    let sorted=ref(true);
    let rows = computed(() => $store.getters["home/getCatalogsTableRows"])
    let isFirstLogin = computed(() => $store.getters["auth/getLoginStatus"])
    let userObject = computed(()=>$store.getters["common/getAccountName"])
    let pages = computed(()=>$store.getters["auth/getPages"])
    const activeAccountData = computed(() => $store.getters["auth/getAccountData"])
    let filter =  ref('');
    const router = useRouter();

    onBeforeMount(async () => {
      activeAccountData.value=await $store.dispatch('auth/getAccount')
      await $store.dispatch('auth/getPages')
      await $store.dispatch("common/getPages");
      $store.dispatch("home/getCatalogDetails").then(val=>{
        showSkeleton.value = false
      })
    });
    const downloadSample = () =>{
        $store.dispatch('products/downloadSampleFile')
    }
    const enableTourRoute = async() =>{
          await $store.dispatch('auth/changeLoginStatus', true)
          // enableTour()
    }
    // const enableTour = () => {
    //         const introJs = require('intro.js')
    //         let proTour = introJs.default();
    //         proTour.setOptions({
    //         tooltipClass: 'customTooltip',
    //         exitOnOverlayClick: false,
    //         doneLabel:'Next',
    //         steps: [{
    //           title: 'Welcome',
    //           intro: "<p> Hey, </p> <p style='font-size:14px'> Welcome to Catalog Manager and thank you for signing up! You've joined over 100+ retailers who use Catalog Manager to manage the catalogs on their websites. Here are 3 quick steps that will help you get used to our product.  </p> <strong class='q-mt-3'>Subscribe: </strong><p>Subscribe to your preferred suppliers for continuous feed updates by going to <strong>Catalogs -> Manage Subscriptions. </strong></p><strong class='q-mt-3'>Settings: </strong><p>Once you subscribe to your preferred suppliers, switch to the <strong>Settings -> Configurations </strong> to set your preferred file name formats, configure FTP location, etc. </p><strong class='q-mt-3'>Schedule: </strong><p>Once all set, now it’s time to schedule the regular updates for your Shopify or WooCommerce store. <strong> Switch to Settings -> Apps </strong></p>",
    //         },
    //         {
    //           title: "Subscribe",
    //           element: document.querySelector('.subscribe_btn'),
    //           intro: 'Click here to look at all the catalogs that we currently carry.',
    //         }]
    //         })
    //         proTour.start().oncomplete(function(){
    //           router.push('/products/subscriptions')
    //         });
    // }

    const onSearch = () => {
      if (filter.value !== '') {
        if (filter.value.length >= 2) {
          let data = rows.value.filter(row => row.name.toLowerCase().includes(filter.value.toLowerCase()))

            // rows.value = data
            rows.value.splice(0, rows.value.length, ...data)
        } else {
          $store.dispatch("home/getCatalogDetails");
        }
      } else {
        $store.dispatch("home/getCatalogDetails");
      }
    }

    let catalogPageCheck = () =>{
      let bool = false
      pages?.value?.forEach(element => {
        if(element?.PageUrl=="/products"){
          bool=true
        }
      });
      return bool
    }

    return {
      sorted,
      pages,
      catalogPageCheck,
      enableTourRoute,
      userObject,
      downloadSample,
      showSkeleton,
      // enableTour,
      isFirstLogin,
       initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 0
      },
      pagination: ref({
        sortBy: 'name',
        descending: false,
        rowsPerPage: 0
      }),
      filter,
      onSearch,
      columns: computed(() => $store.getters["home/getCatalogsTableColumns"]),
      rows,
      activeAccountData,
      //Methods
      getDate(pDate){
            return date.formatDate(pDate, 'MM-DD-YYYY')
      },
      getColor: (value) => (value ? "light-green-2" : "red-2"),
      getLabel: (value) => (value ? "Yes" : "No"),
      getTextColor: (value) => (value ? "green-10" : "red-10"),
    };
  },
};
</script>

<style lang="scss" scoped>
.customTooltip{
  min-width: 70%;
}
.catalogDiv :deep(.q-img__image){
  object-fit: contain !important;
}

.my-sticky-header-column-table{
  max-height: 70vh;
  tr th{
    position: sticky;
    z-index: 2;
    background: #fff;
  }
  thead tr:last-child th{
    top: 48px;
    z-index: 3;
  }
  thead tr:first-child th{
    top: 0;
    z-index: 1;
  }
  tr:first-child th:first-child{
    z-index: 3;
  }
  td:first-child{
    z-index: 1;
  }
  td:first-child, th:first-child{
    position: sticky;
    left: 0;
    background-color: white;

  }
}
span {
  .block {
    display: none !important;
  }
}
@media(max-width:767px){

 .catalogDiv label.q-field {
    min-width: 100% !important;
    margin-top:10px;  
}
.subscribe_btn {
    width: 100%;
    margin-right: 0;
    margin-top:10px;
}
.q-page-sticky.row.flex-center.fixed-bottom-right.q-page-sticky--shrink {
    display: none;
}
}
</style>
