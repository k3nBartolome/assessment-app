<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
            <!-- Header -->
            <header
                class="bg-blue-300 text-white p-4 text-center font-semibold rounded-t-lg flex justify-between"
            >
                <h1>STEP Non-Voice Assessment</h1>
                <div
                    class="border border-gray-500 text-black px-2 py-1 rounded"
                >
                    <p>Time remaining</p>
                    <p>Page: {{ formattedTime }}</p>
                </div>
            </header>

            <!-- Question Section -->
            <section class="p-6">
                <h2 class="text-lg font-bold text-gray-900">
                    Question: Share with us the best and worst movie or series
                    you've watched, and explain your reasons for selecting them.
                </h2>
                <label class="block mt-4 text-gray-700">Answer:</label>
                <textarea
                    v-model="answer"
                    placeholder="Type your answer here..."
                    class="w-full border border-gray-300 p-2 rounded mt-2"
                    rows="5"
                ></textarea>
            </section>

            <!-- Button to submit or go to the next question -->
            <div class="flex justify-center mt-6">
                <button
                    @click="next"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Next Page
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

const store = useStore();
const router = useRouter();
const answer = ref("");
const duration = 120; // Set duration to 120 seconds
const timeRemaining = ref(duration); // Time remaining for the timer
const interval = ref(null); // Timer interval

const startTime = ref("");

// Computed property to format time in mm:ss
const formattedTime = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

onMounted(() => {
    // Load saved answer from local storage if available
    const savedAnswer = localStorage.getItem("question2Answer");
    answer.value = savedAnswer || ""; // Set the textarea with saved answer if exists

    // Load saved start time from local storage if available
    const savedStartTime = localStorage.getItem("question2StartTime");
    startTime.value = savedStartTime || new Date().toISOString(); // Use saved time or current time

    // Start the timer countdown
    interval.value = setInterval(() => {
        if (timeRemaining.value > 0) {
            timeRemaining.value--;
        } else {
            clearInterval(interval.value);
            next(); // Move to the next question when time is up
        }
    }, 1000);
});

const next = () => {
    // Set end time and save to Vuex store
    const endTime = new Date().toISOString(); // Set end time

    // Save start time, end time, and answer to local storage
    localStorage.setItem("question2StartTime", startTime.value); // Save start time
    localStorage.setItem("question2EndTime", endTime); // Save end time

    // Save start and end times to the Vuex store
    store.commit("setQuestion2StartTime", startTime.value);
    store.commit("setQuestion2EndTime", endTime);

    // Store completed steps in local storage
    let completedSteps =
        JSON.parse(localStorage.getItem("completedSteps")) || [];
    completedSteps.push("/assessment/question2");
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));

    // Navigate to the next instruction page
    router.push("/assessment/part2-instruction");
};
</script>
