<script setup>
import {RouterLink} from 'vue-router'
import PrimaryButton from "@/components/PrimaryButton.vue";
</script>

<template>
  <div class="gradient container d-flex flex-column">
    <h1 class="col-sm-12 header-xl">Bouldering Assistant</h1>
    <h4 class="col-11">Your digital assistant to help visually impaired people with bouldering.</h4>
    <PrimaryButton class="button col-8 btn-large" to="/boulderingSession">Get started <b>NOW</b></PrimaryButton>
  </div>
</template>

<style scoped>
.container {
  background-color: var(--background);
  color: var(--text);
  padding: var(--spacing-m);
}
.gradient {
  padding: var(--spacing-xl) var(--spacing-m);
  min-height: 200px;
  background: radial-gradient(at right center, #E8D5B0FF 0%, rgb(182, 167, 172) 4%, rgba(96, 88, 163, 1) 26%, var(--background) 57%);
}
.button {
  margin: var(--spacing-xl) 0 var(--spacing-m) 0;
}

@media (prefers-color-scheme: light) {
  .gradient {
    background: radial-gradient(at right center, rgba(232, 213, 176, 1) 0%, rgb(182, 167, 172) 9%, rgba(166, 161, 209, 1) 18%, rgb(167, 162, 211) 28%, var(--background) 57%);
  }
}
@media (min-width: 992px) {
  .container {
    min-height: calc(var(--vh, 1vh) * 60);
  }
  .button {
    margin: calc(var(--vh, 1vh) * 25) 0 var(--spacing-xl) 0;
    height: calc(var(--vh, 1vh) * 10);
  }
}
</style>
