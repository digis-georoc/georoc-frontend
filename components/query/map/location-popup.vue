<script setup lang="ts">

const props = defineProps<{
  samples: QueryListItem[],
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

</script>

<template>
  <div class="flex flex-col w-[92vw] md:w-[560px] bg-gray-100 dark:bg-gray-800 rounded-md p-3 shadow" v-if="modelValue">
    <div class="flex items-center space-x-2 mb-2">
      <h3 class="text-lg font-bold">{{ $t('selected_samples') }}</h3>
      <span class="text-gray-500">1/{{ samples.length }}</span>
    </div>
    <BaseButton display="flat" class="absolute z-1 right-1 top-1" icon="ic:close" @click="emit('update:modelValue', false)"/>
    <div class="overflow-x-auto flex space-x-2 pb-2 min-h-32 -ml-[3px] pt-[3px]">
      <div class="flex-shrink-0" :class="{'w-[85%]': samples.length > 1, 'w-[99%]': samples.length === 1}" v-for="sample in samples">
        <QueryListItem :item="sample" class="h-full"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
