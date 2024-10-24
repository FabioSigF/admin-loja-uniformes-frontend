import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useRoutesStore = defineStore("menu", () => {
  interface RouteItems {
    label: string;
    icon: string;
    url: string;
  }

  interface Route {
    label: string;
    items: RouteItems[];
  }

  // States
  const routeList = ref<Route[]>([
    {
      label: "Home",
      items: [
        {
          label: "Início",
          icon: "mynaui:home",
          url: "/",
        },
      ],
    },
    {
      label: "Apps",
      items: [
        {
          label: "Comércio",
          icon: "mynaui:store",
          url: "/apps/business",
        },
      ],
    },
    {
      label: "Analytics",
      items: [
        {
          label: "Empresas",
          icon: "mynaui:building-one",
          url: "/analytics/companies",
        },
        {
          label: "Faturamento",
          icon: "mynaui:dollar-circle",
          url: "/analytics/billing",
        },
      ],
    },
  ]);

  // Getters
  const getRouteList = computed(() => routeList.value);

  return {
    routeList,
    getRouteList,
  };
});
