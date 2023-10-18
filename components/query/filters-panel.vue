<script lang="ts" setup>
  const queryStore = useQueryStore()
  const amount = computed(() => queryStore.listResult?.totalCount ?? 0)
</script>
<template>
  <div class="flex bg-white dark:bg-zinc-800 dark:border-zinc-600 flex-col
    relative border-r shadow flex-shrink-0 min-w-[400px] w-1/4 h-full">
    <div class="flex items-center my-4 px-4">
      <h2 class="text-xl font-bold">{{ $t('database_query') }}</h2>
      <span class="ml-auto text-sm">showing {{ amount.toLocaleString('en') }} samples</span>
    </div>
    <QueryFilters/>
  </div>
</template>
