<script setup>
import { ref, onMounted } from 'vue'
import ModalComponent from './ModalComponent.vue';
import CreateNoteForm from './CreateNoteForm.vue';
import {useApi, useAuth} from "@/api/auth";


const notes = ref([]);

const isModalCreateOpened = ref(false);

const openCreateModal = () => {
    isModalCreateOpened.value = true;
};
const closeCreateModal = () => {
    isModalCreateOpened.value = false;
};
</script>

<template>
    <ModalComponent :isOpen="isModalCreateOpened" @modal-close="closeCreateModal" name="create-modal">
    <template #content>
      <CreateNoteForm />
    </template>
  </ModalComponent>
    <section class="notes">
        <h2 class="sr-only">Личный кабинет. Заметки пользователя</h2>
        <!-- <ul class="notes-list">
            <li class="notes-item" v-for="note in notes">
                {{ note }}
            </li>
        </ul> -->
        <button class="add" type="button" aria-label="Добавить заметки" @click="openCreateModal">
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9H17M9 1L9 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>   
        </button>
    </section>
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
    position: relative;
}

.notes-item {
    display: flex;
    flex-direction: column;
    max-height: 480px;
    padding: 20px 28px;
}

.add {
    display: flex;
    width: 56px;
    height: 56px;
    padding: 24px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.60);
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.add svg {
    width: 18px;
    height:18px;
}
</style>