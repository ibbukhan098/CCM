<template>
  <div class="row q-mb-sm">
    <q-input
      :value="password"
      type="password"
      @input="$emit('update:password', $event)"
      :rules="[val => !!val || 'FIELD IS REQUIRED']"
      autofocus
      ref="password"
      class="col"
      label="Password"
      outlined
    >
    <q-icon name="lock" size="md" color="primary" />     
    </q-input>
  </div>
</template>

<script>
export default {
  props: ['password']
}
</script>