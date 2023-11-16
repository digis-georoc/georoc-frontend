<script setup lang="ts">
import SelectButton from 'primevue/selectbutton'

const props = defineProps<{
  modelValue: RadioGroupOption
  options: RadioGroupOption[]
}>()

const emit = defineEmits(['change', 'update:modelValue'])

const selectedOptionValue = ref(props.modelValue.value)
function onUpdate(option: RadioGroupOption) {
  selectedOptionValue.value = option.value
  emit('update:modelValue', option)
}

</script>
<template>
  <div class="w-full px-4 py-16">
    <div class="mx-auto w-full max-w-md">
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
              { 'hover:bg-zinc-100': !context.active },
              'relative py-2 px-4 flex-1 flex items-center font-semibold border-t border-b cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-primary-300'
            ]
          }),
        }"
      >
        <template v-slot:option="{ option }: { option: RadioGroupOption }">
          <span>{{ option.label }}</span>
          <Transition>
            <Icon v-if="selectedOptionValue === option.value" name="ic:baseline-check-circle" class="ml-2 text-primary-300 text-lg"/>
          </Transition>
        </template>
      </SelectButton>
    </div>
  </div>
</template>
<style scoped>
.v-enter-active {
  transition: opacity 0.4s 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
