<script setup>
import { ref } from 'vue'
import AboutUs from "../components/AboutUs.vue";

const names = ["Melanie Bauer", "Mbala Elysee", "Jacob Mayrwoeger?", "Maximilian ? "];
const images = ["src/assets/images/Melanie_B.png", "src/assets/images/Mbala_Elysee.jpg", "src/assets/images/Jacob_M.jpg", "src/assets/images/Maximilian_M.png"];
const index = ref(0);

const next = () => {
  index.value = (index.value + 1) % names.length;
}

const prev = () => {
  index.value = (index.value - 1 + names.length) % names.length;
}
</script>

<template>
  <div class="container">
    <button @click="prev" class="arrow left">
      <img src="@/assets/images/prev.png" alt="Previous">
    </button>
    <div class="image-wrapper">
      <img :src="images[index]" alt="Image" class="main-image">
      <p class="caption">{{ names[index] }}</p>
    </div>
    <button @click="next" class="arrow right">
      <img src="@/assets/images/next.png" alt="Next">
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 35px;
}

img,
svg {
  vertical-align: inherit;
}

.image-wrapper {
  text-align: center;

}

.main-image {
  width: 300px;
  height: auto;
  margin: 0 20px;
}

.caption {
  margin-top: 10px;
  font-size: 18px;
}

.arrow {
  background-color: transparent;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.arrow img {
  width: 25px;
  height: auto;
}

.arrow.left {
  left: 1%;
}

.arrow.right {
  right: 1%;
}
</style>
