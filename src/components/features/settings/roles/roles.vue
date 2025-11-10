<template>
  <div class="settingsDiv  q-pa-sm">
    <div class="text-h6 titleUnderline q-ml-md"> Roles </div>
    <div v-show="showSkeleton">
      <table-skeleton></table-skeleton>
    </div>
    <div class="q-mt-lg" v-show="!showSkeleton">
      <q-table
        class="
          box-shadow
          catalogs-table
          primary-text
          border-radius
          my-sticky-header-column-table
          sticky-table
          q-ml-md
        "
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[0]"
        binary-state-sort
        flat
        bordered
        :filter="filter"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:top>
          <q-space />
          <q-input
            rounded
            outlined
            standout
            dense
            clearable
            debounce="100"
            v-model="filter"
            placeholder="Search by Name"
            style="min-width: 300px"
            class="q-pr-md"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <div class="create-role-div">
            <q-btn
              label="Create Role"
              rounded
              outlined
              standout
              icon="mdi-account-plus"
              color="primary"
              class=""
              @click="openRole"
              v-if="activeAccountData?.plan?.name != 'Free'"
            >
              <q-dialog v-model="openModal">
                <role-popup />
              </q-dialog>
            </q-btn>
          </div>
        </template>
        <template v-slot:no-data="">
          <div
            class="full-width full-height text-accent q-gutter-sm"
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;"
          >
            <img src="~assets/vectors/NoDesign.svg" alt="Login_banner" />
            <span class="norecords"> No Records Found ! </span>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props" style="padding-right: 38px" >
              <q-icon name="mdi-pencil" size="1.00em" style="cursor: pointer" />
              {{ props.row.name }}
              <q-popup-edit
                v-model="props.row.name"
                title="Update Role Name"
                :validate="(val) => val.length > 0"
                buttons
                @save="(v, i) => {
                    updateItem(v, i, props.row, 'name');
                  }"
                @cancel="cancelItem()"
                v-slot="scope"
              >
                <q-input
                  type="text"
                  v-model="scope.value"
                  dense
                  autofocus
                  maxlength="30"
                  mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
                  :rules="[(val) => scope.validate(val) || 'NAME IS REQUIRED']"
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="selectedPages" :props="props" >
             <q-icon name="mdi-pencil" size="1.00em" style="cursor: pointer" />
              {{ getPageName(props.row).toString().replaceAll(",", ", ") }}
              <q-popup-edit
                v-model="selectedPageNames"
                title="Update Pages Accessible"
                :validate="(val) => val.length > 0"               
                @before-show="assignCurrentModel(props.row)"
                @save="(v, i) => {
                    updateItem(v, i, props.row, 'selectedPages');
                  }"
                @cancel="cancelItem()"
                v-slot="scope"
              >
                <q-select
                  v-model="selectedPageNames"
                  multiple
                  :options="options"
                  use-chips
                  stack-label
                  option-label="ModuleName"
                  option-value="pageId"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  :rules="[(val) => scope.validate(val) || 'PAGES ARE REQUIRED']"
                >
                <template v-slot:after>
                  <div class="">
                     <q-btn class="q-mr-sm" type="submit"
                    @click="updateItem(selectedPageNames, i, props.row, 'selectedPages')"
                    label="Save" rounded outlined standout color="primary"/>
                  </div>                    
                </template>                
                </q-select>
              </q-popup-edit>
            </q-td>
            <q-td key="createdDate" :props="props" style="padding-right: 38px">
              {{ getDate(props.row.createdDate) }}
            </q-td>
            <q-td key="status" :props="props">
              <q-toggle
                v-model="props.row.status"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                @update:model-value="
                  confirmStatus(
                    props.row.status,
                    !props.row.status,
                    props.row,
                    'status'
                  )
                "
              ><div style="display:none;">ada</div></q-toggle>
            </q-td>
            <q-td key="deleted" :props="props">
              <q-btn
                flat
                round
                color="negative"
                icon="mdi-trash-can"
                no-caps
                @click="deleteRow(props.row)"
              ><div style="display:none;">sdgref</div></q-btn>
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
import { useQuasar,date } from "quasar";

