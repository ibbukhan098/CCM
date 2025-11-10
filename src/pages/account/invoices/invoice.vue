<template>
  <q-layout view="hHh lpR fFf" >
    <invoice></invoice>
  </q-layout>
</template>

<script>
export default {
  components: {
    invoice: require("src/components/features/account/invoice/invoice.vue").default,
  },
};
</script>

<style>
</style>