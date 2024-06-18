<template>
  <div>
    <button class="height-toggle-button" @click="toggleHeightBar" :class="{ 'button-on-bar': heightBarVisible }">
    <label>Height</label>
    </button>
    <transition name="slide">
      <div v-if="heightBarVisible" class="height-bar">
        <div class="height-markers">
          <button v-for="height in heights" :key="height" @click="setClickedHeight(height)"
            :class="{ 'height-marker': true, 'height-marker-active': clickedHeight === height }">
            {{ height }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {baseURL} from "@/config.js";
export default {
  data() {
    return {
      heightBarVisible: false,
      heights: ['3.0m', '2.5m', '2.0m', '1.5m', '1.0m'],
      clickedHeight: null, // New data property to track the clicked button
    };
  },
  methods: {
    toggleHeightBar() {
      this.heightBarVisible = !this.heightBarVisible;
    },
    async setClickedHeight(height) {
      this.clickedHeight = height; 
      await this.writeHeightInDB(height); // Write the height to the DB
    },
    async writeHeightInDB(height) {
      try {
        const response = await fetch(`${baseURL}/climbingHeight`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({climbingHeight: height })
        });    
         
      } catch (error) {
        console.error('Error updating climbing height:', error);
      }
    }
  }
};
</script>

<style scoped>
label{
  color: #ffffff;
}
.height-toggle-button {
  position: absolute;
  right: 0.0rem;
  top: 19%;
  transform: translateY(-50%);
  width: 25px;
  height: 77px;
  background-color: var(--secondary);
  color: #000000;
  border: none;
  border-bottom-left-radius: 0.70rem;
  border-top-left-radius: 0.70rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  writing-mode: vertical-rl;
  z-index: 20;
  transition: right 0.3s ease;
}

.height-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 152px;
  margin: auto;
  height: 100%;
  background-color: var(--secondary);
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  padding: 20px 0;
}

.height-markers {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  width: 70%;
}

.height-marker {
  width: 80px;
  height: 70px;
  background-color: #ffffff;
  color: #000000;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.height-marker-active {
  box-shadow: 0 0 10px 3px var(--accent);
}

.button-on-bar {
  right: 9.40rem;
  opacity: 1;
  transition: right 0.33s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (min-width: 320px) and (max-width: 375px) {
  .height-markers {
    gap: 1.5rem;
  }

  .height-marker {
    font-size: 25px;
    width: 67px;
    height: 4rem;
  }

  .button-on-bar {
    right: 7.7rem;
  }

  .height-bar {
    width: 125px;
  }
}
</style>
