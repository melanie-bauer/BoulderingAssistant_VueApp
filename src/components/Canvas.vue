<template>
  <div id="container">
    <canvas id="canvas" ref="canvas"></canvas>
    <div
        draggable="true"
        v-for="(point, key) in filteredPoints"
        :key="key"
        :id="key"
        class="point"
        :style="{
        top: point.y-pointSize / 2 + 'px',
        left: point.x-pointSize/2 + 'px',
      }"
        @mousedown="startDrag($event, key)"
        @touchstart="startDrag($event, key)"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';

const canvas = ref(null);
const isDragging = ref(false);
const currentPoint = ref(null);
const offset = reactive({ x: 0, y: 0 });
const pointSize = 20;  // Size of the draggable point element (width and height)
const points = reactive({});

const filteredPoints = computed(() => {
  const allowedKeys = ['LH', 'RH', 'LF', 'RF'];
  return Object.fromEntries(Object.entries(points).filter(([key]) => allowedKeys.includes(key)));
});

async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/points');
    const data = await response.json();
    Object.assign(points, data);
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

  // Draw the stickman based on points
  ctx.beginPath();
  ctx.moveTo(points.Head.x + 25, points.Head.y);
  ctx.arc(points.Head.x, points.Head.y, 30, 0, Math.PI * 2, true);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
  ctx.lineTo(points.Hip.x, points.Hip.y);
  ctx.lineTo(points.LF.x, points.LF.y);
  ctx.moveTo(points.Hip.x, points.Hip.y);
  ctx.lineTo(points.RF.x, points.RF.y);
  ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
  ctx.lineTo(points.LH.x, points.LH.y);
  ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
  ctx.lineTo(points.RH.x, points.RH.y);
  ctx.moveTo(points.Shoulders.x, points.Shoulders.y);
  ctx.lineTo(points.Head.x, points.Head.y);

  ctx.strokeStyle = 'white';
  ctx.stroke();
}

function startDrag(event, key) {
  console.log("started dragging")
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
  console.log(`draging: ${isDragging.value}`);
  if (!isDragging.value) return;
  console.log(points[currentPoint.value].x + " " + points[currentPoint.value].y);
  const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
  const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;

  points[currentPoint.value].x = clientX - offset.x;
  points[currentPoint.value].y = clientY - offset.y;
  console.log(points[currentPoint.value].x + " " + points[currentPoint.value].y);
  drawStickman(points);
}

async function endDrag() {
  isDragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchmove', drag);
  document.removeEventListener('touchend', endDrag);
  
  // Update backend
  try {
    const response = await fetch('http://localhost:3000/points', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(points)
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
  fetchData();
  setInterval(fetchData, 1000); // Fetch data every second
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
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

.point {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
}
</style>
