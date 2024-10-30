<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
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

            <!-- Email Section -->
            <section class="p-1">
                <p class="text-xl font-bold text-red-600">E-mail:</p>
                <p class="font-bold text-orange-600">Tim Lang</p>
                <p class="text-orange-600">Inquiry First Day of School</p>
                <p class="mt-4 text-gray-800">
                    To whom it may concern,
                    <br /><br />
                    First of all, I would like to thank your prestigious
                    institution for allowing my daughter to transfer. I'm a
                    newbie dad, and I can't wait to see my first-grader rock her
                    first day!
                    <br /><br />
                    However, I'm still figuring this school thing out. Any
                    chance you could give me the lowdown on what we need to
                    pack, wear, and bring on the big day? I want to make sure
                    we're nailing it!
                    <br /><br />
                    Can't wait to hear back from you super soon.
                    <br /><br />
                    Cheers,<br />
                    Tim Lang
                </p>
            </section>

            <!-- Reply Section -->
            <section class="p-1">
                <label class="block">
                    <span class="text-gray-700">Reply:</span>
                    <textarea
                        v-model="reply"
                        class="block w-full p-2 mt-1 border border-gray-300 rounded form-textarea"
                        rows="4"
                        placeholder="Type your reply here..."
                        @input="saveReply"
                    ></textarea>
                </label>
            </section>

            <!-- Submit Button -->
            <div class="flex items-center justify-end mt-6">
                <button
                    @click="showConfirmationModal = true"
                    class="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </div>

        <!-- Confirmation Modal -->
        <div
            v-if="showConfirmationModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <h2 class="text-xl font-semibold">Confirm Submission</h2>
                <p class="mt-4">
                    Are you sure you want to submit your assessment?
                </p>
                <div class="flex justify-end mt-6">
                    <button
                        @click="showConfirmationModal = false"
                        class="px-4 py-2 mr-2 font-semibold text-white bg-gray-500 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="submit"
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
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const reply = ref("");
const duration = 900; // 15 minutes in seconds
const timeRemaining = ref(duration);
const interval = ref(null);
const showConfirmationModal = ref(false);

const formattedTime = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

// Function to start the timer
const startTimer = () => {
    const savedStartTime = localStorage.getItem("emailStartTime");
    const startTime = savedStartTime
        ? new Date(savedStartTime).getTime()
        : new Date().getTime();
    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    timeRemaining.value = Math.max(duration - elapsedTime, 0); // Ensure it doesn't go negative
};

// Retrieve saved data and start timer
onMounted(() => {
    const savedReply = localStorage.getItem("emailReply");
    reply.value = savedReply || "";

    // Check if start time exists; if not, set it
    if (!localStorage.getItem("emailStartTime")) {
        localStorage.setItem("emailStartTime", new Date().toISOString());
    }

    startTimer();

    // Continue the timer
    interval.value = setInterval(() => {
        if (timeRemaining.value > 0) {
            timeRemaining.value--;
            localStorage.setItem("timeRemaining", timeRemaining.value);
        } else {
            clearInterval(interval.value);
            submit(); // Auto-submit when time is up
        }
    }, 1000);
});

onBeforeUnmount(() => {
    clearInterval(interval.value);
});

// Submit function
const submit = async () => {
    endTime.value = new Date().toISOString();
    const formattedStartTime = formatTime(startTime.value);
    const formattedEndTime = formatTime(endTime.value);

    const data = {
        question1: store.state.question1Answer || "",
        question2: store.state.question2Answer || "",
        question3: store.state.question3Answer || "",
        question4: reply.value,
        question1_start: store.state.question1StartTime,
        question2_start: store.state.question2StartTime,
        question3_start: store.state.question3StartTime,
        question4_start: formattedStartTime,
        question1_end: store.state.question1EndTime,
        question2_end: store.state.question2EndTime,
        question3_end: store.state.question3EndTime,
        question4_end: formattedEndTime,
    };

    try {
        const token = localStorage.getItem("applicant_token");
        const applicantId = store.getters.getUserId;

        await axios.put(
            `http://10.109.2.112:8000/api/applicants/${applicantId}`,
            data,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        localStorage.clear();
        router.push("/");
    } catch (error) {
        console.error(error);
    }
};
</script>
