<template>
  <router-link :to="to" :style="{width: width, fontSize: fontSize}" class="btn btn-primary">
    <slot>Default Button Text</slot>
  </router-link>
</template>

<script>
export default {
  name: 'RouterButton',
  props: {
    to: {
      type: String,
      required: true
    },
    width:{
      type: [Number, String],
      required: false
    },
    fontSize: {
      type: [Number, String],
      required: false
    }
  }
};
</script>

<style>

.btn {
  padding: 3px 10px 1px 9px !important;
  box-shadow: 0 10px 20px -5px var(--primary);
  font-size: var(--header-r);
}
</style>
