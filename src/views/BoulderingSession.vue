<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {baseURL} from "@/config.js";
// Variables
const personHeight = ref(''); // Height input field value
const showError = ref(true); // Flag to show error message

// Methods
async function validateHeightInput() {
  const height = parseInt(personHeight.value); // Parse height input value to integer
  showError.value = isNaN(height) || height < 30 || height > 230; // Show error if height is not a number or out of range
  if (!showError.value) {
    try {
      const response = await fetch(`${baseURL}/personHeight`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({personHeight: height}) // Update person's height in the database
      });
    } catch (error) {
      console.error('Error updating personHeight:', error);
    }
  }
}
</script>

<script>
import { ref } from "vue";
import {baseURL} from "@/config.js";
// Variables
export const elapsedTime = ref('00:00'); // Elapsed time counter
export const timerInterval = ref(); // Interval for updating timer
export const startTime = ref(0); // Start time of the session
export const isDbUpdated = ref(false); // Flag to indicate if database is updated
const BODY_PROPORTIONS = { /* Relative body proportions for mapping points */
  Head: {y: 0.20, x: 0.5},
  Shoulders: {y: 0.30, x: 0.5},
  Hip: {y: 0.50, x: 0.5},
  LH: {y: 0.5, x: 0.25},
  RH: {y: 0.5, x: 0.75},
  LE: {y: 0.40, x: 0.35},
  RE: {y: 0.40, x: 0.65},
  LK: {y: 0.65, x: 0.35},
  RK: {y: 0.65, x: 0.65},
  LF: {y: 0.8, x: 0.25},
  RF: {y: 0.8, x: 0.75}
};
const points = ref([]); // Array to store body points

// Methods

/**
 * Reset body points based on screen dimensions and body proportions
 */
async function resetBodyPoints() {
  const height = window.innerHeight;
  const width = window.innerWidth;

  points.value = Object.keys(BODY_PROPORTIONS).map(key => ({
    id: key,
    x: width * BODY_PROPORTIONS[key].x,
    y: height * BODY_PROPORTIONS[key].y
  }));
  await writePointsInDB(); // Write body points to the database
}

/**
 * Write body points to the database
 */
async function writePointsInDB() {
  for (let point of points.value) {
    try {
      const response = await fetch(`${baseURL}/points/${point.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(point)
      });
      isDbUpdated.value = true; // Update flag if database is updated
    } catch (error) {
      console.error('Error updating points:', error);
    }
  }
}

/**
 * Start timing session and update timer
 */
export async function startTiming() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value); // Clear previous timer interval
  }
  if (startTime.value === 0 || startTime.value == undefined) {
    startTime.value = Date.now(); // Set start time if not already set
    try {
      const response = await fetch(`${baseURL}/startTime`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({startTime: startTime.value}) // Update start time in the database
      });
    } catch (error) {
      console.error('Error updating startTime:', error);
    }
  }
  await updateTimer(); // Update timer display
  timerInterval.value = setInterval(updateTimer, 1000); // Start interval for updating timer
}

/**
 * Update timer display with elapsed time
 */
async function updateTimer() {
  elapsedTime.value = '';
  const elapsedTimeMs = Date.now() - startTime.value;
  let seconds = Math.floor(elapsedTimeMs / 1000);
  // Format elapsed time in HH:MM:SS format
  if (seconds / 3600 >= 1) {
    elapsedTime.value += `${Math.floor(seconds / 3600)}:`
    seconds = seconds % 3600;
  }
  elapsedTime.value += `${String(Math.floor(seconds / 60)).padStart(2, '0')}:`;
  seconds = seconds % 60;
  elapsedTime.value += String(seconds).padStart(2, '0')
}

/**
 * Reset body points and start timing session when button is clicked
 */
async function handleButtonClick() {
  await resetBodyPoints(); // Reset body points
  await startTiming(); // Start timing session
}
</script>


<template>
  <!-- Main content -->
  <div class="container d-flex flex-column justify-content-between">
    <!-- Navigation button -->
    <div class="absolute-container overlay align-items-center">
      <RouterLink class="button d-flex align-items-center" to="/">
        <img class="img" src="@/assets/images/home.png">
      </RouterLink>
    </div>
    <div class="text-center mt">
      <label class="form-label text">Enter Person's Height</label>
      <!-- Height input field -->
      <input v-model="personHeight" aria-label=".form-control-lg example"
             class="form-control form-control-lg input my-3"
             placeholder="Height in cm"
             type="text" @input="validateHeightInput">
      <!-- Error message for invalid height -->
      <p v-if="showError" class="text-danger mt-1">Please enter a number between 30 and 230.</p>
    </div>
    <div class="text-center">
      <!-- Start session button -->
      <RouterLink
          v-if="!showError"
          :style="{ width: '100%', fontSize: '30px'}"
          class="btn btn-primary"
          to="/connectRaspi"
          @click="handleButtonClick">
        Start Session
      </RouterLink>
      <!-- Disabled start session button when there's an error -->
      <button
          v-else
          :style="{ width: '100%', fontSize: '30px', opacity: 0.5 }"
          class="btn btn-primary">
        Start Session
      </button>
    </div>
  </div>
</template>

<style scoped>
.input:focus {
  outline: none;
  box-shadow: 0 0 15px 5px var(--primary);
}
.mt{
  margin-top: 60%;
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


.text {
  font-size: 25px !important;
}

input {
  max-height: 40px;
}

.container {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  padding-bottom: 40px;
  padding-top: 15px;
}

.img {
  filter: brightness(0) saturate(100%) invert(100%) sepia(4%) saturate(0%) hue-rotate(31deg) brightness(107%) contrast(105%);
  max-height: 50px;
  max-width: 50px;
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

  .input:focus {
    box-shadow: 0 0 15px 5px var(--secondary);

  }
}
</style>
