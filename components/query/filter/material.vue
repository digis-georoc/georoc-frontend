<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'

const { t } = useI18n()

const props = defineProps<{
  modelValue: String
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
}>()

const materials = [
  {
    id: 'WR',
    label: t('whole_rock_and_glass'),
    icon: 'noto:rock'
  },
  {
    id: 'INC',
    label: t('inclusion'),
    icon: 'noto:bubbles'
  },
  {
    id: 'MIN',
    label: t('mineral'),
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
    class="bg-zinc-200/60 dark:bg-zinc-700 p-1 rounded-xl w-full"
  >
    <RadioGroupLabel class="sr-only">{{ $t('material_filter') }}</RadioGroupLabel>
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
            checked ? 'bg-primary' : 'hover:bg-zinc-200 dark:hover:bg-zinc-600',
          ]"
          class="relative flex-shrink-0 flex-grow flex justify-center cursor-pointer rounded-lg px-3 py-2 focus:outline-none"
        >
        <RadioGroupLabel as="p" class="text-sm flex items-center">
            <span :class="checked ? 'text-white' : 'text-zinc-600 dark:text-gray-300'">
              {{ material.label }}
            </span>
          </RadioGroupLabel>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
