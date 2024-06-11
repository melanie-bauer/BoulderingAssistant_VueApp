<script>
import {ref} from "vue";

export const elapsedTime = ref('00:00');
export const timerInterval = ref();
export const startTime = ref(0);

async function atButtonClick() {
  await resetPoints();
  await startTiming();
}
export const isDbUpdated = ref(false);
export async function startTiming() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
  if (startTime.value == 0) {
    startTime.value = Date.now();
    try {
      const response = await fetch('http://localhost:3000/startTime/startTime', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({value: startTime.value})
      });

    } catch (error) {
      console.error('Error updating startTime:', error);
    }
  }
  await updateTimer();
  timerInterval.value = setInterval(updateTimer, 1000);

}

const BODY_PROPORTIONS = {
  Head: {y: 0.20, x: 0.5},        // Adjusted for the head to be slightly above the center
  Shoulders: {y: 0.30, x: 0.5},   // Shoulders at about 25% from the top
  Hip: {y: 0.50, x: 0.5},         // Hips at about 55% from the top
  LH: {y: 0.5, x: 0.25},         // Left hand at 25% height, 25% width
  RH: {y: 0.5, x: 0.75},         // Right hand at 25% height, 75% width
  LE: {y: 0.40, x: 0.35},          // Left elbow at 40% height, 25% width
  RE: {y: 0.40, x: 0.65},          // Right elbow at 40% height, 75% width
  LK: {y: 0.65, x: 0.35},          // Left knee at 70% height, 25% width
  RK: {y: 0.65, x: 0.65},          // Right knee at 70% height, 75% width
  LF: {y: 0.8, x: 0.25},          // Left foot at 90% height, 25% width
  RF: {y: 0.8, x: 0.75}           // Right foot at 90% height, 75% width
};

const points = ref([]);

async function resetPoints() {
  const height = window.innerHeight;
  const width = window.innerWidth;

  points.value = Object.keys(BODY_PROPORTIONS).map(key => ({
    id: key,
    x: width * BODY_PROPORTIONS[key].x,
    y: height * BODY_PROPORTIONS[key].y
  }));
  await writePointsInDB()
}

async function writePointsInDB() {
  for (let point of points.value) {
    try {
      const response = await fetch(`http://localhost:3000/points/${point.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(point)
      });
      isDbUpdated.value = true;
    } catch (error) {
      console.error('Error updating points:', error);
    }
  }
}

async function updateTimer() {
  elapsedTime.value = '';
  const elapsedTimeMs = Date.now() - startTime.value;
  let seconds = Math.floor(elapsedTimeMs / 1000);
  if (seconds / 3600 >= 1) {
    elapsedTime.value += `${Math.floor(seconds / 3600)}:`
    seconds = seconds % 3600;
  }

  elapsedTime.value += `${String(Math.floor(seconds / 60)).padStart(2, '0')}:`;
  seconds = seconds % 60;
  elapsedTime.value += String(seconds).padStart(2, '0')
}
</script>
<script setup>
import {onMounted, ref} from "vue";
import {RouterLink} from "vue-router";

const personHeight = ref('');
const showError = ref(true);


async function validateInput() {
  const height = parseInt(personHeight.value);
  showError.value = isNaN(height) || height < 30 || height > 230;
  if (!showError.value) {
    try {
      const response = await fetch('http://localhost:3000/personHeight/personHeight', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({value: height})
      });

    } catch (error) {
      console.error('Error updating personHeight:', error);
    }
  }
}

</script>


<template>
  <div class="absolute-container overlay align-items-center">
    <RouterLink class="button d-flex align-items-center" to="/">
      <img class="img" src="@/assets/images/home.png">
    </RouterLink>
  </div>

  <div class="container d-flex flex-column justify-content-between">
    <div class="text-center mt-5">
      <label class="form-label text">Enter Person's Height</label>
      <input v-model="personHeight" aria-label=".form-control-lg example"
             class="form-control form-control-lg input my-3"
             placeholder="Height in cm"
             type="text" @input="validateInput">
      <p v-if="showError" class="text-danger mt-1">Please enter a number between 30 and 230.</p>
    </div>
    <div class="text-center">
      <RouterLink
          v-if="!showError"
          :style="{ width: '100%', fontSize: '30px'}"
          class="btn btn-primary"
          to="/connectRaspi"
          @click="atButtonClick">
        Start Session
      </RouterLink>
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
  position: absolute;
  top: 20vh;
  width: 100vw;
  height: 80vh;
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
