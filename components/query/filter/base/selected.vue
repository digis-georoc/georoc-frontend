<script setup lang="ts">
import {MultiselectOption, RadioGroupOption} from "~/types";

const props = defineProps<{
  modelValue: MultiselectOption[] | RadioGroupOption[]
}>()

const emit = defineEmits<{
  remove: [index: number]
  'update:modelValue': [list: string[]]
}>()

</script>
<template>
  <div class="flex space-x-2">
    <template v-if="modelValue && modelValue.length > 0">
      <div class="bg-primary-100 py-1.5 px-2 text-primary font-bold rounded-lg flex items-center flex-shrink-0" v-for="(item, i) in modelValue">
        <span class="text-sm leading-none">{{ $t(item.label) }}</span>
        <Icon name="ic:round-close" class="cursor-pointer hover:bg-primary hover:bg-opacity-25 rounded-full p-0.5 ms-2" @click="emit('remove', i)" />
      </div>
    </template>
    <div v-else class="text-sm text-stone-400">{{ $t('no_options_selected') }}.</div>
  </div>
</template>
