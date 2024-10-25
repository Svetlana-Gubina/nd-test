<script setup>
import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["go-to-register"]);

const isError = ref(false);

const user = {
    email: '',
    password: ''
}

const onRegisterLinkClick = () => {
  emit("go-to-register");
}

</script>

<template>
  <div class="form-wrapper">
    <h2>Вход в ваш аккаунт</h2>
    
    <form class="form" method="POST">
      <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" placeholder="Введите значение"/>

        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="user.password" placeholder="Введите пароль"/>
        

        <div class="form__footer">
          <p class="no-account">У вас еще нет аккаунта? <a href="#" @click.prevent="onRegisterLinkClick">Зарегистрируйтесь</a></p>

        <button type="submit">Войти</button>
        </div>

        <div v-if="isError"  class="error-message">
          Пользователь с таким логином не найден
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
}

.form input:last-of-type {
  margin-bottom: 40px;
}

.no-account {
  font-size: var(--font-small);
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  color:var(--gray);
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