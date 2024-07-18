<script setup lang="ts">
import Checkbox from 'primevue/checkbox'

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
  <div class="flex items-center cursor-pointer">
    <Checkbox
      :model-value="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :binary="true"
      :inputId="id"
      unstyled
      :pt="{
        root: ({ context }) => ({
          class: [
            'relative border-2 dark:border-zinc-600 hover:border-primary hover:dark:border-primary rounded-md w-[22px] h-[22px] transition-colors peer',
            {'outline-none border-primary ring ring-opacity-25 ring-primary': context.focused },
            {
              'bg-zinc-50 dark:bg-zinc-700 hover:border-primary': !context.checked,
              'bg-primary text-white hover:bg-primary-700 border-primary dark:border-primary': context.checked,
            }
          ]
        }),
        input: {
          class: 'absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
        },
        box: {
          class: [
            'w-full h-full flex items-center justify-center'
          ]
        }
      }">
      <template v-slot:icon="{ checked }">
          <Icon name="ic:round-check" :class="[
            { '!hidden': !checked },
            { 'text-white dark:text-zinc-300': checked }
          ]"/>
      </template>
    </Checkbox>
    <label
      v-if="label"
      :for="id"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-zinc-300 cursor-pointer peer-hover:text-primary">
    {{ label }}
    </label>
  </div>
</template>
