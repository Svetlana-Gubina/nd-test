<script setup></script>

<template>
  <div class="loading">Загрузка...</div>
</template>

<style scoped>
.loading {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-dark-light);
}
</style>
