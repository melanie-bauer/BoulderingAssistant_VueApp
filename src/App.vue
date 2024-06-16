
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

body{
  background: var(--background);
}

</style>