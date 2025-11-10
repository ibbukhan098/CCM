<template>
  <q-layout view="hHh lpR fFf" >
    <plan></plan>
  </q-layout>
</template>

<script>
export default {
  components: {
    plan: require("src/components/features/account/plan/new-plan.vue").default,
  },
};
</script>

<style>
</style>