<template>
  <q-layout view="hHh lpR fFf" style="min-height:auto">
    <settings></settings>
  </q-layout>
</template>

<script>
export default {
  components: {
    settings: require("src/components/features/settings/settings.vue").default,
  },
};
</script>

<style>
</style>