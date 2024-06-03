<script setup>
import {RouterLink} from 'vue-router'
import PrimaryButton from "../components/PrimaryButton.vue";
</script>

<template>
  <div class="gradient container d-flex flex-column">
    <h1 class="col-6">Bouldering Assistant</h1>
    <p class="col-11">Your digital assistant to help visually impaired people with bouldering.</p>

  </div>
  <div class="container d-flex align-content-center">
    <PrimaryButton to="/boulderingSession" width="70%" font-size="24px">Get started <b>NOW</b></PrimaryButton>
  </div>

</template>

<style scoped>


p{
  font-size: 18px !important;
  line-height: 26px !important;
  letter-spacing: var(--letter-spacing-body);
  hyphens: auto;
}
.gradient {
  padding: 65px 15px 25px 15px;
  min-height: 200px;
  background: radial-gradient(at right center, #E8D5B0FF 0%, rgb(182, 167, 172) 4%, rgba(96, 88, 163, 1) 26%,
  var(--background) 57%);
}

@media (prefers-color-scheme: light) {
  .gradient {
    background: radial-gradient(at right center, rgba(232, 213, 176, 1) 0%,rgb(182, 167, 172) 9%, rgba(166, 161, 209, 1) 18%, rgb(167, 162, 211) 28%,var(--background) 57%);
  }
}

</style>