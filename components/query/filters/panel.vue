<script lang="ts" setup>
</script>
<template>
  <div class="flex h-full dark:bg-zinc-800 dark:border-zinc-600 flex-col
    relative z-[1000] border-r shadow-2xl flex-shrink-0 w-[460px] bg-zinc-100">
    <div class="flex items-center py-4 px-4 bg-white dark:bg-zinc-800 border-b dark:border-zinc-600">
      <h2 class="text-xl font-bold">{{ $t('database_query') }}</h2>
    </div>
    <QueryFilters/>
  </div>
</template>
