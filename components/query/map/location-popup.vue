<script setup lang="ts">

const props = defineProps<{
  samples: QueryListItem[],
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

</script>

<template>
  <div class="flex flex-col w-[560px] bg-zinc-100 dark:bg-zinc-800 rounded-md p-3 shadow" v-if="modelValue">
    <div class="flex items-center space-x-2 mb-2">
      <h3 class="text-lg font-bold">{{ $t('selected_samples') }}</h3>
      <span class="text-zinc-500">1/{{ samples.length }}</span>
    </div>
    <BaseButton display="flat" class="absolute z-1 right-1 top-1" icon="ic:close" @click="emit('update:modelValue', false)"/>
    <div class="overflow-x-auto flex space-x-2 pb-2 h-32">
      <div class="p-2 flex-shrink-0 border dark:border-zinc-600 rounded-md" :class="{'w-[90%]': samples.length > 1, 'w-full': samples.length === 1}" v-for="sample in samples">
        <NuxtLink :to="`/sample/${sample.sampleID}`">{{ sample.sampleID }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
