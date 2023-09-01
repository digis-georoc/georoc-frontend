<script setup lang="ts">
const queryStore = useQueryStore()

const listResult = computed(() => queryStore.listResult)
</script>
<template>
  <div
    class="flex flex-col flex-1 bg-white p-4 h-full overflow-y-auto dark:bg-zinc-800"
  >
    <template v-if="listResult === null">
      <span>{{ $t('no_samples') }}</span>
    </template>
    <template v-else>
      <QueryListItem v-for="item in listResult.data" :item="item" class="mb-2" />
    </template>
  </div>
</template>
