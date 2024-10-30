<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
            <!-- Header with Timer -->
            <header
                class="flex justify-between p-4 font-semibold text-center text-white bg-blue-300 rounded-t-lg"
            >
                <h1>STEP Non-Voice Assessment</h1>
                <div
                    class="px-2 py-1 text-black border border-gray-500 rounded"
                >
                    <p>Time remaining</p>
                    <p>{{ formattedTime }}</p>
                </div>
            </header>

            <!-- Question Section -->
            <section class="p-6">
                <h2 class="text-xl font-bold text-red-600">
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
                        :readonly="!!savedEndTime"
                        :class="{
                            'bg-gray-200': !!savedEndTime,
                            'bg-white': !savedEndTime,
                        }"
                        class="block w-full p-2 mt-1 border border-gray-300 rounded form-textarea"
                        rows="3"
                        placeholder="Type your answer here..."
                        @input="saveAnswer"
                    ></textarea>
                </label>
            </section>

            <!-- Next Button -->
            <div class="flex items-center justify-end mt-6">
                <button
                    @click="showModal = true"
                    class="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
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
const savedEndTime = ref(null);
const formattedTime = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

onMounted(() => {
    const savedAnswer = localStorage.getItem("question1Answer");
    answer.value = savedAnswer || "";
    const savedStartTime = localStorage.getItem("question1StartTime");
    startTime.value = savedStartTime || new Date().toISOString();
    savedEndTime.value = localStorage.getItem("question1EndTime");

    // Check if the end time is set
    if (savedEndTime.value) {
        // If there's an end time, set the time remaining to zero
        timeRemaining.value = 0;
    } else {
        // Start the timer if there is no end time
        interval.value = setInterval(() => {
            if (timeRemaining.value > 0) {
                timeRemaining.value--;
            } else {
                clearInterval(interval.value);
                confirmNext();
            }
        }, 1000);
    }
});

const saveAnswer = () => {
    store.commit("setQuestion1Answer", answer.value);
    localStorage.setItem("question1Answer", answer.value);
};

const confirmNext = () => {
    showModal.value = false;
    clearInterval(interval.value);
    const endTime = new Date().toISOString();
    const formattedStartTime = formatTime(startTime.value);
    const formattedEndTime = formatTime(endTime);

    localStorage.setItem("question1StartTime", formattedStartTime);
    localStorage.setItem("question1EndTime", formattedEndTime);
    store.commit("setQuestion1StartTime", formattedStartTime);
    store.commit("setQuestion1EndTime", formattedEndTime);
    let completedSteps =
        JSON.parse(localStorage.getItem("completedSteps")) || [];
    completedSteps.push("/question1");
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
    router.push("/question2");
};
</script>
