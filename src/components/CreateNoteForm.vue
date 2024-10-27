<script setup>
import { defineEmits, ref } from "vue";
import { useRouter } from 'vue-router';
import {useApi, useAuth} from "@/api/auth";
import LoadingView from "./LoadingView.vue";

import * as Yup from "yup";
const isLoading = ref(false);



const values = ref({
    name: '',
    note: ''
})

const errors = ref({
    name: '',
    note: ''
})

const schema = Yup.object().shape({
    name: Yup.string().required("Введите название заметки").max(100),
    note: Yup.string().required("Введите текст заметки").max(500),
 });


</script>

<template>
  <LoadingView v-if="isLoading" />
  <div class="form-wrapper">
    <h2>Добавление заметки</h2>
    
    <form class="form" method="POST" @submit.prevent="onLoginFormSubmit" novalidate :validation-schema="schema">
      <label for="name">Название заметки</label>
        <input type="text" id="name" v-model="values.name" placeholder="Введите название" @blur="validate('name')"/>
        <span class="limit">0/100</span>
        <p class="error-message" v-if="!!errors.name">
          {{ errors.name }}
        </p>

        <label for="note">Текст заметки</label>
        <textarea class="textarea" v-model="values.note" @blur="validate('note')" rows="5"></textarea>
        <span class="limit">0/500</span>
        <p class="error-message" v-if="!!errors.note">
          {{ errors.note }}
        </p>

        <div class="form__footer">
        
        <button type="submit">Добавить</button>
        </div>

        <div v-if="error"  class="error-message">
          {{ errorFields || errorMessage }}
        </div>
        
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.form-wrapper h2 {
  margin: 0;
  margin-bottom: 40px;
}

.form {
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
}

.form label {
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray);
  margin-left: 16px;
}

.form input {
  font-family: inherit;
  border-radius: 36px;
  background: var(--white);
  padding:  16px;
  margin-bottom: 24px;
}

.form input:last-of-type {
  margin-bottom: 40px;
}

.limit {
  font-size: var(--font-small);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  color:var(--gray);
}

.textarea {
  resize: none;
  font-family: inherit;
  border-radius: 36px;
  background: var(--white);
  padding:  16px;
  margin-bottom: 24px;
}

.form__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form__footer button {
  padding: 5px 24px;
  border-radius: 32px;
  align-self: flex-end;
}

.error-message {
  color: #FF7461;
  font-size: var(--font-small);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 20px;
  border-radius: 24px;
  background: rgba(255, 116, 97, 0.10);
}

@media (max-width: 360px) {
  .form-wrapper h2 {
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.1;
}

.no-account,
.error-message {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.6;
  }

  .form__footer {
    flex-direction: column;
    justify-content: start;
  }

  .form__footer .no-account {
    width: 100%;
    max-width: 100%;
    display: flex;
  }

  .form__footer button {
    order: -1;
    width: 100%;
    max-width: 100%;
  }
}
</style>