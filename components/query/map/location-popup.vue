<script setup lang="ts">

const props = defineProps<{
  samples: QueryListItem[],
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

</script>

<template>
  <div class="flex flex-col w-[560px] bg-zinc-100 rounded p-2" v-if="modelValue">
    <span>{{ samples.length }} samples</span>
    <BaseButton display="flat" class="absolute z-1 right-1 top-1" icon="ic:close" @click="emit('update:modelValue', false)"/>
    <div class="overflow-x-auto space-x-2">
      <span class="flex-1" v-for="sample in samples"> {{ sample.sampleID }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
