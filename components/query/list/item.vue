<script lang="ts" setup>
const props = defineProps<{
  item: QueryListItem | null,
}>()

</script>
<template>
  <div class="flex flex-col p-4 border rounded-lg hover:ring-2 hover:ring-primary cursor-pointer dark:border-zinc-600">
    <p>{{ item.sampleID }}</p>
    <p class="">{{ item.samplename }}</p>
  </div>
</template>
