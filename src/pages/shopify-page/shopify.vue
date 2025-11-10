<template>
  <q-layout view="hHh lpR fFf">
    <shopifypage />
  </q-layout>
</template>

<script>

export default {
  components: {
    shopifypage: require("src/components/features/shopify-page/shopifypage.vue").default,
  },
  
};
</script>

<style>
</style>