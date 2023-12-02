<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'

const props = defineProps<{
  modelValue: RadioGroupOption
  options: RadioGroupOption[],
  size: string
}>()

const emit = defineEmits(['change', 'update:modelValue'])

const selectedOptionValue = ref(props.modelValue.value)
function onUpdate(option: RadioGroupOption) {
  selectedOptionValue.value = option.value
  emit('update:modelValue', option)
}

</script>
<template>
  <SelectButton
    :options="options"
    option-label="label"
    :model-value="modelValue" @update:modelValue="onUpdate"
    unstyled
    :pt="{
      root: {
        class: 'flex'
      },
      button: ({ context }) => ({
        class: [
          'dark:border-zinc-700',
          context.active ? 'bg-primary text-white z-10' : '',
          options.findIndex(option => option.value === context.option.value) === 0 ? 'rounded-l-lg border-l border-r' : '',
          {
            'border-r':
              options.length > 3 &&
              !(options.findIndex(option => option.value === context.option.value) === 0) &&
              !(options.findIndex(option => option.value === context.option.value) === options.length - 1)
          },
          options.findIndex(option => option.value === context.option.value) === options.length - 1 ? 'rounded-r-lg border-r border-l' : '',
          // { 'ring-2 ring-offset-2 ring-primary-300': context.focused },
          { 'hover:bg-zinc-100 dark:hover:bg-zinc-700': !context.active },
          { 'text-sm': props.size === 'sm'},
          'relative py-2 px-4 whitespace-nowrap flex-1 flex items-center font-semibold border-t border-b cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-primary-300'
        ]
      }),
    }"
  >
    <template v-slot:option="{ option }: { option: RadioGroupOption }">
      <span>{{ option.label }}</span>
      <Icon
        :class="{
          'opacity-0': selectedOptionValue !== option.value,
          'delay-100': selectedOptionValue === option.value
        }"
        name="ic:baseline-check-circle"
        class="ml-2 text-primary-300 text-lg transition-opacity ease-in"
      />
    </template>
  </SelectButton>
</template>
