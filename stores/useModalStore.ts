import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useModalStore = defineStore("modal", () => {
  //------ Business New Product ------
  // states
  const newProductIsOpen = ref(false);
  // actions
  const setToggleNewProduct = () => {
    newProductIsOpen.value = !newProductIsOpen.value;
  };
  // getters
  const getNewProductState = computed(() => newProductIsOpen.value);
  //------ Product Remove ------
  // states
  const removeProductIsOpen = ref(false);
  // actions
  const setToggleRemoveProduct = () => {
    removeProductIsOpen.value = !removeProductIsOpen.value;
  };
  // getters
  const getRemoveProductState = computed(() => removeProductIsOpen.value);

  return { 
    //states
    //------ Business New Product ------
    newProductIsOpen,
    //------ Product Remove ------
    removeProductIsOpen, 
    //actions
    //------ Business New Product ------
    setToggleNewProduct,
    //------ Product Remove ------
    setToggleRemoveProduct, 
    //getters
    //------ Business New Product ------
    getNewProductState,
    //------ Product Remove ------
    getRemoveProductState };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot));
}
