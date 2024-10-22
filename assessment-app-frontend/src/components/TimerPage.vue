<template>
    <div>
        <div>Time left: {{ timeLeft }} seconds</div>
    </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
    props: ["duration"],
    setup(props, { emit }) {
        const timeLeft = ref(props.duration);

        onMounted(() => {
            const timer = setInterval(() => {
                if (timeLeft.value > 0) {
                    timeLeft.value--;
                } else {
                    clearInterval(timer);
                    emit("time-up"); // Emit event when time is up
                }
            }, 1000);
        });

        // Reset timer when duration prop changes (if needed)
        watch(
            () => props.duration,
            (newDuration) => {
                timeLeft.value = newDuration;
            }
        );

        return { timeLeft };
    },
};
</script>
