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

            <!-- Part 2 Instructions -->
            <section class="p-6">
                <h2 class="text-orange-600 font-bold text-xl">
                    PART 2: Chat Simulation
                </h2>
                <h3 class="text-orange-600 font-bold text-lg mt-4">
                    Instructions:
                </h3>
                <p class="mt-2 text-gray-800">
                    Create a possible reply to a message sent by a friend
                    through a messaging application. To manage your time, try to
                    create a reply within
                    <span class="font-bold text-red-600">2 minutes</span>.
                </p>
            </section>
            <div class="flex justify-between items-center mt-6">
                <p class="text-gray-600">Answered 1 of 4 (25%)</p>
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
            completedSteps.push("/assessment/part2-instruction");
            localStorage.setItem(
                "completedSteps",
                JSON.stringify(completedSteps)
            );
            this.$router.push("/assessment/question3");
        },
    },
};
</script>
