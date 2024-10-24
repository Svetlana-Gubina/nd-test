<script setup>
import { ref } from 'vue'

// defineProps({
//   msg: String,
// })

const count = ref(0)
</script>

<template>
  <header class="header">
    <div class="logo">
      <svg class="icon-logo" aria-hidden="true">
        <use xlink:href="/images/sprite.svg#logo"></use>
      </svg>
    </div>
    <div class="user-navigatio">
      <button class="login-btn" type="button">
        <i>
          <svg class="icon-logo" aria-hidden="true">
            <use xlink:href="/images/sprite.svg#login"></use>
          </svg>
        </i>
        Вход
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  max-width: 100%;
  padding: 2% 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;  
}

.logo {
  width: 220px;
  height: 50px;

  outline: 2px dashed hotpink;
}

.logo svg {
  width: 220px;
  height: 50px;
}

@media  (max-width: 360px){
  .logo {
  width: 154px;
  height: 36px;
  }
  .logo svg {
    width: 154px;
    height: 36px;
}
}

.login-btn {
  display: flex;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background: var(--green-light);
  color: var(--white);
}

.login-btn:hover {
  background-color: var(--green-middle);
}
.login-btn:focus,
.login-btn:active {
  background-color: var(--green-dark);
}
 
.login-btn svg {
  width: 32px;
  height: 32px;
  fill: var(--white);
}

@media (max-width: 1366px) {
  .header {
  padding: 20px 80px;
}
}

@media (max-width: 768px) {
  .header {
  padding: 20px 40px;
}
}

@media (max-width: 360px) {
  .header {
  padding: 20px;
}

.logo {
  width: 154px;
  height: 36px;
}
}
</style>