export default {
  components:{
    'table-skeleton': require("src/components/restate/skeleton/table.vue").default,
    "role-popup": require("src/components/features/settings/roles/addRolesPopup.vue").default
  },
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const showSkeleton = ref(false);
    const openModal = ref(false);
    let filter = ref("");
    const firstPage = ref([]);
    const selectedPageNames = ref([])
    const options = ref(null)
    let rows = computed(() => $store.getters["common/getRoleOptions"]);
    let activeAccountData = computed(
      () => $store.getters["auth/getAccountData"]
    );
    let activeuser = ref(null);
    let activeRows = ref(null);
    const userRows = computed(() => $store.getters["common/getUserRows"]);
    const pages = computed(() => $store.getters["common/getPages"])
    const planDetails = ref(null);
    const activePlan = ref(null);
    const totalPages = ref([]);
    onBeforeMount(() => {
      $store.dispatch("common/getRoles")
      $store.dispatch("common/getPages").then(pages=>{
        firstPage.value = pages.filter(page=> page.ModuleName == 'Dashboard')
        pages = pages.filter(page=> page.ModuleName != 'Dashboard')
        options.value = pages
      })
      $store.dispatch("auth/getPlansForPayment").then((val) => {
        planDetails.value = val;
        showSkeleton.value = false
      });
      $store.dispatch("auth/getAccount").then((val) => {
        activePlan.value = val;
      });
    });

    const onSearch = () => {
      if (filter.value !== "") {
        if (filter.value.length >= 2) {
          let data = rows.value.filter((row) =>
            row.name.toLowerCase().includes(filter.value.toLowerCase())
          );
          rows.value.splice(0, rows.value.length, ...data);
        } else {
          $store.dispatch("common/getRoles");
        }
      } else {
        $store.dispatch("common/getRoles");
      }
    };

    $store.subscribe((data) => {
      switch (data.type) {
        case "common/closePopup": {
          openModal.value = false
        }
      }
    })

    const updateItem = async(value,initValue,data, colname) => {
      if (value == initValue) {
        $q.notify({
          type: "positive" ,
          position: "top",
          message:"Role updated successfully",
          timeout:1000
        })
      } else {
        let result
        if (colname == 'name') {
          let payload = {
            id: data.id,
            name: value,
            code: data.code,
            roleType: 1,
            status: data.status,
            deleted: data.deleted,
            selectedPages: data.selectedPages,
            createdDate : data.createdDate
          }
           result = await $store.dispatch("common/updateRole", payload)
        } else if (colname == 'selectedPages') {
          if(value.length == 0){
            return
          }
           totalPages.value = firstPage.value.concat(value)
          let payload = {
            id: data.id,
            name: data.name,
            code: data.code,
            roleType: 1,
            status: data.status,
            deleted: data.deleted,
            selectedPages: totalPages.value,
            createdDate : data.createdDate
          };

          payload[colname] = colname == 'selectedPages' ? totalPages.value.map(function(obj){return obj.PageId;}).join(',') : value
          result = await $store.dispatch('common/updateRole',payload)
          
         }else if (colname == 'status') {
          let payload = data
          result = await $store.dispatch('common/updateRole',payload)
        }
        if (result == undefined) {
          $q.notify({
            type: "negative" ,
            position: "top",
            message:"Error while updating the role",
            timeout:1000
          })
        } else {
          $q.notify({
            type: "positive" ,
            position: "top",
            message:"Role updated successfully",
            timeout:1000
          })  
        }
        }
      
    }

    const confirmStatus = async(value,initValue,data,colname) => {
      let status = value ? "active" : "inactive";
       activeuser = userRows.value.filter(x=>x.roleName == data.name)
      let userNameArray = []
      activeuser.forEach(user=>{
        userNameArray.push(user.name)
      })
      if(userNameArray.length > 0){
        activeuser = userRows.value.filter(x=>x.roleName == data.name)
        let userNameArray = []
        activeuser.forEach(user=>{
          userNameArray.push(user.name)
        })
        $q.dialog({
          title: "",
          options: {
            items: [
              { label: userNameArray.join(" , "),  color: 'secondary' },
            ]
          },
          message: "Are you sure you want to delete the role? Role is associated with below username.You want to delete the role change the role in below username",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
       let index = rows.value.findIndex((x) => x.id == data.id);
        rows.value[index].status = !value;
      })
      .onCancel(() => {
       let index = rows.value.findIndex((x) => x.id == data.id);
        rows.value[index].status = !value;
      });
      } else {
      $q.dialog({
        title: "",
        message:"Are you sure you want to make the status as " + status + "?",
        cancel: true,
        persistent: true,
      })
      .onOk(() => {
        updateItem(value, initValue, data, colname);
      })
      .onCancel(() => {
        let index = rows.value.findIndex((x) => x.id == data.id);
        rows.value[index].status = !value;
      });
    }
    }
  
    const deleteRow = async(row) => {
      // let userows = computed(() => $store.getters["common/getUserRows"]);
      activeuser = userRows.value.filter(x=>x.roleName == row.name)
      let userNameArray = []
      activeuser.forEach(user=>{
        userNameArray.push(user.name)
      })
      if(userNameArray.length > 0){
        activeuser = userRows.value.filter(x=>x.roleName == row.name)
        let userNameArray = []
        activeuser.forEach(user=>{
          userNameArray.push(user.name)
        })
        $q.dialog({
          title: "",
          options: {
            items: [
              { label: userNameArray.join(" , "),  color: 'secondary' },
            ]
          },
          message: "Are you sure you want to delete the role? Role is associated with below username.You want to delete the role change the role in below username",
          cancel: true,
          persistent: true,
        })
      } else {
        $q.dialog({
          title: "",
          message: "Are you sure you want to delete the role?",
          cancel: true,
          persistent: true,
        })
        .onOk(async() => {
          let payload = {
            id: row.id,
            name: row.name,
            code: row.code,
            roleType: 1,
            status: row.status,
            deleted: true,
            selectedPages: row.selectedPages,
            createdDate : row.createdDate
          }
          let result = await $store.dispatch("common/updateRole", payload)
          if (result.status == 'Success') {
            $q.notify({
              type: "positive",
              position: "top",
              message: "Role deleted successfully",
              timeout:1000
            });
          } else {
            $q.notify({
              type: "negative",
              position: "top",
              message: "Error while deleting the role",
              timeout:1000
            });
          }
        })
        .onCancel(() => {
        })
      }
    }

    return {
      pageName: computed(() => selectedPageNames.value),
      updateItem,
      deleteRow,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        rowsPerPage: 0,
      },
      pagination: ref({
        rowsPerPage: 0,
      }),
      showSkeleton,
      onSearch,
      totalPages,
      activeuser,
      filter,
      openModal,
      selectedPageNames,
      planDetails,
      activePlan,
      activeAccountData,
      activeRows,
      confirmStatus,
      userRows,
      firstPage,
      getPageName(id) {
        let pageNo = (id.selectedPages || "").split(",");
        let pageNames = [];
        let pages = this.pages;
        pageNo.forEach((element) => {
          for (let i = 0; i < pages.length; i++) {
            if (parseInt(element) == pages[i].PageId) {
              pageNames.push(pages[i].ModuleName);
            }
          }
        });
        return pageNames;
      },
      getDate(pDate) {
        return date.formatDate(pDate, "MM-DD-YYYY");
      },
      columns: computed(() => $store.getters["common/getRoleCol"]),
      rows,
      role: $store.state.common.usersTableData.roleOptions[0],
      options,
      statusOptions: ["Active", "Inactive"],
      pages,
      status: ref(""),
      openRole() {
        $store.dispatch("common/getPages");
        openModal.value = true;
      },
      assignCurrentModel(row){
        selectedPageNames.value = []
        let pagesArray = JSON.parse("[" + row.selectedPages + "]")
        pagesArray.shift()
        pagesArray.forEach(number => {
          let isTrue = pages.value.filter(x=>x.PageId == number)          
          isTrue.length > 0 ? selectedPageNames.value.push(isTrue[0]) : ''
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.catalogDiv :deep(.q-img__image) {
  object-fit: contain !important;
}

.my-sticky-header-column-table {
  max-height: 80vh;
  tr th {
    position: sticky;
    z-index: 2;
    background: #fff;
  }
  thead tr:last-child th {
    top: 48px;
    z-index: 3;
  }
  thead tr:first-child th {
    top: 0;
    z-index: 1;
  }
  tr:first-child th:first-child {
    z-index: 3;
  }
  td:first-child {
    z-index: 1;
  }
  td:first-child,
  th:first-child {
    position: sticky;
    left: 0;
  }
}
.q-separator {
    border: 0;
    background: none;
    margin: 0;
    transition: background 0.3s, opacity 0.3s;
    flex-shrink: 0;
}
.q-card__section--vert {
    padding-top: 16px;
}
q-toggle{
  .q-toggle__inner--truthy .q-toggle__track {
    opacity: 1.54;
  }
  .q-toggle__track {
    color:darkgreen;
    // background-color: black;
  }
}
</style>
