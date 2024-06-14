<script setup>
// Importing necessary variables and components
import {elapsedTime, timerInterval, startTime, startTiming, isDbUpdated} from "@/views/BoulderingSession.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import {onMounted, ref} from "vue";
import {RouterLink} from "vue-router";
import {baseURL} from "@/config.js";

// Define a reactive reference for the person's height
const personHeight = ref();

// Function to end the current session
async function endSession() {
  // Clear the timer interval
  clearInterval(timerInterval);
  // Set the flag to indicate that the database is not updated
  isDbUpdated.value = false;

  // Update the person's height in the database
  try {
    const response = await fetch(`${baseURL}/personHeight/personHeight`, {
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

  // Update the session start time in the database
  try {
    const response = await fetch(`${baseURL}/startTime/startTime`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value: 0})
    });
  } catch (error) {
    console.error('Error updating startTime:', error);
  }

  // Reset the elapsed time to '00:00'
  elapsedTime.value = '00:00';
}

// Function executed when the component is mounted
onMounted(async () => {
  // Fetch and set the session start time
  try {
    const response = await fetch(`${baseURL}/startTime/startTime`);
    const data = await response.json();
    startTime.value = data.value;
    await startTiming();
  } catch (error) {
    console.error('Error updating personHeight:', error);
  }

  // Fetch and set the person's height
  try {
    const response = await fetch(`${baseURL}/personHeight/personHeight`);
    const data = await response.json();
    personHeight.value = data.value;
  } catch (error) {
    console.error('Error updating personHeight:', error);
  }
})
</script>

<template>
  <!-- Navigation button to return to the previous page -->
  <div class="absolute-container overlay align-items-center">
    <RouterLink class="button d-flex align-items-center" to="/connectRaspi">
      <img alt="back arrow" class="img" src="@/assets/images/back-arrow.png">
      Continue
    </RouterLink>
  </div>
  <!-- Container for the session information -->
  <div class="container d-flex flex-column justify-content-between">
    <!-- Session information -->
    <div class="padding">
      <h4>Time in current Session:</h4>
      <!-- Display the elapsed time -->
      <p v-if="elapsedTime" class="h4">{{ elapsedTime }}</p>
      <p v-else class="h4">00:00</p>
    </div>
    <div class="padding">
      <h4>Height of climbing Person:</h4>
      <!-- Display the person's height -->
      <p v-if="elapsedTime" class="h4">{{ personHeight }} cm</p>
      <p v-else class="h4">00:00</p>
    </div>

    <!-- Button to end the session -->
    <div class="text-center row d-flex justify-content-center align-items-center padding">
      <PrimaryButton class="mx-1" font-size="30px" to="/" width="100%" @click="endSession">End Session</PrimaryButton>
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
