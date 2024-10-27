<script setup>
import { defineEmits, ref, watch } from "vue";
import { useRouter } from 'vue-router';
import {useApi, useAuth} from "@/api/auth";
import LoadingView from "./LoadingView.vue";
import ShowHidePasswordBtn from "./ShowHidePasswordBtn.vue";

import * as Yup from "yup";

const emit = defineEmits(["go-to-register", "success"]);
const isPasswordShown = ref(false);
const passwordType = ref("password");

const toggleIsPasswordShown = () => {
  isPasswordShown.value = !isPasswordShown.value;
}

watch(
  () => isPasswordShown.value,
  () => {
    if(isPasswordShown.value) {
      passwordType.value = "text";
    } else {
      passwordType.value = "password";
    }
  }
)

const {
   loading,
   data,
   error,
   post,
  //  errorMessage,
  //  errorFields
  } = useApi("/api/auth")

const { setUser } = useAuth();
const router = useRouter();

const user = ref({
    email: '',
    password: ''
})

const errors = ref({
    email: '',
    password: '',
    passwordConfirm: ''
})

const schema = Yup.object().shape({
  email: Yup.string().required("Введите email").email("Необходим корректный email"),
  password: Yup.string().required("Введите пароль"),
 });

 const validate = (field) => {
  schema.validateAt(field, user.value)
        .then(() => {
          errors.value[field] = "";
        })
        .catch(err => {
          errors.value[field] = err.message;
        });
}

const onLoginFormSubmit = () => {
  const request = {
     email: user.value.email,
     password: user.value.password,
  };

  schema.validate(user.value, { abortEarly: false })
        .then(() => {
          errors.value = {};
          return post(request)
        })
        .then(() => {
          setUser(data.value);
          router.push({ name: "Notes" });
          emit("success")
        })
        .catch(err => {
          err.inner.forEach(error => {
            errors.value[error.path] = error.message;
            console.log('errors: ', errors.value)
          });
        });

};

const onRegisterLinkClick = () => {
  emit("go-to-register");
}

</script>

<template>
  <LoadingView v-if="loading" />
  <div class="form-wrapper">
    <h2>Вход в ваш аккаунт</h2>
    
    <form class="form" method="POST" @submit.prevent="onLoginFormSubmit" novalidate :validation-schema="schema">
      <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" placeholder="Введите значение" @blur="validate('email')"/>
        <p class="error-message" v-if="!!errors.email">
          {{ errors.email }}
        </p>

        
        <label for="password">Пароль</label>
        <div class="password-wrapper">
          <input :type="passwordType" id="password" v-model="user.password" placeholder="Введите пароль" @blur="validate('password')"/>
         <ShowHidePasswordBtn :isShown="isPasswordShown" @toggleIsShown="toggleIsPasswordShown" /> 
        </div>
        <p class="error-message" v-if="!!errors.password">
          {{ errors.password }}
        </p>

        <div class="form__footer">
          <p class="no-account">У вас еще нет аккаунта? <a href="#" @click.prevent="onRegisterLinkClick">Зарегистрируйтесь</a></p>

        <button type="submit">Войти</button>
        </div>

        <div v-if="error"  class="error-message">
          Комбинация логин/пароль не найдена
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
  width: 100%;
  max-width: 100%;
  font-family: inherit;
  border-radius: 36px;
  background: var(--white);
  padding:  16px;
  margin-bottom: 24px;
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
.password-wrapper {
  margin: 0;
  padding: 0;
  position: relative;
}

@media (max-width: 430px) {
  .form-wrapper h2 {
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.1;
}

.form input {
  margin-bottom: 16px;
}

.form input:last-of-type {
  margin-bottom: 28px;
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