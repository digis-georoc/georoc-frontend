<script setup lang="ts">
const queryStore = useQueryStore()
const amount = computed(() => queryStore.listResult?.totalCount ?? 0)
</script>
<template>
  <span class="text-sm">showing {{ amount.toLocaleString('en') }} samples</span>
</template>
