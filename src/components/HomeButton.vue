<script setup>
import {RouterLink} from "vue-router";
</script>
<template>
  <div class="row">
    <RouterLink to="/"><img id="home-img" src="../assets/images/home.png"></RouterLink>
  </div>
</template>
<style>
#home-img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(0%) hue-rotate(31deg) brightness(107%) contrast(105%);
  max-height: 40px;
  max-width: 40px;

}
</style>