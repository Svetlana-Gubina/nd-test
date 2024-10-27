<script setup>
import { ref, onMounted } from "vue";
import ModalComponent from "./ModalComponent.vue";
import CreateNoteForm from "./CreateNoteForm.vue";
import NoteCard from "./NoteCard.vue";
import LoadingView from "./LoadingView.vue";
import { useApi } from "@/api/auth";

const { error, loading, get, deleteItem, data, errorMessage, errorFields } =
  useApi("/api/notes");

const notes = ref([]);

const isModalCreateOpened = ref(false);

const openCreateModal = () => {
  isModalCreateOpened.value = true;
};
const closeCreateModal = () => {
  isModalCreateOpened.value = false;
};

const onNoteCreate = () => {
  closeCreateModal();
  getNotes();
};

const onNoteRemove = async (noteId) => {
  await deleteItem(noteId);
  getNotes();
};

const getNotes = async () => {
  await get();
  notes.value = [...data.value];
};

onMounted(() => {
  getNotes();
});
</script>

<template>
  <LoadingView v-if="loading" />
  <ModalComponent
    :isOpen="isModalCreateOpened"
    @modal-close="closeCreateModal"
    name="create-modal"
  >
    <template #content>
      <CreateNoteForm @created="onNoteCreate" />
    </template>
  </ModalComponent>
  <section class="notes">
    <h2 class="sr-only">Личный кабинет. Заметки пользователя</h2>
    <ul class="notes-list">
      <li class="notes-item" v-for="note in notes" :key="note.id">
        <NoteCard :note="note" @remove="onNoteRemove" />
      </li>
    </ul>
    <button
      class="add"
      type="button"
      aria-label="Добавить заметки"
      @click="openCreateModal"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 9H17M9 1L9 17"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <div v-if="error" class="error-message">
      {{ errorFields || errorMessage }}
    </div>
  </section>
</template>

<style scoped>
.notes {
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 70px);
  height: 100vh;
}
.notes-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 10px;
}

.add {
  display: flex;
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);
  position: absolute;
  bottom: 200px;
  right: 20px;
}

.add svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 1366px) {
  .add {
    bottom: 120px;
  }
}

@media (max-width: 1200px) {
  .add {
    bottom: 120px;
  }
}

@media (max-width: 900px) {
  .notes-list {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .add {
    bottom: 55px;
  }
}

@media (max-width: 430px) {
  .add {
    bottom: 0;
  }
}
</style>
