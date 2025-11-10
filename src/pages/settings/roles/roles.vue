<template>
  <q-layout view="hHh lpR fFf" >
    <roles></roles>
  </q-layout>
</template>

<script>
export default {
  components: {
    roles: require("src/components/features/settings/roles/roles.vue").default,
  },
};
</script>

<style>
</style>