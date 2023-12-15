<script setup lang="ts">
const queryStore = useQueryStore()
const amount = computed(() => queryStore.listResult?.totalCount ?? 0)
</script>
<template>
  <span class="text-sm whitespace-nowrap">{{ amount.toLocaleString('en') }} samples found</span>
</template>
