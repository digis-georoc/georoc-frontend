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
        apiExpertToken: process.env.API_EXPERT_TOKEN,
        apiExpertUrl: process.env.API_EXPERT_URL
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
	}
})
