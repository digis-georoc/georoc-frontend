// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    app: {
        baseURL: process.env.NUXT_APP_BASE_URL,
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-headlessui',
        'nuxt-icon',
        '@pinia/nuxt'
    ],
    runtimeConfig: {
        public: {
            apiToken: process.env.API_TOKEN,
            apiBaseUrl: process.env.API_BASE_URL
        }
    },
    routeRules: {
        // Homepage pre-rendered at build time
        '/': { prerender: true },
        // Admin dashboard renders only on client-side
        '/query': { ssr: false },
    },
    tailwindcss: {
        exposeConfig: true
    }
})
