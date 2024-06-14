<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import melanieImage from '@/assets/images/Melanie_Bauer.jpg';
import mbalaImage from '@/assets/images/Mbala_Elysee.jpg';
import jacobImage from '@/assets/images/Jacob_Mayrwöger.jpg';
import maximilianImage from '@/assets/images/Maximilian_Neumayer.jpg';

const names = ["Melanie Bauer", "Elysee Mbala", "Jacob Mayrwöger", "Maximilian Neumayer"];
const images = [melanieImage, mbalaImage, jacobImage, maximilianImage];
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
