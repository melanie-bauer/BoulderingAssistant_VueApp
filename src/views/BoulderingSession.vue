<script setup>
import {RouterLink} from "vue-router";
import HomeButton from "../components/HomeButton.vue";
import PrimaryButton from "../components/PrimaryButton.vue";
</script>

<template>
  <HomeButton />
  <div class="container d-flex flex-column justify-content-between">
    <div class="text-center mt-5">
      <label class="form-label text">Enter Person's Height</label>
      <input class="form-control form-control-lg" type="text" placeholder="Height in cm" aria-label=".form-control-lg example">
    </div>
    <div class="text-center">
      <PrimaryButton id="startButton" to="/connectRaspi" width="80%" fontSize="35px">Start Session</PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
#startButton{
  margin-bottom: 50px;
}
.text {
  font-size: 25px !important;
}

input {
  max-height: 40px;
}

.container {
  min-height: 100vh !important;
  max-height: 100vh;
  padding: 75px 15px 40px 15px !important;
  overflow: hidden;
}
</style>
