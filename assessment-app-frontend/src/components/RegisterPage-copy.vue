<template>
    <div class="flex items-center justify-center min-h-screen bg-white">
        <form class="bg-white p-6 rounded shadow-md w-full max-w-md">
            <header class="mb-4 text-center bg-blue-300">
                <h1 class="text-white text-xl font-semibold">
                    Register for STEP Non-Voice Assessment
                </h1>
            </header>
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

<script setup></script>
