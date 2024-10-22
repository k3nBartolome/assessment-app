<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
            <!-- Header -->
            <header
                class="bg-blue-300 text-white p-4 text-center font-semibold rounded-t-lg"
            >
                <h1>STEP Non-Voice Assessment</h1>
            </header>

            <!-- Instructions -->
            <section class="p-6">
                <h2 class="text-orange-600 font-bold text-xl">
                    General Instructions:
                </h2>
                <p class="mt-2 text-gray-800">
                    This is the STEP Non-voice assessment. You have a
                    <span class="font-bold text-orange-600"
                        >total of 20 minutes</span
                    >
                    to provide the most accurate answers to a series of
                    questions that will be presented to you.
                </p>

                <div class="mt-4">
                    <p class="font-bold">Remember:</p>
                    <ul class="list-decimal list-inside">
                        <li>
                            <a href="#" class="text-blue-500 underline"
                                >Maintain proper etiquette</a
                            >
                            throughout the assessment.
                        </li>
                        <li>
                            <a href="#" class="text-blue-500 underline"
                                >Finishing the assessment ahead of time</a
                            >
                            would give you more advantage.
                        </li>
                    </ul>
                </div>
            </section>

            <!-- Start Quiz Button -->
            <div class="flex justify-center mt-6">
                <button
                    @click="startQuiz"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        startQuiz() {
            // Mark this step as completed
            this.markStepCompleted("/assessment/gen-instruction");
            this.$router.push("/assessment/part1-instruction");
        },
        markStepCompleted(step) {
            const completedSteps =
                JSON.parse(localStorage.getItem("completedSteps")) || [];
            if (!completedSteps.includes(step)) {
                completedSteps.push(step);
                localStorage.setItem(
                    "completedSteps",
                    JSON.stringify(completedSteps)
                );
            }
        },
    },
};
</script>
