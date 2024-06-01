<template>
  <router-link
      :to="to "
      :style="{ width: width, fontSize: fontSize }"
      class="btn btn-primary"
  >
    <slot>Default Button Text</slot>
  </router-link>
</template>

<script>
export default {
  name: 'PrimaryButton',
  props: {
    to: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    fontSize: {
      type: [Number, String],
      required: false,
      default: 'inherit'
    }
  }
};
</script>

<style scoped>
.btn {
  padding: 3px 10px 1px 9px !important;
  font-size: var(--header-r);
}

.disabled-link {
  pointer-events: none;
  opacity: 0.5;
}
</style>
