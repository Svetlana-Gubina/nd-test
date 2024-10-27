<script setup>
import { defineEmits, ref, watch } from "vue";
import {useApi, useAuth} from "@/api/auth";
import LoadingView from "./LoadingView.vue";
import ShowHidePasswordBtn from "./ShowHidePasswordBtn.vue";

// to import everything from yup
import * as Yup from "yup";

const emit = defineEmits(["go-to-login"]);
const isLoading = ref(false);

const isPasswordShown = ref(false);
const passwordType = ref("password");
const isPasswordConfirmShown = ref(false);
const passwordConfirmType = ref("password");

const toggleIsPasswordShown = () => {
  isPasswordShown.value = !isPasswordShown.value;
}
const toggleIsPasswordConfirmShown = () => {
  isPasswordConfirmShown.value = !isPasswordConfirmShown.value;
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
watch(
  () => isPasswordConfirmShown.value,
  () => {
    if(isPasswordConfirmShown.value) {
      passwordConfirmType.value = "text";
    } else {
      passwordConfirmType.value = "password";
    }
  }
)


// const {
//       error,
//       loading,
//       post,
//       data,
//       errorMessage,
//       errorFields,
//     } = useApi('/reg');

const { setUser } = useAuth()

const formData = ref({
    email: '',
    password: '',
    passwordConfirm: ''
});


const errors = ref({
    email: '',
    password: '',
    passwordConfirm: ''
})

 const schema = Yup.object().shape({
  email: Yup.string().required("Введите email").email("Необходим корректный email"),
    password: Yup.string().required("Введите пароль"),
    passwordConfirm: Yup.string().required("Повторите пароль").oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
 });

const onLoginLinkClick = () => {
    emit("go-to-login");
}

const validate = (field) => {
  schema.validateAt(field, formData.value)
        .then(() => {
          errors.value[field] = "";
        })
        .catch(err => {
          errors.value[field] = err.message;
        });
}

const onSubmitRegisterForm = async () => {
//   const request = {
//   email: formData.value.email,
//   password: formData.value.password,
//   confirm_password: formData.value.passwordRepeat
// };
schema.validate(formData.value, { abortEarly: false })
        .then(() => {
          errors.value = {};

          alert("Success")
          isLoading.value = true;
          setTimeout(() => {
            isLoading.value = false;
            emit("go-to-login");
          }, 1000);

          // post(request).then(() => {
          //   setUser(data.value)

          //   alert("Success")

          //   setTimeout(() => {
          //     emit("go-to-login");
          //   }, 1000);
          // });
        })
        .catch(err => {
          console.log("err",err)
          err.inner.forEach(error => {
            errors.value[error.path] = error.message;
            console.log('errors: ', errors.value)
          });
        });
  
  
}

</script>

<template>
  <LoadingView v-if="isLoading" />
  <div class="form-wrapper">
    <h2>Регистрация</h2>
    
    <form class="form" method="POST" @submit.prevent="onSubmitRegisterForm" novalidate :validation-schema="schema">
      <label for="email">Email</label>
        <input type="email" id="email" v-model="formData.email" placeholder="Введите значение" @blur="validate('email')" />
        <p class="error-message" v-if="!!errors.email">
          {{ errors.email }}
        </p>

        <label for="password">Пароль</label>
        <div class="password-wrapper">
          <input :type="passwordType" id="password" v-model="formData.password" placeholder="Введите пароль" @blur="validate('password')"  />
          <ShowHidePasswordBtn :isShown="isPasswordShown" @toggleIsShown="toggleIsPasswordShown" /> 
        </div>
        
        <p class="error-message" v-if="!!errors.password">
          {{ errors.password }}
        </p>


        <label for="passwordConfirm">Пароль ещё раз</label>
        <div class="password-wrapper">
          <input :type="passwordConfirmType" id="passwordConfirm" v-model="formData.passwordConfirm" placeholder="Ввод|" @blur="validate('passwordConfirm')" />
          <ShowHidePasswordBtn :isShown="isPasswordConfirmShown" @toggleIsShown="toggleIsPasswordConfirmShown" /> 
        </div>
        
        <p class="error-message" v-if="!!errors.passwordConfirm">
          {{ errors.passwordConfirm }}
        </p>
        

        <div class="form__footer">
          <p class="account">У вас есть аккаунт? <a href="#" @click.prevent="onLoginLinkClick">Войдите</a></p>

        <button type="submit">Зарегистрироваться</button>
        </div>

        <!-- <div v-if="error"  class="error-message">
          {{ errorFields || errorMessage }}
        </div> -->

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
  width: 100%;
  max-width: 100%;
}

.form input:last-of-type {
  margin-bottom: 40px;
}

.account {
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

@media (max-width: 360px) {
  .form-wrapper h2 {
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.1;
}

.account,
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