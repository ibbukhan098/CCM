<template>
  <div class="q-px-md q-gutter-sm settingsDiv">
    <div v-show="!showSkeleton">
      <q-table
      virtual-scroll
        v-model:pagination="pagination"
        class="box-shadow primary-text border-radius my-sticky-header-column-table sticky-table"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
         :rows-per-page-options="[0]"
        flat
        bordered
        no-data-label="I Didn't Find Anything For You"
        no-results-label="The Filter Didn't Uncover Any Results"
        binary-state-sort
      >
        <template v-slot:top-right>
          <q-btn
            data-intro="Third"
            label="Download Sample File"
            icon="mdi-download"
            color="primary"
            no-caps
            id="downloadSubscription"
            @click="downloadSample"
            rounded outlined standout
            class="q-mr-md subscribe_btn"
          />
          <q-btn 
            data-intro="Third"
            label="Manage Subscriptions"
            icon="mdi-gesture-tap"
            color="primary"
            v-if="!account?.plan?.isTrail"
			      to="/products/managesubscriptions"
            no-caps
            id="subscibeCatalogs"
            rounded outlined standout
            class="q-mr-md subscribe_btn"
          />
          <q-input
            rounded outlined standout
            dense
            clearable
            debounce="300"
            v-model="filter"
            placeholder="Search by Name"
            style="min-width: 300px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <!-- <template v-slot:header-cell="props">
          <q-th :props="props">
            {{ props.col.label }}
            <q-btn-dropdown  v-if="props.col.name==='name'"
              size="xs"
              unelevated
              flat
              padding="6px"
              dropdown-icon="mdi-filter"
            >
              <colFilter :kv='props.col.field'></colFilter>
            </q-btn-dropdown>

          </q-th>
        </template> -->
        <template v-slot:no-data="">
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
        <template v-slot:body="props">
          <q-tr :props="props" >
            <q-td key="logo" :props="props" style="text-align: center">
              <img
                class="catalogLogo"
                :src="'https://az777500.vo.msecnd.net/images/' + props.row.logo"
                :alt="props.row.catalogName"
              />
            </q-td>
            <q-td key="catalogName" :props="props" style="padding-right: 38px">
              <a :href="props.row.storeURL" target="_blank">
                <q-icon
                  name="mdi-link-variant"
                  size="14px"
                  color="primary"
                  class="cursor-pointer q-pr-xs"
                >
                </q-icon>
                <span class="anchor-link">{{ props.row.catalogName }}</span>
              </a>
            </q-td>
             <q-td
              key="publishedDate"
              :props="props"
              style="padding-right: 38px"
            >
              {{ getDate(props.row.publishedDate) }}
            </q-td> 
             <q-td
              key="subscribedDate"
              :props="props"
              style="padding-right: 38px"
            >
              {{ getDate(props.row.subscribedDate) }}
            </q-td>
            <q-td
              key="enableInventory"
              :props="props"
              style="padding-right: 38px"
            >
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.enableInventory)"
                :label="getLabel(props.row.enableInventory)"
                :text-color="getTextColor(props.row.enableInventory)"
              ></q-badge>
            </q-td>
            <q-td key="enableDropship" :props="props">
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.enableDropship)"
                :label="getLabel(props.row.enableDropship)"
                :text-color="getTextColor(props.row.enableDropship)"
              ></q-badge>
            </q-td>
            <q-td key="canDownload" :props="props">
              <q-btn
                label="Upgrade Plan"
                color="primary"
                size="sm"
                rounded outlined standout
                padding="q-pl-sm"
                v-if="account?.plan?.downloads == false"
                to="/account/plan"
              ><div style="display:none;">sdgdgv</div>
               <q-badge color="" rounded floating class="upgrade">
                 <i class="mdi mdi-crown" />
               </q-badge>
              </q-btn>
              <q-btn flat round color="primary"
               v-else
               :class="props.row.id == tourVar.id ? 'downloadTour' : ''"
               icon="mdi-download" no-caps ><div style="display:none;">sdgdgv</div></q-btn>
              <q-menu
                transition-show="scale"
                transition-hide="scale"
                v-if="account?.plan?.downloads == true"
              >
                <div
                  v-if="account.plan.detail.excel == 'true'"
                  class="q-pa-lg"
                  style="min-width: 250px"
                >
                  <div>
                    <q-form @submit="exportTable(props.row, downloadModel)" class="q-gutter-md">
                      <q-select
                      class="q-pb-md"
                      filled
                      v-model="downloadModel"
                      :options="downloadOptions"
                      :rules="[ val => !!val || 'OPTION IS REQUIRED' ]"
                      label="Export as"
                    />
                    <q-btn
                      v-close-popup
                      flat
                      text-color="red-4"
                      label="Cancel"
                    />
                    <q-btn
                      type="submit"
                      color="primary"
                      label="Export"
                       v-close-popup
                    />
                    </q-form>
                  </div>
                </div>
                <div
                  class="q-pa-lg"
                  v-if="account.plan.detail.excel == 'false'"
                >
                  <span> Upgrade to download</span>
                </div>
              </q-menu>
            </q-td>
            <q-td key="canUpload" :props="props">
               <q-btn
                label="Upgrade Plan"
                color="primary"
                size="sm"
                rounded outlined standout
                padding="q-pl-sm"
                v-if="account?.plan?.downloads == false"
                to="/account/plan"
              ><div style="display:none;">sdgdgv</div>
               <q-badge color="" rounded floating class="upgrade">
                 <i class="mdi mdi-crown" />
               </q-badge>
              </q-btn>
              <q-btn v-else flat round color="primary" :id="'catalogId_'+props.row.catalogId"  icon="mdi-upload"  no-caps :class="isFileUpload ? '' : 'disabled'" class="catalog"><div style="display:none;">sdgdgv</div></q-btn>
              <q-spinner class="ftpUploading" color="primary" size="2em" :thickness="2"/>
              <q-menu transition-show="scale" transition-hide="scale" v-if="account?.plan?.downloads == true">
                <div class="q-pa-lg" style="min-width: 260px" >
                  <div class="q-gutter-md">
                    <p class="text-h8 text-black text-center">
                      Are you sure you want to upload?
                    </p>
                    <div class="row justify-center">
                      <q-btn
                      rounded outlined standout
                        class="q-mx-md"
                        v-close-popup
                        flat
                        text-color="red-4"
                        label="No"
                      />
                      <q-btn
                      rounded outlined standout
                        class="q-mx-md"
                        color="primary"
                        label="Yes"
                        @click="uploadTable(props.row, props.row.catalogId)"
                        v-close-popup
                      />
                    </div>
                  </div>
                </div>
              </q-menu>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div v-show="showSkeleton">
      <table-skeleton></table-skeleton>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab
              icon="mdi-menu"
              direction="left"
              color="primary"
            >
              <!-- <q-fab-action @click="enableTour" label="Tour" padding="sm" color="primary" icon="mdi-filmstrip" /> -->
               <q-fab-action to="/knowledgebase" label="Knowledge Base" padding="sm" color="primary" icon="mdi-bookshelf" />
              <q-fab-action to="/contactus" label="Contact Us" padding="sm" color="primary" icon="mdi-card-account-phone-outline" />
            </q-fab>
      </q-page-sticky>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar, date, QSpinnerClock } from "quasar";

