<template>
  <div class="settingsDiv q-pa-sm">
    <div class="text-h6 titleUnderline q-ml-md"> Users </div>
    <div class="q-mt-lg" v-show="showSkeleton">
      <table-skeleton></table-skeleton>
    </div>
    <div class="q-mt-lg" v-show="!showSkeleton">
      <q-table
        virtual-scroll
        v-model:pagination="pagination"
        class="q-ml-md box-shadow catalogs-table primary-text border-radius my-sticky-header-column-table sticky-table"
        :rows="rows"
        :columns="columns"
        :filter="filter"
        row-key="name"
        binary-state-sort
        :rows-per-page-options="[0]"
        flat
        bordered
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
            rounded outlined standout
            dense
            clearable
            debounce="300"
            v-model="filter"
            placeholder="Search by Name"
            style="min-width: 300px"
            class="q-pr-md"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <div class="create-user-div" v-if="rolesData.length > 0">
            <q-btn
              label="Create User"
              rounded outlined standout
              icon="mdi-account-plus"
              color="primary"
              class="card__images"
              @click="prompt = true"
            />
            <q-dialog v-model="prompt">
              <user-popup @closeDialog="close"/>
            </q-dialog>
          </div>
        </template>
        <template v-slot:no-data="">
          <div class="full-width full-height text-accent q-gutter-sm" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <img src="~assets/vectors/NoDesign.svg" alt="Login_banner">
            <span class="norecords">
              No Records Found !
            </span>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="firstName" :props="props">
              <q-icon name="mdi-pencil" size="1.00em" style="cursor: pointer" />
              {{ props.row.firstName }}
              <q-popup-edit
                v-model="props.row.firstName"
                title="Update firstName"
                :validate="val => val.length > 0"
                buttons
                @save="
                  (v, i) => {
                    updateUser(v, i, props.row, 'firstName');
                  }
                "
                @cancel="
                  (v, i) => {
                    cancelled(v, i, props.row, 'firstName');
                  }
                "
                v-slot="scope"
              >
                <q-input
                  maxlength="30"
                  mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
                  v-model="scope.value"
                  dense
                  autofocus
                  @keyup.enter="scope.set"
                  :rules="[
                      val => scope.validate(val) || 'FIRSTNAME IS REQUIRED'
                    ]"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="lastName" :props="props">
                <q-icon name="mdi-pencil" size="1.00em" style="cursor: pointer" />
                  {{ props.row.lastName }}
                <q-popup-edit
                  v-model="props.row.lastName"
                  title="Update lastName"
                  :validate="val => val.length > 0"
                  buttons
                  @save="
                    (v, i) => {
                      updateUser(v, i, props.row, 'lastName');
                    }"
                  @cancel="
                    (v, i) => {
                      cancelled(v, i, props.row, 'lastName');}"
                  v-slot="scope"
                >
                  <q-input
                    type="text"
                    v-model="scope.value"
                    maxlength="30"
                    dense
                    autofocus
                    @keyup.enter="scope.set"
                    :rules="[
                      val => scope.validate(val) || 'LASTNAME IS REQUIRED'
                    ]"
                />
              </q-popup-edit>
            </q-td>
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="role" :props="props">
              <q-icon name="mdi-pencil" size="1.00em" class="cursor-pointer"/>
              {{ props.row.roleName }}
              <q-popup-edit
                v-model="props.row.roleName"
                :validate="roleValidation"
                 @hide="roleValidation"
                title="Update Role"
                @save="
                  (v, i) => {
                    updateUser(v, i, props.row, 'role');
                  }"
                @cancel="
                  (v, i) => {
                    cancelled(v, i, props.row, 'role');
                  }
                "
                v-slot="scope"
                buttons
              >
                <q-select
                  v-model="scope.value"
                  :options="rolesData"
                   option-label = "name"
                    option-value = "id"
                  stack-label
                  dense
                  autofocus
                  :error="errorRole"
                  :error-message="errorMessageRole"
                  @keyup.enter="scope.set"
                 
                />
              </q-popup-edit>
            </q-td>
            <q-td key="status" :props="props">
               <q-toggle
                v-model="props.row.status"
                checked-icon="check"
                color="green"
                unchecked-icon="clear"
                @update:model-value ="confirmStatus(props.row.status, !props.row.status, props.row, 'status')"
              />
            </q-td>
            <q-td key="delete" :props="props">
              <q-btn
                flat round color="negative" icon="mdi-trash-can" no-caps
                @click="deleteRow(props.row)"
              ><div style="display:none">frgaet</div></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    let prompt = ref(false);
    const rows = computed(() => $store.getters["common/getUserRows"]);
    const rolesData = computed(() => $store.getters["common/getActiveRoleOptions"]);
    let roleOptions = ref(null);
    const showSkeleton = ref(true);
    const errorRole = ref(false);
    const errorMessageRole = ref('');
    onBeforeMount(() => {
      $store.dispatch("common/getUsers").then(val=>{
         showSkeleton.value = false
      })
    });

    $store.subscribe((data) => {
      switch (data.type) {
        case "common/closePrompt": {
          prompt.value = false
        }
      }
    })

    const updateUser = async (value,initValue,data,colname) => {
      if (value == initValue) {
        $q.notify({
          type: "positive" ,
          position: "top",
          message:"Role updated successfully",
        })
      } else {
        let result
        if (colname == 'firstName') {
          let userDetails = {
            id: data.id,
            name: value + ' ' + data.lastName,
            deleted: data.deleted,
            email: data.email,
            firstName: value,
            lastName: data.lastName,
            status: data.status,
            roleId: data.roleId,
            isEmailValidated: data.isEmailValidated,
            profileImage: data.profileImage,
            isFirstTimeUser: data.isFirstTimeUser
          };
          result = await $store.dispatch("common/updateUser",userDetails)
        } else if (colname == 'lastName') {
          let userDetails = {
            id: data.id,
            name: data.firstName + ' ' + value,
            deleted: data.deleted,
            email: data.email,
            firstName: data.firstName,
            lastName: value,
            status: data.status,
            roleId: data.roleId,
            isEmailValidated: data.isEmailValidated,
            profileImage: data.profileImage,
            isFirstTimeUser: data.isFirstTimeUser
          };
          result = await $store.dispatch("common/updateUser",userDetails)
        } else if (colname== 'role') {
          let allRoles = $store.getters["common/getRoleOptions"]
          
          let userDetails = {
            id: data.id,
            name: data.firstname + ' ' + data.lastName,
            deleted: data.deleted,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            status: data.status,
            roleId: 0,
            isEmailValidated: data.isEmailValidated,
            profileImage: data.profileImage,
            isFirstTimeUser: data.isFirstTimeUser
          };
          userDetails.roleId = (allRoles.filter(x=> x.name == value))[0].id
          result = await $store.dispatch("common/updateUser",userDetails)
        } else if (colname == 'status') {
          let userDetails = {
            id: data.id,
            name: data.firstName + ' ' + data.lastName,
            deleted: data.deleted,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            status: value,
            roleId: data.roleId,
            isEmailValidated: data.isEmailValidated,
            profileImage: data.profileImage,
            isFirstTimeUser: data.isFirstTimeUser
          };
          result = await $store.dispatch("common/updateUser",userDetails)
        } else  if (colname == 'deleted') {
          let userDetails = {
            id: data.id,
            name: data.firstName + ' ' + data.lastName,
            deleted: value,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            status: data.status,
            roleId: data.roleId,
            isEmailValidated: data.isEmailValidated,
            profileImage: data.profileImage,
            isFirstTimeUser: data.isFirstTimeUser
          };
          result = await $store.dispatch("common/deleteUser",userDetails)
        }
      }
    }

    return {
      showSkeleton,
      updateUser,
      errorRole,
      errorMessageRole,
      filter: ref(''),
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 0
      },
      pagination: ref({
        rowsPerPage: 0
      }),
      prompt,
      columns: computed(() => $store.getters["common/getUserCols"]),
      roleOptions: computed(()=> $store.getters['common/getActiveRoleOptions']),
      rows,
      rolesData,
      role: $store.state.common.usersTableData.roleOptions[0],
      //Methods

      roleValidation(val) {
        if (val === null){
          errorRole.value = true
          errorMessageRole.value = 'ROLE IS REQUIRED'
          return false
        }
        errorRole.value = false
        errorMessageRole.value = ''
        return true
      },
      deleteRow(row) {
        $q.dialog({
          title: "",
          message: "Are you sure you want to delete the user?",
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            updateUser(true, "", row, "deleted");
          })
          .onCancel(() => {
          })
          .onDismiss(() => {
          });
      },
      onDialogHide() {
        prompt = false;
      },
      close(val){
         prompt = !val
      },
      confirmStatus(val, initVal, data, colname){
          let status = val ? 'active' : 'inactive';
           $q.dialog({
          title: "",
          message:"Are you sure you want to make the status as "+status+"?",
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            updateUser(val, initVal, data, colname)
          })
          .onCancel(() => {
            let index = rows.value.findIndex(x=>x.id == data.id)
            rows.value[index].status = !val
          })
      },
      cancelled(val, initVal, data, colname) {
      },
    };
  },
  components: {
    "user-popup":
      require("src/components/features/settings/users/addUsersPopup.vue")
        .default,
    "table-skeleton": require("src/components/restate/skeleton/table.vue").default

  },
};
</script>

<style lang="scss" scoped>

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
  }
}

</style>
