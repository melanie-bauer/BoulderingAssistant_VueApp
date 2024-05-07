<script setup>
import { RouterLink } from "vue-router";
import HomeButton from "../components/HomeButton.vue";
</script>

<template>
  <div class="container">
    <video ref="video" autoplay></video>
    <HomeButton @click="stopCamera"/>
  </div>
</template>

<script>
export default {
  name: "CameraView",
  mounted() {
    this.setupCamera();
  },
  beforeUnmount() {
    this.stopCamera();
  },
  methods: {
    async setupCamera() {
      const videoElement = this.$refs.video;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        this.videoStream = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    },
    stopCamera() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(track => track.stop());
      }
    },
  },
  data() {
    return {
      videoStream: null
    };
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
