<script>
import {ref} from "vue";

export const elapsedTime = ref('');
</script>
<script setup>
import { ref } from "vue";
import HomeButton from "../components/HomeButton.vue";

const personHeight = ref('');
const showError = ref(true);
const startTime = ref();
const timerInterval = ref();
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
      if (!response.ok) {
        console.error('Failed to save height');
      }
    } catch (error) {
      console.error('Error updating personHeight:', error);
    }
  }
}
function startTiming()
{
  startTime.value = Date.now();
  timerInterval.value = setInterval(updateTimer, 1000);
}
function updateTimer() {
  elapsedTime.value = '';
  const elapsedTimeMs = Date.now() - startTime.value;
  let seconds = Math.floor(elapsedTimeMs / 1000);
  if(seconds / 3600 >= 1)
  {
    elapsedTime.value += `${Math.floor(seconds/3600)}:`
    seconds = seconds % 3600;
  }

  elapsedTime.value += `${String(Math.floor(seconds/60)).padStart(2, '0')}:`;
  seconds = seconds % 60;
  elapsedTime.value += String(seconds).padStart(2, '0')
  console.log(elapsedTime.value);
}
</script>


<template>
  <HomeButton/>
  <div class="container d-flex flex-column justify-content-between">
    <div class="text-center mt-5">
      <label class="form-label text">Enter Person's Height</label>
      <input v-model="personHeight" aria-label=".form-control-lg example" class="form-control form-control-lg" placeholder="Height in cm"
             type="text" @input="validateInput">
      <p v-if="showError" class="text-danger">Please enter a number between 30 and 230.</p>
    </div>
    <div class="text-center">
      <RouterLink
          v-if="!showError"
          to="/connectRaspi"
          :style="{ width: '80%', fontSize: '30px'}"
          class="btn btn-primary"
      @click="startTiming">
        Start Session
      </RouterLink>
      <button
          v-else
          class="btn btn-primary"
          :style="{ width: '80%', fontSize: '30px', opacity: 0.5 }">
        Start Session
      </button>
    </div>
  </div>
</template>

<style scoped>
btn {
  margin-bottom: 50px;
}

.text {
  font-size: 25px !important;
}

input {
  max-height: 40px;
}

.container {
  min-height: 100vh !important;
  max-height: 100vh;
  padding: 75px 15px 40px 15px !important;
  overflow: hidden;
}
</style>
