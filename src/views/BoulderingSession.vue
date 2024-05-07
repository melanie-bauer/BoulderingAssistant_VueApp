<script setup>
import {RouterLink} from "vue-router";
import HomeButton from "../components/HomeButton.vue";
</script>

<template>

  <div class="container">
    <HomeButton />
    <div class="row">
      <input class="form-control form-control-lg" type="text" placeholder="Height in cm" aria-label=".form-control-lg example">
      <RouterLink to="/connectRaspi" class="btn btn-primary">Start Session</RouterLink>
    </div>
  </div>
</template>

<style scoped>

.container{
  min-height: 100vh !important;
  max-height: 100vh;
  padding: 15px !important;
  overflow: hidden;
}

</style>