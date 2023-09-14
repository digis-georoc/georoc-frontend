<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string,
  label?: String,
  modelValue?: boolean
}>(), {
  id: 'default-id',
})

const emit = defineEmits<{
  (event: 'update:modelValue', payload: boolean): void;
}>()
</script>
<template>
  <div class="flex items-center">
    <input
      :checked="modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
      :id="id"
      type="checkbox"
      class="appearance-none w-[20px] h-[20px]
      text-white bg-gray-100 checked:bg-primary checked:dark:bg-primary border border-gray-300 rounded
      focus:outline-none focus:ring-primary focus:ring-opacity-25 dark:ring-offset-gray-800
      focus:ring-4 dark:bg-zinc-700 dark:border-zinc-600
      relative z-20 cursor-pointer
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
