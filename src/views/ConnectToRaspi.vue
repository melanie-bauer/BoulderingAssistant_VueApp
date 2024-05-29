<script setup>
import { RouterLink } from "vue-router";
import HomeButton from "../components/HomeButton.vue";
import Canvas from "../components/Canvas.vue";
</script>

<template>
  <div class="container">
    <Canvas></Canvas>
    <HomeButton @click=""/>
  </div>
</template>

<script>

</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
