<template>
  <div class="q-px-md">
    <div v-show="showSkeleton">
      <table-skeleton></table-skeleton>
    </div>
    <div class="catalogDiv" v-show="!showSkeleton">
      <q-table
       virtual-scroll
        v-model:pagination="pagination"
        :binary-state-sort="sorted"
        class="box-shadow catalogs-table primary-text border-radius my-sticky-header-column-table sticky-table tableSubscribe"
        :rows="filteredRows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        :rows-per-page-options="[0]"
        flat
        bordered
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
      >
        <template v-slot:top-right>
           <q-btn
            label="Download Sample File"
            icon="mdi-download"
            color="primary"
            no-caps
            id="downloadSubscription"
            @click="downloadSample"
            rounded outlined standout
            class="q-mr-md subscribe_btn"
          />
            <!-- <q-icon class='mdi mdi-file-download cursor-pointer q-pr-md text-primary' size="25px" @click="downloadSample" ><q-tooltip>Download Sample FIle</q-tooltip></q-icon> -->
          <q-input
            rounded outlined standout
            dense
            clearable
            debounce="300"
            v-model="filter"
            placeholder="Search by Catalog Name"
            style="min-width: 300px"
            class="searchBox"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:no-data>
          <div class="full-width full-height text-accent q-gutter-sm" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <img src="~assets/vectors/NoDesign.svg"  alt="Login_banner">
            <span class="norecords">
              No Records Found !
            </span>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <!-- <q-td key="id" :props="props">
                {{ props.row.id }}
              </q-td> -->
            <q-td key="providerLogo" :props="props" style="width:100px;text-align: center;">
               <img
                class="catalogLogo"
                  :src='"https://az777500.vo.msecnd.net/images/"+props.row?.logo'
                  :alt="props.row.name"
                />
                <template v-slot:error>
                <div class="flex flex-center text-white">
                   <img src="~assets/images/no-image.png" class="noImage" alt="no image">
                </div>
              </template>
            </q-td>
            <q-td style="width:200px" key="name" :props="props">
               <q-icon
                name="mdi-information-outline"
                size="xs"
                color="primary"
                class="cursor-pointer q-pr-sm"
              >
                <q-menu
                  transition-show="scale"
                  transition-hide="scale"
                  max-width="750px"
                >
                  <div class="q-pa-md">
                    <p class="text-subtitle1 text-primary">Details</p>
                    <div
                      v-html="props.row.description"
                      class="modal-text"
                    ></div>
                    <q-separator />
                    <div class="row">
                      <table class="detailsTable" style="width: 100%;">
                        <thead>
                          <th>Brands</th>
                          <th>Categories</th>
                          <th>Products</th>
                          <th>SKU's</th>
                          <th>Pricing</th>
                          <th>Catalog Updates</th>
                          <th>Approval</th>
                          <th>Last Published</th>
                        </thead>
                        <tbody>
                          <td class="text-center">{{ props.row.brands }}</td>
                          <td class="text-center">{{ props.row.categories }}</td>
                          <td class="text-center">{{ props.row.products }}</td>
                          <td class="text-center">{{ props.row.skus }}</td>
                          <td class="text-center">MSRP</td>
                          <td class="text-center">{{ props.row.updatesType }}</td>
                          <td class="text-center">{{ props.row.approvalType }}</td>
                          <td class="text-center">{{ getDate(props.row.lastPublished).split("T")[0] }}</td>
                        </tbody>
                      </table>
                    </div>
                    <q-separator />
                  </div>
                </q-menu>
              </q-icon>
            <a :href="props.row.storeURL" target="_blank"  class="anchor-link">{{ props.row.name }}</a>
            </q-td>
            <q-td auto-width key="updatesType" :props="props" style="padding-right:38px">
              {{ props.row.updatesType }}
            </q-td>
            <q-td auto-width key="enableInventory" :props="props">
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.enableInventory)"
                :label="getLabel(props.row.enableInventory)"
                :text-color="getTextColor(props.row.enableInventory)"
              ></q-badge>
            </q-td>
            <q-td key="enableDropship" auto-width :props="props">
              <q-badge
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor(props.row.enableDropship)"
                :label="getLabel(props.row.enableDropship)"
                :text-color="getTextColor(props.row.enableDropship)"
              ></q-badge>
            </q-td>
            <!-- <q-td key="enableDropship" :props="props" style="padding-right:38px">
              {{ props.row.enableDropship }}
            </q-td>
            <q-td key="enableInventory" :props="props" style="padding-right:38px">
              {{ props.row.enableInventory }}
            </q-td> -->
            <q-td key="subscription" auto-width :props="props">
              <q-btn
                label="Upgrade Plan"
                color="primary"
                size="sm"
                :class="props.row.catalogID == tourCatalog.catalogID ? 'subscriptionBtn' : ''"
                rounded outlined standout
                padding="q-pl-sm"
               v-if="activeAccountData?.plan?.isTrail"
                to="/account/plan"
              >
               <q-badge rounded floating class="upgrade">
                 <i class="mdi mdi-crown"/>
               </q-badge>
              </q-btn>
              <q-btn
                class="q-mr-sm"
                label="Subscribe"
                :class="props.row.catalogID == tourCatalog.catalogID ? 'subscriptionBtn' : ''"
                color="primary"
                style="width: 150px; min-width: 110px"
                icon="mdi-plus-circle-multiple-outline"
                size="sm"
                rounded outlined standout
                padding="sm"
                v-if="props.row.subscription != 'Subscribed' && props.row.subscription != 'Requested' && !activeAccountData?.plan?.isTrail"
              >
                <q-menu
                  transition-show="scale"
                  transition-hide="scale"
                  max-width="250px"
                  max-height="400px"
                  @show="onReset()"
                >
                  <div class="q-pa-md">
                    <q-form
                      @submit="onSubmitSubscribe(props.row)"
                      @reset="onReset"
                    >
                      <p class="text-subtitle2 text-primary">
                        Subscription Request
                      </p>
                      <q-input
                        rounded outlined dense standout
                        v-model="accountID"
                        label="Account ID *"
                        lazy-rules
                        :rules="[(val) => !!val || 'ACCOUNT ID IS MISSING']"
                      />
                      <q-input
                        rounded outlined standout
                        v-model="notes"
                        label="Notes"                        
                        type="textarea"
                      />
                      <div class="q-pt-sm">
                        <p class="dark">
                          Are you sure you want to request the catalog from <b>{{props.row.name}}</b>?
                        </p>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col">
                            <q-btn label="No" rounded outlined standout color="warning" class="q-mr-sm" v-close-popup/>
                          </div>
                          <div class="">
                            <q-btn v-if="props.row.approvalType != 'ApprovalRequired'"
                            rounded outlined standout
                             label="Yes" type="submit" color="primary" />
                            <q-btn v-if="props.row.approvalType == 'ApprovalRequired'"
                            rounded outlined standout
                             label="Request" type="submit" color="primary" v-close-popup= check />
                          </div>
                        </div>
                      </div>
                    </q-form>
                  </div>
                </q-menu>
              </q-btn>
              <q-btn
                class="no-pointer-events"
                icon="mdi-check-all"
                size="sm"
                label="Subscribed"
                :class="props.row.catalogID == tourCatalog.catalogID ? 'subscriptionBtn' : ''"
                rounded outlined standout
                padding="sm"
                style="color: green; width: 150px; min-width: 110px"
                v-if="props.row.subscription == 'Subscribed' && !activeAccountData?.plan?.isTrail"
              >
              </q-btn>
              <q-btn
                class="no-pointer-events"
                size="sm"
                icon="mdi-help-circle-outline"
                color="warning"
                label="Awaiting Approval"
                rounded outlined standout
                padding="sm"
                style="width: 150px; min-width: 110px"
                v-if="props.row.subscription == 'Requested' && !activeAccountData?.plan?.isTrail"
              >
              </q-btn>
            </q-td>
            <q-td auto-width key="approvalType" :props="props" style="padding-right:38px">
              <q-badge v-if="props.row.approvalType != 'ApprovalRequired'"
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor('text')"
                :label="getLabel('text')"
                :text-color="getTextColor('text')"
              ></q-badge>
              <q-badge v-if="props.row.approvalType == 'ApprovalRequired'"
                style="height: 25px; width: 40px; justify-content: center"
                :color="getColor()"
                :label="getLabel()"
                :text-color="getTextColor()"
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
              <!-- <q-fab-action @click="enableTourRoute" label="Tour" padding="sm" color="primary" icon="mdi-filmstrip" /> -->
              <q-fab-action to="/knowledgebase" label="Knowledge Base" padding="sm" color="primary" icon="mdi-bookshelf" />
              <q-fab-action to="/contactus" label="Contact Us" padding="sm" color="primary" icon="mdi-card-account-phone-outline" />
            </q-fab>
      </q-page-sticky>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount,onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute,useRouter } from 'vue-router'
