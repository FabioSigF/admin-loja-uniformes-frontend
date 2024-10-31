import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useModalStore = defineStore("modal", () => {
  //------ Product Remove ------
  // states
  const removeProductIsOpen = ref(false);
  // actions
  const setToggleRemoveProduct = () => {
    removeProductIsOpen.value = !removeProductIsOpen.value;
  };
  // getters
  const getRemoveProductState = computed(() => removeProductIsOpen.value);

  return { removeProductIsOpen, setToggleRemoveProduct, getRemoveProductState };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot));
}
