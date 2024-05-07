<script setup>
import {RouterLink} from "vue-router";
</script>
<template>
    <RouterLink class="home-button" to="/"><img id="home-img" src="../assets/images/home.png"></RouterLink>
</template>
<style>
#home-img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(0%) hue-rotate(31deg) brightness(107%) contrast(105%);
  max-height: 40px;
  max-width: 40px;

}
.home-button {
   position: absolute;
   top: 20px; /* Adjust the top position as needed */
   left: 20px; /* Adjust the left position as needed */
   z-index: 100;
 }
@media (prefers-color-scheme: light)
{

  #home-img {
    filter: brightness(0) saturate(100%) invert(0%) sepia(26%) saturate(0%) hue-rotate(31deg) brightness(97%) contrast(101%);  }
  }
</style>