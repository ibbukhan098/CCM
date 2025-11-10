<template>
  <q-layout view="hHh lpR fFf">
    <home />
  </q-layout>
</template>

<script>

export default {
  components: {
    home: require("src/components/features/home/home.vue").default,
  },
  
};
</script>

<style>
</style>