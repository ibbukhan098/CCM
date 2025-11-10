<template>
  <q-layout view="hHh lpR fFf" >
    <users></users>
  </q-layout>
</template>

<script>
export default {
  components: {
    users: require("src/components/features/settings/users/users.vue").default,
  },
};
</script>

<style>
</style>