import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { type ToastInfo } from "~/interfaces/Toast";

export const useToastStore = defineStore("toast", () => {
  //------ Create Company  ------
  //state
  const companyWasCreated = ref(false);
  const companyWasCreatedInfo = ref<ToastInfo>({
    severity: "success",
    summary: "A empresa foi cadastrado com sucesso!",
    life: 3000,
  });
  //action
  const setToggleCompanyWasCreated = () => {
    companyWasCreated.value = !companyWasCreated.value;
  };
  //getter
  const getCompanyWasCreatedStatus = computed(() => {
    return companyWasCreated.value;
  });

  return {
    //------ Create Company  ------
    companyWasCreated,
    companyWasCreatedInfo,
    setToggleCompanyWasCreated,
    getCompanyWasCreatedStatus,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot));
}
