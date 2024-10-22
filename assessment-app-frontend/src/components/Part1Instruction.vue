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
                    <p>Page: unlimited</p>
                </div>
            </header>
            <!-- Part 1 Instructions -->
            <section class="p-6">
                <h2 class="text-orange-600 font-bold text-xl">
                    PART 1: Self-Answering Questions
                </h2>
                <h3 class="text-orange-600 font-bold text-lg mt-4">
                    Instructions:
                </h3>
                <p class="mt-2 text-gray-800">
                    Please respond to the following questions to the best of
                    your ability. To manage your time, try to answer each
                    question in
                    <span class="font-bold text-orange-600">2 minutes</span>.
                </p>
            </section>
            <div class="flex justify-center mt-6">
                <button
                    @click="startQuiz"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Start Questions
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        startQuiz() {
            let completedSteps =
                JSON.parse(localStorage.getItem("completedSteps")) || [];
            completedSteps.push("/assessment/part1-instruction");
            localStorage.setItem(
                "completedSteps",
                JSON.stringify(completedSteps)
            );
            this.$router.push("/assessment/question1");
        },
    },
};
</script>
