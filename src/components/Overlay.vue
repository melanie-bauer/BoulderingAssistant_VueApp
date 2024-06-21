<template>
  <div v-if="show" class="overlay">
    <div class="overlay-content">
      <p class="h4">{{ message }}</p>
      <button class="ok-button btn btn-primary" @click="hideOverlay">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overlay',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    hideOverlay() {
      this.$emit('close-overlay');
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 3px 10px 1px 9px !important;
  font-size: var(--header-r);
}

/* Overlay styling */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(var(--vh)*100);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
  z-index: 1000;
}

.overlay-content {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--button-radius);
  text-align: center;
  color: black;
}

.ok-button {
  margin-top: var(--spacing-m);
}
</style>
