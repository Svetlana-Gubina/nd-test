<script setup>
import { ref } from 'vue'

const notes = ref([]);
</script>

<template>
    <div class="wrapper">
        <h1>Hello form notes!</h1>
        <!-- <ul class="notes-list">
            <li class="notes-item" v-for="note in notes">
                {{ note }}
            </li>
        </ul> -->
    </div>
</template>

<style scoped>
.notes-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(1fr, 3);
    grid-template-rows: auto;
    gap: 10px;
}

.notes-item {
    display: flex;
    flex-direction: column;
    max-height: 480px;
    padding: 20px 28px;
}
</style>