import { useQuasar, QSpinnerClock} from "quasar";
import { date } from "quasar";

export default {
  components:{
        'table-skeleton': require("src/components/restate/skeleton/table.vue").default
  },
  setup() {
    const $store = useStore();
    const router = useRouter()
    const showSkeleton = ref(true)
    const $q = useQuasar();
    const accountID = ref(null);
    let tourCatalog = ref({});
    let check = ref(false)
    let sorted=ref(true)
    const activeAccountData = computed(() => $store.getters["auth/getAccountData"])
    let isFirstLogin = computed(() => $store.getters["auth/getLoginStatus"])
    const notes = ref("");
    onBeforeMount(async () => {
      $store.dispatch("products/getAllSuppliers").then(val=>{
          let ctg = val.filter(x=> x.subscription == 'Subscribe')
          tourCatalog.value = val.length > 0 ? val[0] : {}
          showSkeleton.value = false
           if(isFirstLogin.value){
              // enableTour()
            }
      });
      await $store.dispatch("products/getSubscribedSuppliers");
      await $store.dispatch('auth/getAccount')
    });
     const enableTourRoute = async() =>{
          await $store.dispatch('auth/changeLoginStatus', true)
          // enableTour()
    }
    // const enableTour = () => {
    //           const introJs = require('intro.js')
    //         setTimeout(() => {
    //            let proTour = introJs.default();
    //             proTour.setOptions({
    //             exitOnOverlayClick: false,
    //             doneLabel:'Next',
    //             steps: [
    //             {
    //               title: 'Search Catalogs',
    //               element: document.querySelector('.searchBox'),
    //               intro: 'Search for your preferred suppliers using the search box. Input the supplier name to browse details of a supplier',
    //               tooltipClass: 'leftAlign'
    //             },
    //             {
    //               title: 'Subscribe Catalogs',
    //               element: document.querySelector('.subscriptionBtn'),
    //               intro: 'Click on the subscribe button to input your Account ID with the supplier and enable sync. ',
    //             }]
    //             })
    //             //  proTour.onexit(function(){
    //             //     $store.dispatch('auth/changeLoginStatus', false)
    //             // });
    //             proTour.start().oncomplete(function(){
    //                 router.push('/products/subscribed')
    //             });
    //         }, 1000);
    // }

    const downloadSample = () =>{
        $store.dispatch('products/downloadSampleFile')
    }


    return {
      sorted,
      showSkeleton,
      enableTourRoute,
      isFirstLogin,
      // enableTour,
      check,
      downloadSample,
      accountID,
      tourCatalog,
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
      notes,
      // onSearch,
      activeAccountData,
      industry: ref(null),
      getDate(pDate){
        return date.formatDate(pDate, 'MM-DD-YYYY')
      },
      filter: ref(""),
      getColor: (value) => (value ? "light-green-2" : "red-2"),
      getLabel: (value) => (value ? "Yes" : "No"),
      getTextColor: (value) => (value ? "green-10" : "red-10"),
      filteredRows: computed(
        () => $store.getters["products/getSubscriptionRow"]
      ),
      columns: computed(() => $store.getters["products/getSubscriptionCol"]),
      category: computed(() => $store.getters["products/getSubscriptionCat"]),
      rows: computed(() => $store.getters["products/getSubscriptionRow"]),
      filterByIndustry(row) {
        this.filteredRows = [...this.rows].filter(
          (val) => val.category == row.name
        );
      },
      onSubmitSubscribe(row) {
        if (row.approvalType == 'ApprovalRequired') {
          row.subscription = 'Requested'
        } else {
          row.subscription = 'Subscribed'
        }
        if (accountID.value != '') {
          check.value = true
        } else {
          check.value = false
        }
        let subscribeData = {
          catalogID: row.catalogID,
          catalogAccountID: accountID.value,
          notes: notes.value == null ? "" : notes.value,
        }

        $store
          .dispatch("products/subscribeData", subscribeData)
          .then((response) => {
            if(row.approvalType == 'ApprovalRequired' && response.status == "Success"){
               $q.notify({
                type: "positive",
                position: "top",
                message: "Catalog requested successfully",
              });
            }
             else if (row.approvalType != 'ApprovalRequired' && response.status == "Success") {
              $q.notify({
                type: "positive",
                position: "top",
                message: "Catalog subscribed successfully",
              });
            }
            else{
              accountID.value = '';
              notes.value = ''
              $q.notify({
                type: "negative",
                position: "top",
                message: "Your Catalog/SKU's limit exceeded",
              });
               router.push('/account/plan')

            }
          });
      },
      onReset(){
        accountID.value = '';
        notes.value = ''
      }
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
.catalogDiv :deep(.q-img__image){
  object-fit: contain !important;
}

.my-sticky-header-column-table{
  max-height: 80vh;
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
:deep(.on-left)
 {
    margin-right: 6px;
}
.file {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // max-width: 100px;
  float: left;
  margin-right: 10px;
}
</style>

