<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
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
            <!-- Email Section -->
            <section class="p-1">
                <p class="text-red-600 font-bold text-xl">E-mail:</p>
                <p class="text-orange-600 font-bold">Tim Lang</p>
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
                        class="form-textarea mt-1 block w-full rounded border border-gray-300 p-2"
                        rows="4"
                        placeholder="Type your reply here..."
                        @input="saveReply"
                    ></textarea>
                </label>
            </section>

            <!-- Submit Button -->
            <div class="flex justify-end items-center mt-6">
                <button
                    @click="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Submit
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

// Function to format the time as H:i
const formatTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

const store = useStore();
const router = useRouter();
const reply = ref("");
const duration = 900;
const timeRemaining = ref(duration);
const interval = ref(null);

const startTime = ref("");
const endTime = ref("");
const formattedTime = computed(() => {
    const minutes = Math.floor(timeRemaining.value / 60);
    const seconds = timeRemaining.value % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

onMounted(() => {
    const savedReply = localStorage.getItem("emailReply");
    reply.value = savedReply || "";

    const savedStartTime = localStorage.getItem("emailStartTime");
    startTime.value = savedStartTime || new Date().toISOString();
    interval.value = setInterval(() => {
        if (timeRemaining.value > 0) {
            timeRemaining.value--;
        } else {
            clearInterval(interval.value);
            submit();
        }
    }, 1000);
});

const submit = async () => {
    endTime.value = new Date().toISOString(); // Set end time

    // Ensure times are formatted in H:i
    const formattedStartTime = formatTime(startTime.value);
    const formattedEndTime = formatTime(endTime.value);

    // Ensure values for all questions are provided
    const question1 = store.state.question1Answer || "";
    const question2 = store.state.question2Answer || "";
    const question3 = store.state.question3Answer || "";
    const question4 = reply.value;

    store.commit("setQuestion4Answer", question4);
    store.commit("setQuestion4StartTime", formattedStartTime);
    store.commit("setQuestion4EndTime", formattedEndTime);

    const applicantId = store.getters.getUserId;
    const data = {
        question1,
        question2,
        question3,
        question4,
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
        await axios.put(
            `http://127.0.0.1:8000/api/applicants/${applicantId}/assessment`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        router.push("/assessment/success");
    } catch (error) {
        console.error(error);
    }
};
</script>
