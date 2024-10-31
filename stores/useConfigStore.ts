import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useConfigStore = defineStore("config", () => {
  // states
  const token = ref("");
  // actions
  const setToken = (newToken: string) => {
    token.value = newToken;
  };
  // getters
  const getToken = computed(() => token.value);
  return { token, setToken, getToken };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot));
}
