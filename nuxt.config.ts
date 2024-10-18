import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#eceeff",
      100: "#c9d0ff",
      200: "#a5b2ff",
      300: "#8094ff",
      400: "#667aff",
      500: "#546dfe",
      600: "#4b62e6",
      700: "#404fc2",
      800: "#353e9e",
      900: "#2a307c",
      950: "#141842",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#FFFFFF",
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
          950: "#09090B",
        },
      },
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: ["@nuxt/icon", "@pinia/nuxt", "@primevue/nuxt-module"],
  devtools: { enabled: true },

  css: ["assets/css/main.css", "assets/css/primevue-custom.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
      },
      ripple: true,
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
});
