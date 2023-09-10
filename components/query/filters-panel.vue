<template>
  <div class="flex bg-white dark:bg-zinc-800 border-r dark:border-zinc-600 flex-col
    relative w-full p-4 border-b shadow">
    <div class="flex items-center absolute">
      <h2 class="text-xl font-bold">{{ $t('database_query') }}</h2>
    </div>
    <QueryFilters/>
  </div>
</template>
