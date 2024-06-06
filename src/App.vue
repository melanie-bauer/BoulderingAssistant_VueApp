<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref} from "vue";

const onHome = ref(true);

function changeOnHome() {
  onHome.value = !onHome.value;
}
</script>

<template>
    <RouterView/>
</template>

<style>
.container{
  background-color: var(--background);
  color: var(--text);
  min-width: 100% !important;
  padding: 0 15px 65px 15px;
}
body{
  background: var(--background);
}

</style>