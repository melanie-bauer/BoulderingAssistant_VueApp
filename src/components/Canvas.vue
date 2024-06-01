  <script>
  import {ref} from "vue";
  export const draggableLimbs = ref(['Head', 'Shoulders', 'Hip', 'LE', 'RE', 'LK', 'RK', 'LF', 'RF', 'LH', 'RH']);
  </script>
  <script setup>
  import {ref, reactive, onMounted, computed, onBeforeUnmount, watch, onUnmounted} from 'vue';
  import { eventbus } from './Eventbus.js';
  const props = defineProps({
    showFixedPositionButton: {
      type: Boolean,
      required: true
    }
  });

  const canvas = ref(null);
  const isDragging = ref(false);
  const currentPoint = ref(null);
  const offset = reactive({ x: 0, y: 0 });
  const pointSize = 20;
  const headSize = 60;
  const points = reactive({
    "Head": { id: "Head", x: 160, y: 120 }
  });

  const filteredPoints = computed(() => {
    const allowedKeys = ['Head', 'item'];
    return Object.fromEntries(Object.entries(points).filter(([key]) => !allowedKeys.includes(key)));
  });

  const displayHead = ref(false);
  const video = ref();
  let mediaStream;
  watch(() => props.showFixedPositionButton, (newVal) => {
    if (newVal) {
      draggableLimbs.value = ['Head', 'Shoulders', 'Hip', 'LE', 'RE', 'LK', 'RK', 'LF', 'RF', 'LH', 'RH'];
    } else {
      draggableLimbs.value = ['Head', 'Shoulders', 'Hip'];
    }
  });
  function getLimbPair(key) {
    switch (key) {
      case 'LE':
      case 'LH':
        return ['LE', 'LH', 'Head', 'Shoulders', 'Hip'];
      case 'RE':
      case 'RH':
        return ['RE', 'RH', 'Head', 'Shoulders', 'Hip'];
      case 'LK':
      case 'LF':
        return ['LK', 'LF', 'Head', 'Shoulders', 'Hip'];
      case 'RK':
      case 'RF':
        return ['RK', 'RF', 'Head', 'Shoulders', 'Hip'];
      default:
        return [];
    }
  }

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/points');
      const data = await response.json();
      if (!isDragging.value) {
        Object.assign(points, data.reduce((acc, point) => {
          acc[point.id] = point;
          return acc;
        }, {}));
        drawStickman(points);
        displayHead.value = true;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function drawStickman(points) {
    const ctx = canvas.value.getContext('2d');
    ctx.lineWidth = 5;
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

    ctx.beginPath();
    if (points.Shoulders && points.Hip) {
      ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
      ctx.lineTo(points.Hip.x, points.Hip.y);
    }
    if (points.LK && points.LF) {
      ctx.lineTo(points.LK.x, points.LK.y);
      ctx.lineTo(points.LF.x, points.LF.y);
    }
    if (points.RK && points.RF) {
      ctx.moveTo(points.Hip.x, points.Hip.y);
      ctx.lineTo(points.RK.x, points.RK.y);
      ctx.lineTo(points.RF.x, points.RF.y);
    }
    if (points.LE && points.LH) {
      ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
      ctx.lineTo(points.LE.x, points.LE.y);
      ctx.lineTo(points.LH.x, points.LH.y);
    }
    if (points.RE && points.RH) {
      ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
      ctx.lineTo(points.RE.x, points.RE.y);
      ctx.lineTo(points.RH.x, points.RH.y);
    }
    if (points.Head) {
      ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
      ctx.lineTo(points.Head.x, points.Head.y);
    }

    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  function startDrag(event, key) {
    if (!props.showFixedPositionButton && draggableLimbs.value.length === 3) {
      if (['LE', 'LH', 'RE', 'RH', 'LK', 'LF', 'RK', 'RF'].includes(key)) {
        draggableLimbs.value = getLimbPair(key);

      }
    }
    let value = draggableLimbs.value.map(item => item);
    if(value.includes(key)) {
      isDragging.value = true;
      currentPoint.value = key;

      const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
      const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;

      offset.x = clientX - points[key].x;
      offset.y = clientY - points[key].y;
      if (event.type === 'mousedown') {
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
      } else if (event.type === 'touchstart') {
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
      }
    }
  }

  function drag(event) {
    if (!isDragging.value) return;
    const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
    const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;

    points[currentPoint.value].x = clientX - offset.x;
    points[currentPoint.value].y = clientY - offset.y;
    drawStickman(points);
  }

  async function endDrag() {
    isDragging.value = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', endDrag);

    const key = currentPoint.value;
    try {
      const response = await fetch(`http://localhost:3000/points/${key}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(points[key])
      });
    } catch (error) {
      console.error('Error updating points:', error);
    }
  }

  onMounted(() => {
    canvas.value = document.getElementById('canvas');
    video.value = document.getElementById('video');
    fetchData();
    setInterval(fetchData, 3000); // Fetch data every 3 seconds

    eventbus.on('reset-draggable-limbs', async (oldPoints) => {

      for(let limb in draggableLimbs.value)
      {
        try {
          const response = await fetch(`http://localhost:3000/points/${draggableLimbs.value[limb]}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(oldPoints[draggableLimbs.value[limb]])
          });
        } catch (error) {
          console.error('Error updating points:', error);
        }
      }
      draggableLimbs.value = ['Head', 'Shoulders', 'Hip'];
      await fetchData();
    });
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      })
          .then(stream => {
            mediaStream = stream;
            video.value.srcObject = stream;
            video.value.play();
            drawVideoFrame();
          })
          .catch(err => {
            console.error("Error accessing media devices.", err);
          });
    } else {
      console.error("getUserMedia not supported in this browser.");
    }
    onUnmounted(() => {
    });
  });

  function drawVideoFrame() {
    const context = canvas.value.getContext('2d');
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    if (points && Object.keys(points).length > 1) {
      drawStickman(points);
    }
    requestAnimationFrame(drawVideoFrame);
  }

  onBeforeUnmount(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
      });
    }
  });
  </script>

  <template>
    <div id="container">
      <video id="video" autoplay style="display:none;"></video>
      <canvas id="canvas" ref="canvas"></canvas>
      <div
          v-for="(point, key) in filteredPoints"
          :id="key"
          :key="key"
          :style="{
          top: point.y - pointSize / 2 + 'px',
          left: point.x - pointSize / 2 + 'px',
        }"
          class="point"
          draggable="true"
          @mousedown="startDrag($event, key)"
          @touchstart="startDrag($event, key)"
      ></div>
      <div
          v-if="displayHead"
          id="Head"
          :style="{
          top: points.Head.y - headSize / 2 + 'px',
          left: points.Head.x - headSize / 2 + 'px',
        }"
          class="head"
          :draggable="true"
          @mousedown="startDrag($event, 'Head')"
          @touchstart="startDrag($event, 'Head')"
      ></div>
    </div>
  </template>


  <style scoped>
  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
  }

  .point, .head {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
  }

  .head {
    width: 60px;
    height: 60px;
  }
  </style>
