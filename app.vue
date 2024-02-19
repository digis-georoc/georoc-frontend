<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: 'h-full'
  },
  bodyAttrs: {
    class: 'h-full bg-stone-100 dark:bg-zinc-900 text-stone-700 dark:text-stone-300',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
