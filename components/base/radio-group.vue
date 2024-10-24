<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'

const props = defineProps<{
  modelValue: RadioGroupOption | null
  options: RadioGroupOption[],
  size?: string,
  vertical?: boolean
}>()

const emit = defineEmits(['change', 'update:modelValue'])
const options = props.options

const selectedOptionValue = ref(props.modelValue?.value)
watch(selectedOptionValue, (value) => selectedOptionValue.value = value)
function onUpdate(option: RadioGroupOption) {
  selectedOptionValue.value = option.value
  emit('update:modelValue', option)
}

const horizontalPT = {
  root: {
    class: 'flex'
  },
  button: ({ context }) => ({
    class: [
      'dark:border-gray-700',
      context.active ? 'bg-primary text-white z-10' : 'bg-white dark:bg-gray-800',
      options.findIndex(option => option.value === context.option.value) === 0 ? 'rounded-l-lg border-l border-r' : '',
      {
        'border-r':
            options.length > 3 &&
            !(options.findIndex(option => option.value === context.option.value) === 0) &&
            !(options.findIndex(option => option.value === context.option.value) === options.length - 1)
      },
      options.findIndex(option => option.value === context.option.value) === options.length - 1 ? 'rounded-r-lg border-r border-l' : '',
      // { 'ring-2 ring-offset-2 ring-primary-300': context.focused },
      { 'hover:bg-gray-100 dark:hover:bg-gray-700': !context.active },
      { 'text-sm': props.size === 'sm'},
      'relative py-3 px-4 whitespace-nowrap flex-1 flex items-center font-semibold border-t border-b cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-primary-300'
    ]
  }),
};

const verticalPT = {
  root: {
    class: 'flex flex-col space-y-1'
  },
  button: ({ context }) => ({
    class: [
      'flex w-full',
      'dark:border-gray-700 rounded-md border',
      context.active ? 'border border-primary bg-primary-50 dark:bg-gray-600 text-primary dark:text-primary-50 font-bold z-10' : 'bg-white dark:bg-gray-800',
      { 'hover:bg-gray-50 dark:hover:bg-gray-700': !context.active },
      { 'text-sm': props.size === 'sm'},
      'relative py-3 px-4 whitespace-nowrap flex-1 flex items-center font-semibold border-t border-b cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
    ]
  }),
};

</script>
<template>
  <SelectButton
    :options="options"
    option-label="label"
    :model-value="modelValue" @update:modelValue="onUpdate"
    unstyled
    :pt="vertical ? verticalPT : horizontalPT"
  >
    <template v-slot:option="{ option }: { option: RadioGroupOption }">
      <span>{{ option.label }}</span>
      <Icon
        :class="{
          'text-primary dark:text-primary-50': selectedOptionValue === option.value,
          'text-gray-300': selectedOptionValue !== option.value,
        }"
        :name="selectedOptionValue === option.value ? 'ic:baseline-check-circle' : 'ic:outline-circle'"
        class="ml-auto text-lg transition-colors ease-in"
      />
    </template>
  </SelectButton>
</template>
