<template>
    <q-input
        square outlined
        v-model="username"
        label="UserName *"
        hint="UserName"
        lazy-rules
        :rules="[ val => !!val || 'USERNAME IS REQUIRED' ]"
      /> 
</template>

<script>
export default {

}
</script>

<style>

</style>