import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useConfigStore } from "~/stores/useConfigStore";

const isTokenValid = async (token: string) => {
  const config = useRuntimeConfig();

  const { data, error } = await useFetch(
    `${config.public.API_URL}/auth/validate-token`,
    {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  if (error.value) {
    console.error("Erro ao validar token:", error);
    return false;
  } else {
    console.log("Token validado com sucesso:", data);
    return true;
  }
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.env.SSR === false) {
    const { setToken } = useConfigStore();
    const token = sessionStorage.getItem("token");

    if (token) {
      const isValid = await isTokenValid(token);
      if (isValid) {
        setToken(token);
        // Se o usuário está autenticado e tenta acessar a página de login ou registro, redireciona para a home
        if (to.path === "/login" || to.path === "/register") {
          return navigateTo("/");
        }
      } else {
        // Se o token não é válido, redireciona para a página de login
        setToken("");
        sessionStorage.removeItem("token");
        return navigateTo("/login");
      }
    } else if (!token && to.path !== "/login" && to.path !== "/register") {
      return navigateTo("/login"); // Redireciona para a página de login se não estiver autenticado
    }
  }
});
