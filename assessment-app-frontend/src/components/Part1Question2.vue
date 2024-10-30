<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
            <!-- Header -->
            <header
                class="flex justify-between p-4 font-semibold text-center text-white bg-blue-300 rounded-t-lg"
            >
                <h1>STEP Non-Voice Assessment</h1>
                <div
                    class="px-2 py-1 text-black border border-gray-500 rounded"
                >
                    <p>Time remaining</p>
                    <p>Page: {{ formattedTime }}</p>
                </div>
            </header>

            <!-- Question Section -->
            <section class="p-6">
                <h2 class="text-xl font-bold text-red-600">
                    Question 2: Self Answering Questions
                </h2>
                <p class="mt-4 text-gray-800">
                    Question: Share with us the best and worst movie or series
                    you've watched, and explain your reasons for selecting them.
                </p>
                <label class="block mt-4 text-gray-700">Answer:</label>
                <textarea
                    v-model="answer"
                    placeholder="Type your answer here..."
                    class="w-full p-2 mt-2 border border-gray-300 rounded"
                    rows="5"
                    @input="saveAnswer"
                    :disabled="savedEndTime"
                    :class="{ 'bg-gray-200 cursor-not-allowed': savedEndTime }"
                ></textarea>
            </section>

            <!-- Next Button -->
            <div class="flex items-center justify-end mt-6">
                <button
                    @click="showModal = true"
                    class="px-4 py-2 font-semibold text-white rounded hover:bg-blue-600"
                    :class="{
                        'bg-gray-400': savedEndTime,
                        'bg-blue-500': !savedEndTime,
                    }"
                >
                    Next Page &raquo;
                </button>
            </div>
        </div>

        <!-- Confirmation Modal -->
        <div
            v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h2 class="text-xl font-semibold">Confirm Navigation</h2>
                <p class="mt-4">
                    Are you sure you want to proceed to the next page?
                </p>
                <div class="flex justify-end mt-6">
                    <button
                        @click="showModal = false"
                        class="px-4 py-2 mr-2 font-semibold text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="confirmNext"
                        class="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Yes, Continue
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

const store = useStore();
const router = useRouter();
const answer = ref("");
const duration = 120; // Total duration in seconds
const timeRemaining = ref(duration);
const interval = ref(null);
const showModal = ref(false);
const startTime = ref("");
const savedEndTime = localStorage.getItem("question2EndTime"); // Check if end time exists
const formattedTime = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

onMounted(() => {
    const savedAnswer = localStorage.getItem("question2Answer");
    answer.value = savedAnswer || "";
    const savedStartTime = localStorage.getItem("question2StartTime");
    startTime.value = savedStartTime || new Date().toISOString();

    // If there's no saved end time, start the timer
    if (!savedEndTime) {
        interval.value = setInterval(() => {
            if (timeRemaining.value > 0) {
                timeRemaining.value--;
            } else {
                clearInterval(interval.value);
                confirmNext(); // Automatically proceed to next if time runs out
            }
        }, 1000);
    } else {
        // Set timeRemaining to 0 if end time is already set
        timeRemaining.value = 0;
    }
});

const saveAnswer = () => {
    store.commit("setQuestion2Answer", answer.value);
    localStorage.setItem("question2Answer", answer.value);
};

const confirmNext = () => {
    showModal.value = false;
    clearInterval(interval.value);

    // Get the end time and format it
    const endTime = new Date().toISOString();
    const formattedEndTime = formatTime(endTime);

    // Format the start time as well
    const formattedStartTime = formatTime(startTime.value);

    // Store formatted times in Vuex and local storage
    store.commit("setQuestion2StartTime", formattedStartTime);
    store.commit("setQuestion2EndTime", formattedEndTime);

    // Store the formatted start and end times in local storage
    localStorage.setItem("question2StartTime", formattedStartTime); // Store formatted start time
    localStorage.setItem("question2EndTime", formattedEndTime); // Store formatted end time

    let completedSteps =
        JSON.parse(localStorage.getItem("completedSteps")) || [];
    completedSteps.push("/question2");
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    router.push("/part2-instruction");
};
</script>
