<script setup>
import {elapsedTime, timerInterval, startTime, startTiming, isDbUpdated} from "@/views/BoulderingSession.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import {onMounted, ref} from "vue";
import {RouterLink} from "vue-router";

const personHeight = ref();

async function endSession() {
  clearInterval(timerInterval);
  isDbUpdated.value = false;
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
  <div class="absolute-container overlay align-items-center">
    <RouterLink to="/connectRaspi" class="button d-flex align-items-center">
      <img class="img" src="@/assets/images/back-arrow.png" alt="back arrow">
      Continue
    </RouterLink>
  </div>
  <div class="container d-flex flex-column justify-content-between">

      <div class="padding">
        <h4>Time in current Session:</h4>
        <p v-if="elapsedTime" class="h4">{{ elapsedTime }}</p>
        <p v-else class="h4">00:00</p>
      </div>
      <div class="padding">
        <h4>Height of climbing Person:</h4>
        <p v-if="elapsedTime" class="h4">{{ personHeight }} cm</p>
        <p v-else class="h4">00:00</p>
      </div>

    <div class="text-center row d-flex justify-content-center align-items-center padding">
      <PrimaryButton font-size="30px" to="/" width="100%" class="mx-1" @click="endSession">End Session</PrimaryButton>
    </div>
  </div>
</template>

<style scoped>


.padding {
  padding: 0 5% 0 5%;
}

.overlay {
  z-index: 10;
  position: relative;
}

.absolute-container {
  position: absolute;
  top: 22px;
  padding: 0 20px 0 20px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  min-height: 50px;
}

.container {
  position: absolute;
  top: 20vh;
  width: 100vw;
  height: 80vh;
  padding-bottom: 40px;
  padding-top: 15px;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(0%) hue-rotate(31deg) brightness(107%) contrast(105%);
  max-height: 40px;
  max-width: 40px;
  padding-bottom: 5px;
  margin-right: 5px;
}

.button {
  padding-top: 5px;
  min-height: 50px;
  font-size: 32px;
  font-weight: bold;
  text-decoration: none;
  color: var(--text);
}
@media (prefers-color-scheme: light) {
  .img {
    filter: brightness(0) saturate(100%);
  }
}
</style>
