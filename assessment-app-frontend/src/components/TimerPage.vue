<template>
    <div>
      <div class="px-2 py-1 text-black border border-gray-500 rounded">
        <p>Time remaining</p>
        <p>{{ formattedTime }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from "vue";
  
  export default {
    props: ["duration"],
    setup(props) {
      const timeRemaining = ref(localStorage.getItem('timeRemaining') || props.duration);
      const interval = ref(null);
  
      const formattedTime = computed(() => {
        const minutes = Math.floor(timeRemaining.value / 60);
        const seconds = timeRemaining.value % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      });
  
      onMounted(() => {
        // Start timer
        interval.value = setInterval(() => {
          if (timeRemaining.value > 0) {
            timeRemaining.value--;
            localStorage.setItem('timeRemaining', timeRemaining.value);
          } else {
            clearInterval(interval.value);
          }
        }, 1000);
      });
  
      return { formattedTime };
    },
    unmounted() {
      clearInterval(interval.value);
    },
  };
  </script>
  