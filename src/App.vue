
<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref} from "vue";
const onHome = ref(true);

function changeOnHome() {
  onHome.value = !onHome.value;
}
function setFullHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setFullHeight();
window.addEventListener('resize', setFullHeight);
</script>

<template>
    <RouterView/>
</template>

<style>

body{
  background: var(--background);
}

</style>