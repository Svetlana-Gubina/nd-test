import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("user", () => {
  const userInfo = ref(null);

  const setUserInfo = (newUserInfo) => {
    userInfo.value = newUserInfo;
  };

  function $reset() {
    userInfo.value = null;
  }

  return {
    userInfo,
    setUserInfo,
    $reset,
  };
});
