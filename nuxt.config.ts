// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
 modules: [
     '@nuxtjs/tailwindcss',
     'nuxt-headlessui',
     'nuxt-icon',
     '@pinia/nuxt',
     '@nuxtjs/i18n'
 ],
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    }
  },

 i18n: {
     locales: ['en-GB'],

     // Used when active locale is not explicitly defined
     defaultLocale: 'en-GB',

     // Disabling automatic locale detection (see below)
     detectBrowserLanguage: false,
     vueI18n: './i18n.config.ts'
 },

 runtimeConfig: {
     apiToken: process.env.API_TOKEN,
     apiBaseUrl: process.env.API_BASE_URL,
     apiGroDataUrl: process.env.API_GRO_DATA_URL,
     apiGFZURL: process.env.API_GFZ_URL,
 },

 routeRules: {
     '/': { prerender: true },
     '/query': { ssr: false },
     '/sample/*': { ssr: false },
 },

 tailwindcss: {
     exposeConfig: true
 },

 css: ['~/assets/css/index.css'],

 build: {
     transpile: ["primevue"]
	},

 compatibilityDate: '2024-09-12'
})