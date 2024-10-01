<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: 'h-full'
  },
  bodyAttrs: {
    class: 'h-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
