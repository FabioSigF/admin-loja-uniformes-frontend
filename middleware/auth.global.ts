import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.env.SSR === false) {
    const token = sessionStorage.getItem("token");
    console.log("Acessou o middleware de autenticação");
    // Permitir acesso às páginas de login e registro
    if (!token && to.path !== "/login" && to.path !== "/register") {
      return navigateTo("/login"); // Redireciona para a página de login se não estiver autenticado
    }

    // Permitir acesso a todas as páginas se o usuário estiver autenticado
    if (token && (to.path === "/login" || to.path === "/register")) {
      return navigateTo("/home"); // Redireciona para a página inicial se já estiver autenticado
    }
  }
});
