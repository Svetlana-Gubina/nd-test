<script setup>

const props = defineProps({
    isShown: Boolean
})

const emit = defineEmits(["toggleIsShown"])

const toggle = () => {
    emit("toggleIsShown")
}
</script>

<template>

<button class="toggleBtn" type="button" @click="toggle">
    <svg v-if="isShown" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7C17 8.15478 16.2206 9.64926 14.7228 10.9006C13.2537 12.128 11.2258 13 9 13C6.77424 13 4.7463 12.128 3.27718 10.9006C1.77936 9.64926 1 8.15478 1 7C1 5.84522 1.77936 4.35074 3.27718 3.09941C4.7463 1.87204 6.77424 1 9 1C11.2258 1 13.2537 1.87204 14.7228 3.09941C16.2206 4.35074 17 5.84522 17 7Z" stroke="#B1C909" stroke-width="2"/>
    <circle cx="9" cy="7" r="3" stroke="#B1C909" stroke-width="2"/>
    </svg>

    <svg v-else width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8C17 9.15478 16.2206 10.6493 14.7228 11.9006C13.2537 13.128 11.2258 14 9 14C6.77424 14 4.7463 13.128 3.27718 11.9006C1.77936 10.6493 1 9.15478 1 8C1 6.84522 1.77936 5.35074 3.27718 4.09941C4.7463 2.87204 6.77424 2 9 2C11.2258 2 13.2537 2.87204 14.7228 4.09941C16.2206 5.35074 17 6.84522 17 8Z" stroke="#B1C909" stroke-width="2"/>
    <circle cx="9" cy="8" r="3" stroke="#B1C909" stroke-width="2"/>
    <path d="M2 1L16 15" stroke="#B1C909" stroke-width="2"/>
    </svg>

</button>
  
</template>

<style scoped>
.toggleBtn {
    position: absolute;
    top: 0;
    right: 24px;
    padding: 10px;
    background-color: transparent;
    border: 0;
    box-shadow: none;
}
.toggleBtn svg {
    width: 12px;
    height: 12px;
}
</style>
