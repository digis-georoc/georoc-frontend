<script lang="ts" setup>
const props = defineProps<{
  item: SampleItem | null,
}>()

</script>
<template>
  <div class="flex p-4 border rounded-lg hover:ring-2 hover:ring-primary cursor-pointer dark:border-zinc-600">
    {{ item.sampleID }}
  </div>
</template>
