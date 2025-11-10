<template>
  <q-layout view="hHh lpR fFf">
      <catalogs></catalogs>
  </q-layout>
</template>

<script>
export default {
   components :{
       'catalogs' : require('../../components/features/catalogs/manage-subscriptions.vue').default
   }
}
</script>

<style>

</style>