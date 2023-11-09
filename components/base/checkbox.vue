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
  <div class="flex items-center">
    <Checkbox
      :model-value="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :binary="true"
      :inputId="id"
      unstyled
      :pt="{
        root: ({ context }) => ({
          class: [
            'border-2 rounded-md w-[22px] h-[22px] transition-colors cursor-pointer',
            {'outline-none border-primary ring ring-opacity-25 ring-primary': context.focused },
            {
              'bg-stone-50 hover:border-primary': !context.checked,
              'bg-primary text-white hover:bg-primary-700 border-primary': context.checked,
            }
          ]
        }),
        input: {
          class: 'w-full h-full flex flex items-center justify-center'
        },
      }">
      <template v-slot:icon>
          <Icon name="ic:round-check" class="text-white dark:text-zinc-800"/>
      </template>
    </Checkbox>
    <label
      v-if="label"
      :for="id"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-zinc-300">
    {{ label }}
    </label>
  </div>
</template>
