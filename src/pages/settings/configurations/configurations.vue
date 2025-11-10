<template>
  <q-layout view="hHh lpR fFf" >
    <configurations></configurations>
  </q-layout>
</template>

<script>
export default {
  components: {
    configurations: require("src/components/features/settings/configurations/configurations.vue").default,
  },
};
</script>

<style>
</style>