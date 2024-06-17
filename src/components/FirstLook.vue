<script setup>
import { ref, onMounted } from 'vue';
import PrimaryButton from "@/components/PrimaryButton.vue";
import heightToggleButton from "@/components/HeightToggleButton.vue";

// State to manage device type and overlay visibility
const isPhone = ref(false);
const showOverlay = ref(false);

// Check device type on component mount
onMounted(() => {
  isAPhone();
});
function isAPhone()
{
  isPhone.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600;

}
window.addEventListener('resize', isAPhone);

// Function to show overlay
const showOverlayMessage = () => {
  if (!isPhone.value) {
    showOverlay.value = true;
  }
};

// Function to hide overlay
const hideOverlayMessage = () => {
  showOverlay.value = false;
};
</script>

<template>
  <div :class="{ 'blur': showOverlay }">
    <div class="gradient container d-flex flex-column">
      <h1 class="col-sm-12 header-xl">Bouldering Assistant</h1>
      <h4 class="col-11">Your digital assistant to help visually impaired people with bouldering.</h4>
      <button v-if="!isPhone" class="button col-8 btn-large btn btn-primary" @click="showOverlayMessage">Get started <b>NOW</b></button>
      <PrimaryButton v-else class="button col-8 btn-large" to="/boulderingSession">Get started <b>NOW</b></PrimaryButton>
    </div>
  </div>
  <!-- Overlay -->
  <div v-if="showOverlay" class="overlay">
    <div class="overlay-content">
      <p class="h4">You can't start a session as long as you are not on a phone.</p>
      <button class="ok-button btn btn-primary" @click="hideOverlayMessage">OK</button>
    </div>
  </div>
</template>

<style scoped>
.btn {
  padding: 3px 10px 1px 9px !important;
  font-size: var(--header-r);
}

.blur {
  filter: blur(5px);
  z-index: 10;
  min-height: calc(var(--vh, 1vh) * 100);
}

/* Overlay styling */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10% ;
  z-index: 1000;
}

.overlay-content {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--button-radius);
  text-align: center;
  color: black;
}

.ok-button {
  margin-top: var(--spacing-m);
}

.container {
  background-color: var(--background);
  color: var(--text);
  padding: var(--spacing-m);
}

.gradient {
  padding: var(--spacing-xl) var(--spacing-m);
  min-height: 200px;
  background: radial-gradient(at right center, #E8D5B0FF 0%, rgb(182, 167, 172) 4%, rgba(96, 88, 163, 1) 26%, var(--background) 57%);
}

.button {
  margin: var(--spacing-xl) 0 var(--spacing-m) 0;
}

/* Light mode gradient */
@media (prefers-color-scheme: light) {
  .gradient {
    background: radial-gradient(at right center, rgba(232, 213, 176, 1) 0%, rgb(182, 167, 172) 9%, rgba(166, 161, 209, 1) 18%, rgb(167, 162, 211) 28%, var(--background) 57%);
  }
}

/* Larger screen adjustments */
@media (min-width: 992px) {
  .container {
    min-height: calc(var(--vh, 1vh) * 60);
  }

  .button {
    margin: calc(var(--vh, 1vh) * 25) 0 var(--spacing-xl) 0;
    height: calc(var(--vh, 1vh) * 10);
  }
}
</style>
