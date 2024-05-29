<template>
  <div id="jitsi-container" style="width: 100%; height: 100%;"></div>
</template>

<script>
import JitsiMeetJS from "@vitejs/plugin-vue";

JitsiMeetJS.init();
let connection = new JitsiMeetJS.JitsiConnection(null, null, options);


export default {
  name: 'JitsiMeet',
  mounted() {
    this.initJitsi();
  },
  methods: {
    initJitsi() {
      const domain = 'meet.jit.si';
      const options = {
        roomName: 'YourRoomName',
        width: '100%',
        height: '100%',
        parentNode: document.getElementById('jitsi-container'),
        configOverwrite: {
          constraints: {
            video: {
              facingMode: 'environment' // Rückkamera verwenden
            }
          }
        }
      };
      this.api = new JitsiMeetExternalAPI(domain, options);
      this.api.executeCommand('displayName', 'Your Name');
    }
  }
}
</script>

<style scoped>
#jitsi-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
