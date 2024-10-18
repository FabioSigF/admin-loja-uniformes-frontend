// nuxt.d.ts
declare module "nuxt/schema" {
  interface NuxtConfig {
    primevue?: {
      options?: {
        theme?: string | object;
        unstyled?: boolean;
        ripple?: boolean;
      };
    };
  }
}
