<template>
    <div class="flex justify-center items-center min-h-screen `` bg-gray-100">
        <div class="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
            <!-- Header with Timer -->
            <header
                class="bg-blue-300 text-white p-4 text-center font-semibold rounded-t-lg flex justify-between"
            >
                <h1>STEP Non-Voice Assessment</h1>
                <div
                    class="border border-gray-500 text-black px-2 py-1 rounded"
                >
                    <p>Time remaining</p>
                    <p>{{ formattedTime }}</p>
                </div>
            </header>

            <!-- Question Section -->
            <section class="p-6">
                <h2 class="text-red-600 font-bold text-xl">
                    Question 1: Self Answering Questions
                </h2>
                <p class="mt-4 text-gray-800">
                    Question: What activities did you and your friend engage in
                    during your last hangout?
                </p>
                <label class="block mt-4">
                    <span class="text-gray-700">Answer:</span>
                    <textarea
                        v-model="answer"
                        class="form-textarea mt-1 block w-full rounded border border-gray-300 p-2"
                        rows="3"
                        placeholder="Type your answer here..."
                        @input="saveAnswer"
                    ></textarea>
                </label>
            </section>

            <!-- Next Button -->
            <div class="flex justify-end items-center mt-6">
                <button
                    @click="next"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Next Page &raquo;
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
    const savedAnswer = localStorage.getItem("question1Answer");
    answer.value = savedAnswer || ""; // Set the textarea with saved answer if exists

    // Load saved start time from local storage if available
    const savedStartTime = localStorage.getItem("question1StartTime");
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

const saveAnswer = () => {
    // Save the answer to the Vuex store and local storage on input
    store.commit("setQuestion1Answer", answer.value);
    localStorage.setItem("question1Answer", answer.value); // Save answer to local storage
};

const next = () => {
    // Clear the interval to stop the timer
    clearInterval(interval.value);

    // Set end time and save to Vuex store
    const endTime = new Date().toISOString(); // Set end time

    // Save start time, end time, and answer to local storage
    localStorage.setItem("question1StartTime", startTime.value); // Save start time
    localStorage.setItem("question1EndTime", endTime); // Save end time

    // Save start and end times to the Vuex store
    store.commit("setQuestion1StartTime", startTime.value);
    store.commit("setQuestion1EndTime", endTime);

    // Store completed steps in local storage
    let completedSteps =
        JSON.parse(localStorage.getItem("completedSteps")) || [];
    completedSteps.push("/assessment/question1");
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));

    // Navigate to the next question
    router.push("/assessment/question2");
};
</script>
