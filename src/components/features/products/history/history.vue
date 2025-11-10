<template>
  <div class="q-px-md">
    <div v-show="showSkeleton">
      <table-skeleton></table-skeleton>
    </div>
    <div class="catalogDiv" v-show="!showSkeleton">
      <q-table
        virtual-scroll
        v-model:pagination="pagination"
        class="box-shadow catalogs-table primary-text border-radius my-sticky-header-column-table sticky-table"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        row-key="name"
        no-data-label="I Didn't Find Anything For You"
        no-results-label="The Filter Didn't Uncover Any Results"
        binary-state-sort
        :rows-per-page-options="[0]"
        flat
        bordered
      >
        <template v-slot:top-right>
          <q-input
            rounded outlined standout
            dense
            clearable
            debounce="300"
            v-model="filter"
            placeholder="Search by Supplier Name"
            style="min-width: 300px"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:no-data="{  message }">
          <div class="full-width full-height text-accent q-gutter-sm" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <img src="~assets/vectors/NoDesign.svg"  alt="Login_banner">
            <span class="norecords">
              No Records Found !
            </span>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="supplierName" :props="props" style="padding-right:38px">
              <!-- <a :href="props.row.storeURL" target="_blank"  class="anchor-link cp">
                <q-icon
                  name="mdi-link-variant"
                  size="14px"
                  color="primary"
                  class="cursor-pointer q-pr-xs"
                >
                </q-icon>
                <span class="anchor-link cp">{{ props.row.supplierName }}</span>
              </a> -->
              <span class="anchor-link cp">{{ props.row.supplierName }}</span>
            </q-td>
            <q-td key="fileName" :props="props" style="padding-right:38px">
              {{ props.row.fileName }}
            </q-td>
            <q-td key="requestedDate" :props="props" style="padding-right:38px">
              {{ getDate(props.row.requestedDate) }}
            </q-td>
            <q-td key="rows" :props="props" style="padding-right:38px">
              {{ props.row.rows }}
            </q-td>
            <q-td key="connectionType" :props="props" style="padding-right:38px">
              {{ props.row.connectionType }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { date } from "quasar";

export default {
  components:{
        'table-skeleton': require("src/components/restate/skeleton/table.vue").default
  },
  setup() {
    const $store = useStore();
    const showSkeleton = ref(true)
    onBeforeMount(() => {
      $store.dispatch("products/getHistoryNode").then(val=>{
        showSkeleton.value = false
      })
    });
    return {
      showSkeleton,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 0
      },
      pagination: ref({
        rowsPerPage: 0
      }),
      filter: ref(""),
      columns: computed(() => $store.getters["products/getHistoryTableColumns"]),
      rows: computed(() => $store.getters["products/getHistoryTableRows"]),
      getDate(pDate){
        return date.formatDate(pDate, 'MM-DD-YYYY HH:MM A')
      }
    };
  },
};
</script>

<style lang="scss" scoped>
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

</style>

