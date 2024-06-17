<script setup>
// Importing necessary modules and components
import { draggableLimbs } from "@/components/Canvas.vue";
import Canvas from "@/components/Canvas.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { onMounted, ref, watch } from "vue";
import { eventbus } from '@/components/Eventbus.js';
import { elapsedTime, startTime, startTiming } from "@/views/BoulderingSession.vue"; // Importing timing related variables and functions
import { RouterLink } from "vue-router";
import {baseURL} from "@/config.js";
import HeightToggleButton from "@/components/HeightToggleButton.vue";
// Variables and reactive references
const showFixedPositionButton = ref(true); // Flag to show/hide fixed position button
const oldPosition = ref({}); // Object to store previous position
const newPosition = ref({}); // Object to store new position
const personHeight = ref(); // Reference to store person's height

// Methods

/**
 * Confirm stickman position and toggle showFixedPositionButton flag
 */
async function confirmPosition() {
  showFixedPositionButton.value = !showFixedPositionButton.value;
  try {
    const response = await fetch(`${baseURL}/points`);
    const data = await response.json();
    Object.assign(oldPosition, data.reduce((acc, point) => {
        acc[point.id] = point;
        return acc;
      }, {}));
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}
/**
 * Reset draggable limbs to their original position
 */
function resetDraggableLimbs() {
  eventbus.emit('reset-draggable-limbs', oldPosition);
}

/**
 * Confirm next handle position
 */
async function confirmNextHandle()
{
  try {
    const response = await fetch(`${baseURL}/personHeight`);
    const data = await response.json();
    personHeight.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  try {
    const response = await fetch(`${baseURL}/points`);
    const data = await response.json();
    Object.assign(newPosition, data.reduce((acc, point) => {
      acc[point.id] = point;
      return acc;
    }, {}));
    console.log(draggableLimbs)
    let value = draggableLimbs.value.map(item => item);
    if(value.length > 3 && personHeight.value > 0) {
      showFixedPositionButton.value = !showFixedPositionButton.value;
      GenerateOutput(value[1]);
      draggableLimbs.value = ['Head', 'Shoulder', 'Hip'];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}
/**
 * Generate speech output based on the limb movement
 * @param {string} limb - The limb that is being moved
 */
function GenerateOutput(limb)
{
  let output = 'Bitte bewege deine';
  switch(limb)
  {
    case 'LH':
      output += 'linke Hand ';
      break;
    case 'RH':
      output += 'rechte Hand ';
      break;
    case 'LF':
      output += 'n linken Fuß ';
      break;
    case 'RF':
      output += 'n rechten Fuß ';
      break;
  }
  output += `${roundToNearestFive(getDifferenceHolds(limb))} Zentimeter nach ${getClockDirection(limb)}`;
  let utterance = new SpeechSynthesisUtterance(output);
  window.speechSynthesis.speak(utterance);
}

/**
 * Round a number to the nearest multiple of five
 * @param {number} number - The number to round
 * @return {number} - The rounded number
 */
function roundToNearestFive(number) {
  const lowerBound = Math.floor(number / 5) * 5;
  const upperBound = lowerBound + 5;
  return (number - lowerBound < upperBound - number) ? lowerBound : upperBound;
}
/**
 * Get clock direction based on the movement of limb
 * @param {string} limb - The limb that is being moved
 * @return {string} - The direction in clock format
 */
function getClockDirection(limb) {
  const clockTimes = [
    { min: 345, max: 15, time: "12 Uhr" },
    { min: 15, max: 45, time: "1 Uhr" },
    { min: 45, max: 75, time: "2 Uhr" },
    { min: 75, max: 105, time: "3 Uhr" },
    { min: 105, max: 135, time: "4 Uhr" },
    { min: 135, max: 165, time: "5 Uhr" },
    { min: 165, max: 195, time: "6 Uhr" },
    { min: 195, max: 225, time: "7 Uhr" },
    { min: 225, max: 255, time: "8 Uhr" },
    { min: 255, max: 285, time: "9 Uhr" },
    { min: 285, max: 315, time: "10 Uhr" },
    { min: 315, max: 345, time: "11 Uhr" }
  ]
  const point = oldPosition[limb];
  const targetPoint = newPosition[limb];

  const dx = targetPoint.x - point.x;
  const dy = targetPoint.y - point.y;
  let direction = Math.atan2(dy, dx) * (180 / Math.PI);
  if(direction < 0 && direction >= -90)
  {
    direction = 90 + direction;
  }
  else if(direction < -90)
  {
    direction = 450 + direction;
  }
  else
  {
    direction = 90 + direction;
  }
  let clockTime;
  if(direction >= 345 || direction < 15)
  {
    clockTime = clockTimes[0];
  }
  else {
    clockTime = clockTimes.find(time => direction >= time.min && direction < time.max);
  }
  return clockTime ? clockTime.time : "";
}

/**
 * Get the difference in holds for a limb movement
 * @param {string} limb - The limb that is being moved
 * @return {number} - The difference in holds
 */
function getDifferenceHolds(limb)
{
  let personTorsoHeightPX = Math.sqrt( Math.pow( Math.abs(newPosition.Hip.x - newPosition.Shoulders.x), 2) + Math.pow(Math.abs(newPosition.Hip.y - newPosition.Shoulders.y), 2));
  let personTorsoHeight = personHeight.value / 2 - personHeight.value / 7;
  let differenceHandlePX;
  switch(limb) {
    case 'LH':
      differenceHandlePX = Math.sqrt( Math.pow( Math.abs(oldPosition.LH.x - newPosition.LH.x), 2) + Math.pow(Math.abs(oldPosition.LH.y - newPosition.LH.y), 2));
      break;
    case 'RH':
      differenceHandlePX = Math.sqrt( Math.pow( Math.abs(oldPosition.RH.x - newPosition.RH.x), 2) + Math.pow(Math.abs(oldPosition.RH.y - newPosition.RH.y), 2));
      break;
    case 'LF':
      differenceHandlePX = Math.sqrt( Math.pow( Math.abs(oldPosition.LF.x - newPosition.LF.x), 2) + Math.pow(Math.abs(oldPosition.LF.y - newPosition.LF.y), 2));
      break;
    case 'RF':
      differenceHandlePX = Math.sqrt( Math.pow( Math.abs(oldPosition.RF.x - newPosition.RF.x), 2) + Math.pow(Math.abs(oldPosition.RF.y - newPosition.RF.y), 2));
      break;
  }
  let differenceHandle = differenceHandlePX * personTorsoHeight / personTorsoHeightPX;
  console.log(differenceHandle);
  return differenceHandle;
}
/**
 * Lifecycle hook - called when the component is mounted
 */
onMounted(async () => {
  try {
    const response = await fetch(`${baseURL}/startTime`);
    const data = await response.json();
    startTime.value = data;
      await startTiming();
  } catch (error) {
    console.error('Error updating personHeight:', error);
  }
})
</script>

<template>
  <!-- Main container -->
  <div class="container d-flex flex-column justify-content-between">
    <!-- Timer display -->
    <p v-if="elapsedTime" class="overlay timer">{{elapsedTime}}</p>
    <p v-else class="overlay timer">00:00</p>

    <!-- Navigation buttons -->
    <div class="absolute-container overlay align-items-center" :style="{ justifyContent: showFixedPositionButton ? 'flex-start' : 'space-between' }">
      <!-- Back button -->
      <RouterLink to="/overview" class="button d-flex align-items-center">
        <img class="img" src="@/assets/images/back-arrow.png" alt="back arrow">
      </RouterLink>

      <!-- Button to reset draggable limbs -->
      <button type="button" id="reverseButton" class="btn btn-primary overlay mx-1" v-if="!showFixedPositionButton" @click="resetDraggableLimbs">
        <img v-if="!showFixedPositionButton" width="30px" height="30px" src="../assets/images/rotate-left.png" alt="left rotating circle">
      </button>
    </div>

    <!-- Canvas component -->
    <Canvas :show-fixed-position-button="showFixedPositionButton"></Canvas>

    <HeightToggleButton @toggle-height-bar="toggleHeightBar"></HeightToggleButton>
    <!-- Action buttons -->
    <div class="text-center row d-flex justify-content-center align-items-center padding">
      <!-- Button to confirm stickman position -->
      <PrimaryButton v-if="showFixedPositionButton" id="confirmStickman" class="overlay" fontSize="30px" to="/connectRaspi" width="100%" @click="confirmPosition">
        confirm Stickman-Position
      </PrimaryButton>

      <!-- Button to confirm next handle position -->
      <PrimaryButton v-if="!showFixedPositionButton" id="confirmNextHandle" class="overlay mx-1" fontSize="30px" to="/connectRaspi" width="100%" @click="confirmNextHandle">
        confirm next Handle
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.timer {
  font-size: 50px;
  text-align: center;
  color: white;
}

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

#reverseButton {
  width: 50px;
  height: 50px;
  background-color: white;
  border: none;
}
#reverseButton > img{
  padding-left: 1px;
  filter: brightness(0) saturate(100%) invert(72%) sepia(8%) saturate(5837%) hue-rotate(201deg) brightness(89%) contrast(95%);
}

.container {
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
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
</style>
