<script lang="ts" setup>
const appConfig = useRuntimeConfig()
const apiToken = appConfig.public.apiToken
const baseURL = 'https://api-test.georoc.eu/api/v1'

// const { data } = await useFetch(
//   () => `${baseURL}/queries/citations`,
//   {
//     headers: {
//       'DIGIS-API-ACCESSKEY': apiToken
//     }
//   }
// )

useHead({
  htmlAttrs: {
    class: 'h-full'
  },
  bodyAttrs: {
    class: 'h-full bg-stone-100 dark:bg-zinc-950 text-stone-700 dark:text-stone-300',
  },
})

const uiStore = useUiStore()

if (process.client) {
  window.onscroll = () => {
    uiStore.scrolled = window.scrollY > 64;
  }
}

</script>

<template>
  <div class="min-h-full" :class="{'scrolled' : uiStore.scrolled }">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
