<script setup>
import { defineEmits, ref } from "vue";
import { useApi } from "@/api/auth";
import LoadingView from "./LoadingView.vue";

import * as Yup from "yup";

const emit = defineEmits(["created"]);

const { loading, data, error, post, errorMessage, errorFields } =
  useApi("/api/notes");

const values = ref({
  name: "",
  note: "",
});

const errors = ref({
  name: "",
  note: "",
});

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Введите название заметки")
    .max(100, "Название должно включать не больше 100 символов"),
  note: Yup.string()
    .required("Введите текст заметки")
    .max(255, "Текст должен включать не больше 255 символов"),
});

const validate = (field) => {
  schema
    .validateAt(field, values.value)
    .then(() => {
      errors.value[field] = "";
    })
    .catch((err) => {
      errors.value[field] = err.message;
    });
};

const onAddNote = () => {
  const request = {
    title: values.value.name,
    content: values.value.note,
  };
  schema
    .validate(values.value, { abortEarly: false })
    .then(() => {
      errors.value = {};
      return post(request);
    })
    .then(() => {
      emit("created", data.value);
    })
    .catch((err) => {
      err.inner.forEach((error) => {
        errors.value[error.path] = error.message;
      });
    });
};
</script>

<template>
  <LoadingView v-if="loading" />
  <div class="form-wrapper">
    <h2>Добавление заметки</h2>

    <form
      class="form"
      method="POST"
      @submit.prevent="onLoginFormSubmit"
      novalidate
      :validation-schema="schema"
    >
      <label for="name">Название заметки</label>
      <input
        type="text"
        id="name"
        v-model="values.name"
        placeholder="Введите название"
        @blur="validate('name')"
      />
      <span class="limit">0/{{ values.name.length }}</span>
      <p class="error-message" v-if="!!errors.name">
        {{ errors.name }}
      </p>

      <label for="note">Текст заметки</label>
      <textarea
        id="note"
        class="textarea"
        v-model="values.note"
        @blur="validate('note')"
        rows="5"
      ></textarea>
      <span class="limit">0/{{ values.note.length }}</span>
      <p class="error-message" v-if="!!errors.note">
        {{ errors.note }}
      </p>

      <div class="form__footer">
        <button @click="onAddNote" type="submit">Добавить</button>
      </div>

      <div v-if="error" class="error-message">
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
  margin-bottom: 8px;
}

.form input {
  font-family: inherit;
  border-radius: 36px;
  background: var(--white);
  padding: 16px;
}

.limit {
  font-size: var(--font-small);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gray);
  margin-left: auto;
  margin-right: 16px;
  margin-bottom: 24px;
}

.limit:last-of-type {
  margin-bottom: 40px;
}

.textarea {
  resize: none;
  font-family: inherit;
  border-radius: 36px;
  background: var(--white);
  padding: 16px;
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
  margin-left: auto;
}

.error-message {
  color: #ff7461;
  font-size: var(--font-small);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 20px;
  border-radius: 24px;
  background: rgba(255, 116, 97, 0.1);
}

@media (max-width: 430px) {
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
