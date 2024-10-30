<template>
    <div class="flex items-center justify-center min-h-screen bg-white">
        <div class="text-center p-6 rounded shadow-md w-full max-w-md bg-gray-100">
            <h1 class="text-lg font-semibold mb-4">
                Thank you for finishing the assessment!
            </h1>
            <p class="mb-6">
                Please click the button below to confirm.
            </p>
            <button
                @click="handleDone"
                class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Done
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleDone = () => {
    router.push("/"); 
};
</script>

<style scoped>
</style>
