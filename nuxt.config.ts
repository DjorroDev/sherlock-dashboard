// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt"],
  routeRules: {
    "/*": { cors: true },
  },
  ssr: true,
  runtimeConfig: {
    public: {
      serverTo: "http://localhost:3001",
      cloudinaryCloudName: "",
      cloudinaryApiSecret: "",
      serverLink: "http://127.0.0.1:5000",
    },
  },
});