export default {
  components:{
        'table-skeleton': require("src/components/restate/skeleton/table.vue").default
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const showSkeleton = ref(true)
    const tourVar = ref({})
    let filter = ref("");
    let isFileUpload = ref(true);
    // let rows = computed(() => $store.getters["products/getSuppliersTableRows"]);
    let rows = computed(() => $store.getters["home/getCatalogsTableRows"])
    let isFirstLogin = computed(() => $store.getters["auth/getLoginStatus"])
    let exportFileName = computed(
      () => $store.getters["common/getExportFileName"]
    );
    let enableTime = computed(() => $store.getters["common/getEnableTime"]);
    onBeforeMount(async() => {
      await $store.dispatch("home/getCatalogDetails").then(val=>{
        showSkeleton.value = false;
        let uploadingItem = localStorage.getItem('uploading');
        if(uploadingItem){
          let elm = document.getElementById(uploadingItem)
          elm.parentElement.children[1].style.display = 'inline';
          isFileUpload.value = false;
        }

      })
      // $store.dispatch("products/getSubscribedSuppliers").then(val=>{
      //   tourVar.value = val[0];
      //   showSkeleton.value = false;
      //   if(isFirstLogin.value){
      //     //  enableTour()
      //   }
      // })
      $store.dispatch("products/getAllSuppliers");
      $store.dispatch("common/getConfigDetails");
    })
      const downloadSample = () =>{
        $store.dispatch('products/downloadSampleFile')
    }
        // const enableTour = () => {
        //   const introJs = require('intro.js')
        //   setTimeout(() => {
        //    let proTour = introJs.default();
        //     proTour.setOptions({
        //         exitOnOverlayClick: false,
        //     steps: [
        //     {
        //       title: "Subscribed Catalogs",
        //       intro: 'All your subscribed suppliers can be seen here along with the last published date, option to download and upload to FTP.'
        //     },
        //     {
        //       title: 'Download Catalogs',
        //       element: document.querySelector('.downloadTour'),
        //       intro: 'Click on the download option to download your preferred supplier product feed in excel or CSV.'
        //     },
        //     {
        //       title: "Final Step",
        //       intro: 'To know more about using the other modules, browse our <a href="#">Knowledge Base</a> for more information.'
        //     }]
        //     })
        //      proTour.start().oncomplete(function(){
        //             $store.dispatch('auth/changeLoginStatus', false)
        //      });
        //     }, 1000);
        // }

    const onSearch = () => {
      if (filter.value !== "") {
        if (filter.value.length >= 2) {
          let data = rows.value.filter((row) =>
            row.name.toLowerCase().includes(filter.value.toLowerCase())
          );
          rows.value.splice(0, rows.value.length, ...data);
        } else {
          $store.dispatch("products/getSubscribedSuppliers");
        }
      } else {
        $store.dispatch("products/getSubscribedSuppliers");
      }
    };

    return {
      isFileUpload,
      showSkeleton,
      isFirstLogin,
      downloadSample,
      //enableTour,
      tourVar,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 0
      },
      pagination: ref({
        sortBy: 'name',
        descending: false,
        rowsPerPage: 0,
  
      }),
      filter,
      onSearch,
      cancelEnabled: ref(false),
      columns: computed(
        () => $store.getters["products/getSuppliersTableColumns"]
      ),
      account: computed(() => $store.getters["auth/getAccountData"]),
      rows,
      downloadModel: ref("CSV"),
      downloadOptions: computed(
        () => $store.state.products.suppliersTableData.downloadOptions
      ),
      //Methods
      getColor: (value) => (value ? "light-green-2" : "red-2"),
      getLabel: (value) => (value ? "Yes" : "No"),
      getTextColor: (value) => (value ? "green-10" : "red-10"),
      async uploadTable(row, catId) {
          let elm = document.getElementById('catalogId_'+catId)
          localStorage.setItem('uploading', 'catalogId_'+catId)
          elm.parentElement.children[1].style.display = 'inline'
          elm.classList.add('uploading')
         isFileUpload.value = false;
         let data=  await $store.dispatch("common/getFtpConfigDetails")
         if(data.url == null) {
             $q.notify({
              type:'negative',
              position:'top',
              message:'FTP credentials are not configured',
              timeout:1000
             })
         } else {
          let exportfileName = exportFileName.value
          let payload = {
            catalogID: row.catalogId,
            supplierName: row.catalogName,
            fileName: exportfileName 
          }
          let res = await $store.dispatch("products/uploadFile", payload);
          if(res === 'Success'){
            isFileUpload.value = true;
            let uploadingItem = localStorage.getItem('uploading');
            if(uploadingItem){
              let elm = document.getElementById(uploadingItem);
              if(elm){
                elm.parentElement.children[1].style.display = 'none';
                let catalogElms = document.querySelectorAll('.catalog');
                catalogElms.forEach(element => {
                  element.classList.remove('disabled')
                })
              }
              localStorage.removeItem('uploading')
            }
          }
          }
      },
      getDate(pData) {
        return date.formatDate(pData, "MM-DD-YYYY");
      },
      exportTable(row, downloadModel) {
        if(downloadModel === null) return
          $q.loading.show({
                spinner: QSpinnerClock,
                spinnerColor: "indigo",
                backgroundColor: "white",
            })
        let typeFile = 0;
        let exportfileName = "";
        if (downloadModel == "CSV") {
          typeFile = 1;
        } else if (downloadModel == "EXCEL") {
          typeFile = 2;
          downloadModel = "XLSX";
        }
        if (exportFileName.value === null) {
          let name=row.catalogName
          name=name.trim()
           let catalogName=name.replace(" ","_")
          exportfileName = row.catalogId +'_'+catalogName;
        } else {
          exportfileName = exportFileName.value;
        }
        const data = {
          catalogID: row.catalogId,
          fileType: typeFile,
          download: downloadModel,
          fileName: exportfileName,
          enableTime: enableTime.value,
        };
        const fullData={
          row:row,
          catalogData:data
        }
        $store.dispatch("products/downloadFileTest", fullData);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.upgrade{
  padding: 5px;
  margin: -5px;
  background: #fbbe28;
}
.my-sticky-header-column-table{
  height: 80vh;
}
.q-table{
   tr th{
    position: sticky;
    z-index: 2;
    background: #fff;
  thead{
    position: sticky;
    display: table-header-group;
    top: 0;
    z-index: 2;
    background: white;
  }
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

.ftpUploading {
  display: none;
}

</style>
