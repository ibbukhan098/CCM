<template>
  <div class="row q-mb-sm">
    <q-input
      :value="email"
      @input="$emit('update:email', $event)"
      :rules="[val => !!val || 'FIELD IS REQUIRED']"
      autofocus
      ref="email"
      class="col"
      label="Email"
      outlined
    >
    <q-icon name="mail" size="md" color="orange" />     
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['email']
}
</script>