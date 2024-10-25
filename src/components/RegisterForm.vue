<script setup>
// import { defineProps, defineEmits, ref } from "vue";


const user = {
    email: '',
    password: '',
    passwordRepeat: ''
}

</script>

<template>
  <div class="form-wrapper">
    <h2>Регистрация</h2>
    
    <form class="form" method="POST">
      <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" placeholder="Введите значение"/>

        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="user.password" placeholder="Введите пароль"/>

        <label for="password">Пароль ещё раз</label>
        <input type="password" id="password" v-model="user.passwordRepeat" placeholder="Ввод|"/>
        

        <div class="form__footer">
          <p class="no-account">У вас есть аккаунт? <router-link to="#">Войдите</router-link></p>

        <button type="submit">Зарегистрироваться</button>
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