  <script>
  // Importing necessary modules and components
  import {ref} from "vue";
  export const draggableLimbs = ref(['Head', 'Shoulders', 'Hip', 'LE', 'RE', 'LK', 'RK', 'LF', 'RF', 'LH', 'RH']);
  </script>
  <script setup>
  // Importing necessary modules and components
  import {ref, reactive, onMounted, computed, onBeforeUnmount, watch} from 'vue';
  import { eventbus } from '@/components/Eventbus.js';
  import {isDbUpdated} from "@/views/BoulderingSession.vue";
  import {baseURL} from "@/config.js";

  // define variables
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
  const pointSize = 25;
  const headSize = 60;
  const points = reactive({
    "Head": { id: "Head", x: 160, y: 120 }
  });
  const fetchDataInterval = ref();
  const filteredPoints = computed(() => {
    const allowedKeys = ['Head', 'item'];
    return Object.fromEntries(Object.entries(points).filter(([key]) => !allowedKeys.includes(key)));
  });

  const displayLimbs = ref(false);
  const video = ref();
  let mediaStream;

  /**
   * Watch for changes in props.showFixedPositionButton and update draggableLimbs accordingly
   * @param {Boolean} newVal - The new value of props.showFixedPositionButton
   */
  watch(() => props.showFixedPositionButton, (newVal) => {
    if (newVal) {
      // If the new value is true, set draggableLimbs to include all limbs
      draggableLimbs.value = ['Head', 'Shoulders', 'Hip', 'LE', 'RE', 'LK', 'RK', 'LF', 'RF', 'LH', 'RH'];
    } else {
      // Otherwise, set draggableLimbs to include only Head, Shoulders, and Hip
      draggableLimbs.value = ['Head', 'Shoulders', 'Hip'];
    }
  });

  /**
   * Retrieves the limb pair based on the given limb key
   * @param {string} key - The key of the limb for which the pair is required
   * @return {string[]} - An array containing the keys of the limb pair along with other related body parts
   */
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
  /**
   * Fetches data from the server and updates the points on the canvas
   */
  async function fetchData() {
    if (isDragging.value) {
     return;
    } else {
      try {
        const response = await fetch(`${baseURL}/points`);
        const data = await response.json();
        Object.assign(points, data.reduce((acc, point) => {
          acc[point.id] = point;
          return acc;
        }, {}));
        drawStickman(points);
        displayLimbs.value = true;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
  /**
   * Draws the stickman on the canvas based on the points
   * @param {Object} points - The points representing the stickman body parts
   */
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
  /**
   * Initiates the drag operation for a limb
   * @param {Event} event - The drag event
   * @param {string} key - The key of the limb being dragged
   */
  function startDrag(event, key) {
    if (!props.showFixedPositionButton && draggableLimbs.value.length === 3) {
      if (['LE', 'LH', 'RE', 'RH', 'LK', 'LF', 'RK', 'RF'].includes(key)) {
        draggableLimbs.value = getLimbPair(key);

      }
    }
    event.preventDefault();
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
  /**
   * Handles the dragging of a limb
   * @param {Event} event - The drag event
   */
  function drag(event) {
    if (!isDragging.value) return;
    const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
    const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;
    event.preventDefault();
    points[currentPoint.value].x = clientX - offset.x;
    points[currentPoint.value].y = clientY - offset.y;
    drawStickman(points);
  }
  /**
   * Ends the drag operation for a limb and updates the point position on the server
   */
  async function endDrag() {
    isDragging.value = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', drag);
    document.removeEventListener('touchend', endDrag);

    const key = currentPoint.value;
    try {
      const response = await fetch(`${baseURL}/points/${key}`, {
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
  // Lifecycle hook that runs when the component is mounted
  onMounted(() => {
    canvas.value = document.getElementById('canvas');
    video.value = document.getElementById('video');
    if(isDbUpdated.value) {
      fetchData();
    }
    else{
      isDbUpdated.value = true;
      setTimeout(() => {
        fetchData()
      }, 300);
    }
    fetchDataInterval.value = setInterval(fetchData, 1000);

    eventbus.on('reset-draggable-limbs', async (oldPoints) => {

      for(let limb in draggableLimbs.value)
      {
        try {
          const response = await fetch(`${baseURL}/points/${draggableLimbs.value[limb]}`, {
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

  });

  // Lifecycle hook that runs before the component is unmounted
  onBeforeUnmount(() => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
      });
    }
    if(fetchDataInterval.value) {
      clearInterval(fetchDataInterval.value);
    }
  });
  /**
   * Draws the video frame on the canvas
   */
  function drawVideoFrame() {
    const context = canvas.value.getContext('2d');
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    if (points && Object.keys(points).length > 1) {
      drawStickman(points);
    }
    requestAnimationFrame(drawVideoFrame);
  }


  </script>

  <template>
    <!-- Container for video, canvas, and draggable points -->
    <div id="container">
      <!-- Video element for capturing video feed -->
      <video id="video" autoplay style="display:none;"></video>
      <!-- Canvas element for drawing stickman and points -->
      <canvas id="canvas" ref="canvas"></canvas>

      <!-- Draggable points -->
      <div
          v-if="displayLimbs"
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

      <!-- Head element -->
      <div
          v-if="displayLimbs"
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
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
  }

  .head {
    width: 60px;
    height: 60px;
  }
  </style>
