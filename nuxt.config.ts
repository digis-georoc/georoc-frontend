// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiToken: process.env.API_TOKEN,
        }
    },
})
