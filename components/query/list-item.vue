<script lang="ts" setup>
import { SampleItem } from "~/types";

const props = defineProps<{
  item: SampleItem | null,
}>()

</script>
<template>
  <div class="flex p-4 border rounded-lg hover:ring-2 hover:ring-primary cursor-pointer">
    {{ item.SampleID }}
  </div>
</template>
