<template>
    <div class="progress-bar">
        <div :style="fillerStyles">
            <span v-if="completed >= 0" class="label">{{ `${completed}%` }}</span>
        </div>
    </div>
</template>
  
<script>
import { computed } from "vue";
export default {
    name: "ProgressBar",
    props: {
        bgcolor: String,
        completed: Number,
    },
    setup(props) {
        const fillerStyles = computed(() => {
            return {
                height: "100%",
                width: `${props.completed}%`,
                backgroundColor: props.bgcolor,
                transition: "width 1s ease-in-out",
                borderRadius: "inherit",
                textAlign: "right",
            };
        });

        return { fillerStyles };
    },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress-bar {
    height: 20px;
    width: 90%;
    background-color: #e0e0de;
    border-radius: 50px;
    margin-bottom: 10px;
    align-self: center;
}

.label {
    padding: 5px;
    color: white;
    font-weight: bold;
}
</style>
  