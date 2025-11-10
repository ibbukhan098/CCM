<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-card-section class="row items-center q-mb-sm">
      <span class="text-h6 titleUnderline">Add Role</span>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup/>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form
        @submit="onSubmit" @reset ="onReset"
      >
        <div class="row q-gutter-md q-pb-lg items-center">
          <div class="col">
            <p class="text-bold text-body2 q-mb-sm q-pb-none">Name*</p>
            <q-input
              placeholder="admin"
              type="text"
              v-model="roleName"
              ref="roleRef"
              rounded outlined dense standout
              @blur="checkRoleName(roleName, roleArray)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'NAME IS REQUIRED', val => checkRoleName(val) || 'ROLE NAME ALREADY EXISTS']"
            >
              <div style="display:none;">ada</div>
            </q-input>
          </div>
          <div class="col">
            <p class="text-bold text-body2 q-mb-sm q-pb-none">Status*</p>
            <q-select
              rounded outlined dense standout
              ref="statusRef"
              v-model="status"
              :options="statusOptions"
              class="col-sm"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) ||'SELECT THE STATUS',]"
            ></q-select>
          </div>
        </div>
        <div class="row q-gutter-md q-pb-sm items-center">
          <div class="col">
            <p class="text-bold text-body2 q-mb-sm q-pb-none">Pages Accessible*</p>
            <q-select
              v-model="modelMultiple"
              ref="optionsRef"
              rounded outlined dense standout
              multiple
              :options="options"
              use-chips
              stack-label
              option-label="ModuleName"
              option-value="pageId"
              class="col-sm"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) ||'SELECT THE PAGES',]"
            ></q-select>
          </div>
        </div>
        <div class="text-primary text-right">
         <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
          <q-btn class="q-mr-sm" label="Reset" type="reset" rounded outlined standout color="primary"/>
          <q-btn label="Submit"  type="submit"  rounded outlined standout color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from 'vuex'
import { useFormChild, useQuasar } from 'quasar'


export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const roleName = ref(null);
    const roleRef = ref(null)
    const statusRef = ref(null)
    const optionsRef = ref(null)
    const options = ref(null);
    const status = ref('')
    const modelMultiple = ref(null)
    let roleArray = ref([])
    onBeforeMount(() => {
      $store.dispatch("common/getRoles");
      $store.dispatch("common/getPages").then(pages=>{
        pages = pages.filter(page=> page.ModuleName != 'Dashboard')
        options.value = pages
      })
    });

    const checkRoleName = (roleName, roleArray) =>{
      roleArray = $store.getters["common/getRoles"]
      const mappedArray = roleArray.map(el => (el.toLowerCase()))
      let isUniqueRole = !mappedArray.includes(roleName.toLowerCase())
      return isUniqueRole
    }

    const submitRole = async() => {
      $store.dispatch('common/closePopup',false)
      let pages = [1];
      let result
      modelMultiple.value = modelMultiple.value.map(val=>{pages.push(val.PageId)})
      if (status.value ==="Active") {
        let roleData = {
          id: 0,
          name: roleName.value,
          code:"",
          roleType: 1,
          status: true,
          deleted: false,
          selectedPages: pages.toString()
        }
        result = await $store.dispatch('common/addRole', roleData)
      } else if (status.value ==="Inactive") {
        let roleData = {
          id: 0,
          name: roleName.value,
          code:"",
          roleType: 1,
          status: false,
          deleted: false,
          selectedPages: pages.toString()
        }
        result = await $store.dispatch('common/addRole', roleData)
      }
      if (result.status == 'Success') {
        $q.notify({
          type: "positive" ,
          position: "top",
          message: "Role created successfully",
        });
      } else {
        $q.notify({
          type: "negative" ,
          position: "top",
          message: "Error while adding the role",
        });
      }  
    }

    return {
      roleName,
      roleRef,
      submitRole,
      statusRef,
      optionsRef,
      checkRoleName,
      roleArray,
      status,
      statusOptions: ["Active", "Inactive"],
      modelMultiple,
      options,
      onSubmit () {
        submitRole()
      },
      onReset () {
        roleName.value = null;
        status.value = null;
        modelMultiple.value = null;
      }
    };
  },
};
</script>
<style lang="scss" scoped>
.titleUnderline{
  padding-top: 0;
}
.q-field--with-bottom {
  padding-bottom: 0px;
}
</style>