<script setup>
import { ref } from 'vue'

const notes = ref([]);
</script>

<template>
    <div class="wrapper">
        <h2>Страница не найдена</h2>
        <router-link to="/">На главную</router-link>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>