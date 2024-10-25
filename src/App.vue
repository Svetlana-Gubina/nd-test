<script setup>
import MainHeader from './components/MainHeader.vue'
import HomeView from './components/HomeView.vue'
</script>

<template>
  <MainHeader/>

  <main class="page-main">
    <HomeView />
  </main>
</template>

<style scoped>
.page-main {
  width: 100%;
  max-width: 100%;
  padding: 2% 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

@media (max-width: 1366px) {
  .page-main {
    padding: 0 80px;
  }
}

@media (max-width: 768px) {
  .page-main {
    padding: 40px;
    flex-direction: column;
    align-items:center;
  }
}

@media (max-width: 360px) {
  .page-main {
    padding: 0 10px;
  }
}
</style>
