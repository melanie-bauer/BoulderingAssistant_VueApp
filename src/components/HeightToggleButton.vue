<template>
  <div>
    <button class="height-toggle-button" @click="toggleHeightBar" :class="{ 'button-on-bar': heightBarVisible }">

    </button>
    <transition name="slide">
      <div v-if="heightBarVisible" class="height-bar">
        <div class="height-markers">
          <div v-for="height in heights" :key="height" class="height-marker">{{ height }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heightBarVisible: false,
      heights: ['3.0m', '2.5m', '2.0m', '1.5m', '1.0m'],
    };
  },
  methods: {
    toggleHeightBar() {
      this.heightBarVisible = !this.heightBarVisible;
    }
  }
};
</script>

<style scoped>
.height-toggle-button {
  position: absolute;
  right: 0.0rem;
  top: 19%;
  transform: translateY(-50%);
  width: 25px;
  height: 77px;
  background-color: rgba(113, 106, 180, 1);
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
  background-color: rgba(113, 106, 180, 1);
  border: thin solid rgba(113, 106, 180, 1);
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  padding: 20px 0;
}

.height-markers {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 70%
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
}

.button-on-bar {
  right: 9.40rem;
  opacity: 1;
  transition: right 0.01s ease;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
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
    height: 2rem; /* Adjusted fixed height for smaller screens */
  }

  .button-on-bar {
    right: 9rem;
  }

  .height-bar {
    width: 145px;
  }
}
</style>
