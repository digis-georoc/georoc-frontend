<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

const props = defineProps<{
  modelValue: String
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
}>()

const materials = [
  {
    id: 'WR',
    label: 'Whole Rock',
    icon: 'noto:rock'
  },
  {
    id: 'INC',
    label: 'Inclusion',
    icon: 'noto:bubbles'
  },
  {
    id: 'MIN',
    label: 'Mineral',
    icon: 'emojione-v1:diamond-with-a-dot'
  },
]

let selectedMaterial = ref<{ id: string }>({ id: ''})

watch(() => props.modelValue, (value) => {
  const index = materials.findIndex(({ id }) => id === value)
  if (index === -1) return
  selectedMaterial.value = materials[index]
}, { immediate: true })

</script>
<template>
  <RadioGroup
    :model-value="selectedMaterial"
    @update:modelValue="value => emit('update:modelValue', value.id)"
    by="id"
  >
    <RadioGroupLabel class="sr-only">Server size</RadioGroupLabel>
    <div class="flex space-x-2">
      <RadioGroupOption
          as="template"
          v-for="material in materials"
          :key="material.id"
          :value="material"
          v-slot="{ active, checked }"
      >
        <div
            :class="[
                active
                  ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-300'
                  : '',
                checked ? 'bg-primary' : 'bg-gray-200 dark:bg-zinc-700 ',
              ]"
            class="relative flex cursor-pointer rounded-lg px-3 py-2 focus:outline-none"
        >
          <div class="flex w-full items-center justify-between space-x-2">
            <RadioGroupLabel
                as="p"
                class="text-sm flex items-center"
            >
              <div class="relative flex items-center justify-center w-8 h-8
              rounded-full me-2 bg-white dark:bg-zinc-800"
              >
                <Icon :name="material.icon" class="text-lg" />
              </div>
              <span :class="checked ? 'text-white' : 'text-zinc-600 dark:text-gray-300'">
                {{ material.label }}
              </span>
            </RadioGroupLabel>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
