<script setup>
// import { ref } from 'vue'


</script>

<template>
  
    <section class="main-title">
    <div class="main-title__text">
        <h1>Мои
        заметки</h1>
        <p class="subtitle">Не забывай о важном, храни его в облаке.</p>
        <router-link to="/notes">Notes</router-link>
    </div>
    
  </section>
 
</template>

<style scoped>
.main-title {
    width: 100%;
    max-width: 100%;
    min-height: 830px;
    display: flex;
    align-items:center;
    text-align: left;
    background-image: image-set(
    url("/public/images/group-1@.png") 1x,
    url("/public/images/group-1@2x.png") 2x);
    background-size: 65% 100%;
    background-repeat: no-repeat;
    background-position: 100% 50%;
}
.main-title__text {
    max-width: 50%;
}

.main-title__text  h1 {
    margin: 0;
    margin-bottom: 40px;
}
.subtitle {
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    color: var(--gray);
    max-width: 400px;
}

@media (max-width: 1366px) {
    .main-title {
    min-height: 700px;
    background-size: 65% 100%;
  }
}

@media (max-width: 1200px) {
    .main-title {
    background-size: 55% 70%;
  }
}

@media (max-width: 1000px) {
    .main-title {
    background-size: 40% 40%;
  }

}

@media (max-width: 900px) {
    .main-title {
    flex-direction: column;
    align-items:center;
    text-align: center;
    min-height: 1000px;
    background-size: 50% 65%;
    background-position: 50% 80%;
  }

  .main-title__text {
    max-width: 100%;

}

.main-title__text h1 {
    font-size: 60px;
    font-style: normal;
    font-weight: 900;
    line-height: 1.1;
    width: 300px;
    margin: 0 auto;
}

  .subtitle {
    width: 688px;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
  }
}

@media (max-width: 768px) {
    .main-title {
    background-size: 100% 70%;
  }

}

@media (max-width: 600px) {
    .main-title {
    background-size: 100% 45%;
    background-position: 50% 50%;
  }

  .subtitle {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 430px) {
    .main-title {
    background-size: 100% 30%;
    background-position: 50% 40%;
  }
}

@media (max-width: 360px) {
    .main-title {
    min-height: 640px;
    background-size: 100% 50%;
    background-position: 50% 100%;
  }

  .subtitle {
    width: 100%;
    max-width: 100%;
  }
}
</style>
