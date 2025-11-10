<template>
  <q-layout view="hHh lpR fFf">
      <account></account>
  </q-layout>
</template>

<script>
export default {
   components :{
       'account' : require('../../components/features/account/account.vue').default
   }
}
</script>

<style>

</style>