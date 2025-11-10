<template>
  <q-layout view="hHh lpR fFf" >
    <apps></apps>
  </q-layout>
</template>

<script>
export default {
  components: {
    apps: require("src/components/features/settings/apps/app-config.vue").default,
  },
};
</script>

<style>
</style>