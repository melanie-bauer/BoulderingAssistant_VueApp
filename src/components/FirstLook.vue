<script setup>
import { ref, onMounted } from 'vue';
import PrimaryButton from "@/components/PrimaryButton.vue";
import Overlay from "@/components/Overlay.vue";

// State to manage device type and overlay visibility
const isPhone = ref(false);
const showOverlay = ref(false);
const overlayMessage = ref("Du kannst keine Sitzung starten, solange du nicht auf einem Smartphone bist.");
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
      <h1 class="col-sm-12 header-xl">Boulder Assistent</h1>
      <h4 class="col-11">Ihr digitaler Assistent, der sehbehinderte Menschen beim Bouldern hilft.</h4>
      <button v-if="!isPhone" class="button col-8 btn-large btn btn-primary" @click="showOverlayMessage">Starte <b>JETZT</b></button>
      <PrimaryButton v-else class="button col-8 btn-large" to="/boulderingSession">Starte <b>JETZT</b></PrimaryButton>
    </div>
  </div>
  <!-- Overlay -->
  <Overlay
      v-if="showOverlay"
      :show="showOverlay"
      :message="overlayMessage"
      @close-overlay="hideOverlayMessage"
  />
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
  height: fit-content;
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
  }
}
</style>
