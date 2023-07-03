<script setup lang="ts">

definePageMeta({
  layout: 'query',
})



</script>
<template>
  <div class="flex h-full w-full">
    <div class="flex w-1/4 bg-white dark:bg-zinc-800 border-r dark:border-zinc-500">
      <QueryFilters/>
    </div>
    <div class="flex w-3/4 h-full">
      <QueryMap/>
    </div>
  </div>

</template>
