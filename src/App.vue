<script setup>
import {RouterLink, RouterView} from 'vue-router'
import {ref} from "vue";

const onHome = ref(true);

function changeOnHome() {
  onHome.value = !onHome.value;
}
</script>

<template>
  <div id="phone">
    <RouterView/>
  </div>
</template>

<style>
.container{
  background-color: var(--background);
  color: var(--text);
}
#phone{
  width: 375px;
  height: 667px;
  border: 1px solid black;
  overflow-x: hidden;
  overflow-y: scroll;
  font-weight: var(--font-weight-body) !important;
  color: var(--text) !important;
  background-color: var(--background);
  color: var(--text);
}
#phone::-webkit-scrollbar{
  width: 10px;
}
#phone::-webkit-scrollbar-track {
  background: #f1f1f1;
}

#phone::-webkit-scrollbar-thumb {
  background: #888;
}

#phone::-webkit-scrollbar-thumb:hover {
  background:  #555;
}
</style>