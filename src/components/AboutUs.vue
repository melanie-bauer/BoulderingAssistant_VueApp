<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const names = ["Melanie Bauer", "Elysee Mbala", "Jacob Mayrwöger", "Maximilian Neumayer"];
const images = [
  new URL('@/assets/images/Melanie_Bauer.jpg', import.meta.url).href,
  new URL('@/assets/images/Mbala_Elysee.jpg', import.meta.url).href,
  new URL('@/assets/images/Jacob_Mayrwöger.jpg', import.meta.url).href,
  new URL('@/assets/images/Maximilian_Neumayer.jpg', import.meta.url).href
];
const index = ref(0);
const isCarousel = ref(window.innerWidth < 992);

const next = () => {
  index.value = (index.value + 1) % names.length;
};

const prev = () => {
  index.value = (index.value - 1 + names.length) % names.length;
};

const handleResize = () => {
  isCarousel.value = window.innerWidth < 992;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="container">
    <div class="row small-mb">
      <h1 class="text-align-center">About Us</h1>
    </div>
    <div v-if="isCarousel" class="carousel">
      <button @click="prev" class="arrow left">
        <img src="@/assets/images/prev.png" alt="Previous">
      </button>
      <div class="image-wrapper">
        <img :src="images[index]" alt="Image" class="main-image img-fluid">
      </div>
      <button @click="next" class="arrow right">
        <img src="@/assets/images/next.png" alt="Next">
      </button>
      <h4 class="caption">{{ names[index] }}</h4>
    </div>
    <div v-else class="grid-layout">
      <div v-for="(img, i) in images" :key="i" class="grid-item">
        <img :src="img" :alt="names[i]" class="grid-image img-fluid">
        <h4 class="caption">{{ names[i] }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 35px;
}

img, svg {
  vertical-align: inherit;
}

.carousel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}

.image-wrapper {
  text-align: center;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.main-image {
  min-height: 50vh;
  max-height: 60vh;
  max-width: 80%;
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
  top: 47%;
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

@media (prefers-color-scheme: light) {
  .arrow > img {
    filter: brightness(0) saturate(100%);
  }
}

.grid-layout {
  display: grid;
  gap: 10px;
  width: 100%;
}


.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid-image {
  min-width: 30vw;
  max-width: 30vw;
}

@media (min-width: 992px) {
  .grid-layout {
    grid-template-columns: repeat(2, 1fr);
  }
  .caption{
    margin: 20px 0 30px 0;
  }
}

@media (min-width: 1200px) {
  .grid-layout {
    grid-template-columns: repeat(4, 1fr);
    margin-top: 20px;
  }
  .grid-image{
    min-width: 20vw;
    max-width: 20vw;
  }
  .grid-item{
    display: flex;
    justify-content: center;
  }
}
</style>
