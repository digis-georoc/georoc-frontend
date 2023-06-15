// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-headlessui',
        'nuxt-icon',
        '@pinia/nuxt'
    ],
    runtimeConfig: {
        public: {
            apiToken: process.env.API_TOKEN,
        }
    },
    routeRules: {
        // Homepage pre-rendered at build time
        '/': { prerender: true },
        // Admin dashboard renders only on client-side
        '/query': { ssr: false },
    }
})
