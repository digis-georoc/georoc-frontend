<script setup lang="ts">
const props = defineProps<{
  label: String,
  modelValue: boolean
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: boolean): void;
}>()
</script>
<template>
  <div class="flex items-center">
    <input
      :value="modelValue"
      @input="value => emit('update:modelValue', value)"
      id="default-checkbox"
      type="checkbox"
      value=""
      class="appearance-none w-4 h-4
      text-white bg-gray-100 checked:bg-primary checked:dark:bg-primary border border-gray-300 rounded
      focus:ring-primary-300 dark:ring-offset-gray-800
      focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600
      relative
      checked:before:content-['\2713'] before:flex before:justify-center before:items-center before:absolute
      before:top-0 before:left-0
      before:w-full before:h-full before:leading-none before:text-[0.75rem]"
    >
    <label
        for="default-checkbox"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-zinc-300">
      {{ label }}
    </label>
  </div>
</template>
