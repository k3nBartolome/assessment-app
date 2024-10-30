<template>
    <div class="flex items-center justify-center min-h-screen bg-white">
        <form
            @submit.prevent="register"
            class="bg-white p-6 rounded shadow-md w-full max-w-md"
        >
            <header class="mb-4 text-center bg-blue-300">
                <h1 class="text-white text-xl font-semibold">
                    Register for STEP Non-Voice Assessment
                </h1>
            </header>

            <!-- Display error message -->
            <p v-if="errorMessage" class="mb-4 text-red-500 text-center">
                {{ errorMessage }}
            </p>

            <div class="flex flex-col space-y-4">
                <div class="flex items-center space-x-4">
                    <label
                        for="first-name"
                        class="block text-sm font-medium text-gray-700 w-1/3"
                        >First name*:</label
                    >
                    <input
                        type="text"
                        v-model="first_name"
                        placeholder="Enter Firstname"
                        class="block w-2/3 border border-gray-500 p-1 rounded"
                    />
                </div>
                <div class="flex items-center space-x-4">
                    <label
                        for="last-name"
                        class="block text-sm font-medium text-gray-700 w-1/3"
                        >Last name*:</label
                    >
                    <input
                        type="text"
                        v-model="last_name"
                        placeholder="Enter Lastname"
                        class="block w-2/3 border border-gray-500 p-1 rounded"
                    />
                </div>
                <div class="flex items-center space-x-4">
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 w-1/3"
                        >Email Address*:</label
                    >
                    <input
                        type="email"
                        v-model="email"
                        placeholder="Enter Email Address"
                        class="block w-2/3 border border-gray-500 p-1 rounded"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        class="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const errorMessage = ref(""); // Reactive variable for error messages

const register = async () => {
    // Clear previous error messages before a new registration attempt
    errorMessage.value = ""; 

    try {
        const response = await axios.post(
            "http://10.109.2.112:8000/api/register",
            {
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
            }
        );

        if (response.data && response.data.id && response.data.token) {
            store.commit("setUserId", response.data.id);
            localStorage.setItem("applicant_token", response.data.token);
            localStorage.setItem("user_id", response.data.id);
            router.push("/gen-instruction");
        } else {
            console.error("Unexpected response structure:", response.data);
        }
    } catch (error) {
        // Check for validation error in the response
        if (
            error.response &&
            error.response.data &&
            error.response.data.email &&
            Array.isArray(error.response.data.email)
        ) {
            // Set the first error message for email if it exists
            errorMessage.value = error.response.data.email[0];
        } else {
            errorMessage.value = "Registration failed. Please try again.";
        }
        console.error("Registration error:", error.response ? error.response.data : error.message);
    }
};
</script>
