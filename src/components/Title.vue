<script setup>
// import { ref } from 'vue'
const props = defineProps({
    text: String
})

</script>

<template>
  <div class="title">
    <slot>{{ text }}</slot>
  </div>
 
</template>

<style scoped>
.title {
    position: absolute;
    right: 0;
    bottom: -200%;
    width: auto;
    margin: 0;
    padding: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: var(--bg-dark-middle);
    font-size: var(--font-small);
    line-height: 1.1;
    color: var(--green-light);
    box-shadow: 0 0 20px 5px black;
    display: none;
}

.title::after {
  content: "";
  position: absolute;
  top: -5px;
  left: 75%;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid var(--bg-dark-middle);

}

@media (max-width: 768px) {
  .title {
    padding: 20px;
  }
}
</style>
