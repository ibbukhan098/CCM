<template>
  <q-layout view="hHh lpR fFf">
    <forgot />
  </q-layout>
</template>

<script>

export default {
  components: {
    forgot: require("src/components/features/auth/new-forgot.vue").default,
  },
  
};
</script>

<style>
</style>