<script setup>

const props = defineProps({
    note: {
        id: String,
        title: String,
        content: String
    }
})

const emit = defineEmits(['remove']);

const removeNote = (noteId) => {
    emit('remove', noteId)
}
</script>

<template>
    <div class="wrapper">
        <h3>{{ note.title }}</h3>
        <p>
            {{ note.content }}
        </p>

        <button type="button" @click="removeNote(note.id)">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17M17 1L1 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Удалить</button>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    padding: 20px 28px;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 12px;
    box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.40);
    background-color: var(--green-light);
    position: relative;
}

.wrapper::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-top: 20px solid var(--bg-dark);
    border-left: 20px solid var(--green-middle);
    border-right: 20px solid var(--bg-dark);
    border-bottom: 20px solid var(--green-middle);
    border-bottom-left-radius: 16px;
}

.wrapper h3 {
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.3;
    padding: 0;
    margin-bottom: 40px;
}

.wrapper p {
    text-overflow: ellipsis;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.6;
}

.wrapper button {
    margin-left: auto;
}
</style>