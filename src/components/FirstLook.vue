<script setup>
import {RouterLink} from 'vue-router'
</script>

<template>
  <div class="gradient container d-flex flex-column justify-content-center">
    <h1 class="col-6">Bouldering Assistant</h1>
    <p class="col-10 label">Your digital assistant to help visually impaired people with bouldering.</p>
    <RouterLink class="btn btn-primary text" to="/boulderingSession">Get started <b>NOW</b></RouterLink>
  </div>
</template>

<style scoped>
a {
  max-width: fit-content;
  margin-top: var(--spacing-sm);
}

.gradient {
  min-height: 40%;
  padding: 0 15px 0 15px;
  background: radial-gradient(at right center, #E8D5B0FF 0%, rgb(182, 167, 172) 4%, rgba(96, 88, 163, 1) 26%,
  var(--background) 57%);
}

@media (prefers-color-scheme: light) {
  .gradient {
    background: radial-gradient(at right center, rgba(232, 213, 176, 1) 0%,rgb(182, 167, 172) 9%, rgba(166, 161, 209, 1) 18%, rgb(167, 162, 211) 28%,var(--background) 57%);
  }
}

</style>