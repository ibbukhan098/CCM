<template>
  <q-layout view="hHh lpR fFf" >
    <accountsettings></accountsettings>
  </q-layout>
</template>

<script>
export default {
  components: {
    accountsettings: require("src/components/features/account/address/address.vue").default,
  },
};
</script>

<style>
</style>