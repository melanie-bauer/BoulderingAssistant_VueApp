<script setup>
import ButtonLink from '@/components/ButtonLink.vue';
import {elapsedTime, timerInterval, startTime, startTiming} from "@/views/BoulderingSession.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import {onMounted, ref} from "vue";
const personHeight = ref();
async function endSession() {
  clearInterval(timerInterval);
  try {
    const response = await fetch("http://localhost:3000/personHeight/personHeight", {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: 0
      })
    });
  } catch (error) {
    console.error('Error updating personHeight:', error);
  }
  try {
    const response = await fetch('http://localhost:3000/startTime/startTime', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: 0})
    });
  } catch (error) {
    console.error('Error updating startTime:', error);
  }
  elapsedTime.value = '00:00';
}
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/startTime/startTime');
    const data = await response.json();
    startTime.value = data.value;
      await startTiming();
  } catch (error) {
    console.error('Error updating personHeight:', error);
  }
  try {
    const response = await fetch('http://localhost:3000/personHeight/personHeight');
    const data = await response.json();
    personHeight.value = data.value;
  } catch (error) {
    console.error('Error updating personHeight:', error);
  }

})
</script>
<template>
  <ButtonLink
      img-src="/deploy-vue-vite-app/src/assets/images/back-arrow.png"
      to="/connectRaspi"
      top-distance="27px">
    Continue
  </ButtonLink>
  <div class="container d-flex flex-column justify-content-around">
    <div>
      <h4>Time in current Session:</h4>
      <p v-if="elapsedTime" class="h4">{{ elapsedTime }}</p>
      <p v-else class="h4">00:00</p>
    </div>
    <div>
      <h4>Height of climbing Person:</h4>
      <p v-if="elapsedTime" class="h4">{{personHeight}} cm</p>
      <p v-else class="h4">00:00</p>
    </div>
    <div class="d-flex justify-content-center">
      <PrimaryButton font-size="30px" to="/" width="100%" @click="endSession">End Session</PrimaryButton>
    </div>
  </div>
</template>
<style scoped>
.container {
  min-height: 100vh !important;
  max-height: 100vh;
  padding: 100px 30px 35px 30px !important;
  overflow: hidden;
}
</style>