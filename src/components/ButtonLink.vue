<script>
export default {
  name: 'Button Link',
  props: {
    to: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    },
    topDistance: {
      type: [Number, String],
      required: false,
      default: '20px'
    }
  }
}
</script>
<script setup>
import {RouterLink} from "vue-router";
</script>
<template>
  <RouterLink :style="{top: topDistance}" :to="to" class="button d-flex align-items-center">
    <img id="img" :src="imgSrc">
    <slot></slot>
  </RouterLink>
</template>
<style>

#img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(0%) hue-rotate(31deg) brightness(107%) contrast(105%);
  max-height: 40px;
  max-width: 40px;
  padding-bottom: 5px;
  margin-right: 5px;
}

.button {
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  color: var(--text);
  position: absolute;
  left: 20px;
  z-index: 100;
}

@media (prefers-color-scheme: light) {

  #home-img {
    filter: brightness(0) saturate(100%) invert(0%) sepia(26%) saturate(0%) hue-rotate(31deg) brightness(97%) contrast(101%);
  }
}
</style>