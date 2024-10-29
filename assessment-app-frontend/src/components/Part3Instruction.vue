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

            <!-- Part 3 Instructions -->
            <section class="p-6">
                <h2 class="text-orange-600 font-bold text-xl">
                    PART 3: E-mail Composition
                </h2>
                <h3 class="text-orange-600 font-bold text-lg mt-4">
                    Instructions:
                </h3>
                <p class="mt-2 text-gray-800">
                    Compose a response to the provided e-mail, incorporating all
                    potential solutions and essential details (such as
                    recommendations, payment methods, etc.) required for the
                    reply. To manage your time, try to create a reply within
                    <span class="font-bold text-red-600">15 minutes</span>.
                </p>
            </section>

            <!-- Footer with progress and navigation button -->
            <div class="flex justify-between items-center mt-6">
                <p class="text-gray-600">Answered 3 of 4 (75%)</p>
                <button
                    @click="nextPage"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Next Page &raquo;
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        nextPage() {
            let completedSteps =
                JSON.parse(localStorage.getItem("completedSteps")) || [];
            completedSteps.push("/part3-instruction");
            localStorage.setItem(
                "completedSteps",
                JSON.stringify(completedSteps)
            );
            this.$router.push("/question4");
        },
    },
};
</script>
