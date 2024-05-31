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
        v-if="points"
        id="Head"
        :style="{
        top: points.Head.y - headSize / 2 + 'px',
        left: points.Head.x - headSize / 2 + 'px',
      }"
        class="head"
        draggable="true"
        @mousedown="startDrag($event, 'Head')"
        @touchstart="startDrag($event, 'Head')"
    ></div>
  </div>
</template>


<script setup>
import {ref, reactive, onMounted, computed, onBeforeUnmount} from 'vue';

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

const video = ref();
let mediaStream;
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/points');
    const data = await response.json();
    Object.assign(points, data.reduce((acc, point) => {
      acc[point.id] = point;
      return acc;
    }, {}));
    drawStickman(points);
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

  // Then draw the stickman and other elements
  ctx.beginPath();
  // Draw the body
  ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
  ctx.lineTo(points.Hip.x, points.Hip.y);
  // Left leg
  ctx.lineTo(points.LK.x, points.LK.y);
  ctx.lineTo(points.LF.x, points.LF.y);
  // Right leg
  ctx.moveTo(points.Hip.x, points.Hip.y);
  ctx.lineTo(points.RK.x, points.RK.y);
  ctx.lineTo(points.RF.x, points.RF.y);
  // Left arm
  ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
  ctx.lineTo(points.LE.x, points.LE.y);
  ctx.lineTo(points.LH.x, points.LH.y);
  // Right arm
  ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
  ctx.lineTo(points.RE.x, points.RE.y);
  ctx.lineTo(points.RH.x, points.RH.y);
  // Head
  ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
  ctx.lineTo(points.Head.x, points.Head.y);

  ctx.strokeStyle = 'white';
  ctx.stroke();
}

function startDrag(event, key) {
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
  // Update backend
  const key = currentPoint.value;
  try {
    const response = await fetch(`http://localhost:3000/points/${key}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(points[key])
    });
    if (!response.ok) {
      console.error('Failed to update points');
    }
  } catch (error) {
    console.error('Error updating points:', error);
  }
}

onMounted(() => {
  canvas.value = document.getElementById('canvas');
  video.value = document.getElementById('video');
  fetchData();
  setInterval(fetchData, 1000); // Fetch data every second
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: {
      facingMode: { ideal : "environment"}
      }, audio: false })
        .then(function(stream) {
          mediaStream = stream;
          video.value.srcObject = stream;
          video.value.play();
          drawVideoFrame();
        })
        .catch(function(err) {
          console.error("Error accessing media devices.", err);
        });
  } else {
    console.error("getUserMedia not supported in this browser.");
  }
});

const drawVideoFrame = () => {
  const context = canvas.value.getContext('2d');
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  drawStickman(points);
  requestAnimationFrame(drawVideoFrame);
};

onBeforeUnmount(() => {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => {
      track.stop();
    });
  }
});

</script>

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