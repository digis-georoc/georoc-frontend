<script setup lang="ts">
import {MaterialKeys} from "~/utils/material-keys";

const { t } = useI18n()

const props = withDefaults(defineProps<{
  modelValue?: String,
  size: 'small' | 'normal'
}>(), { size: 'normal' })

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string): void;
}>()

interface MaterialOption {
  value: string,
  label: string,
  icon: string
}

const materials: MaterialOption[] = [
  {
    value: MaterialKeys.WRGL,
    label: t('whole_rock_and_glass'),
    icon: 'noto:rock'
  },
  {
    value: MaterialKeys.INC,
    label: t('inclusion'),
    icon: 'noto:bubbles'
  },
  {
    value: MaterialKeys.MIN,
    label: t('mineral'),
    icon: 'emojione-v1:diamond-with-a-dot'
  },
]

const selectedMaterial = ref<MaterialOption | null>(null)

watch(() => props.modelValue, (value) => {
  const index = materials.findIndex((material) => material.value === value)
  if (index === -1) return
  selectedMaterial.value = materials[index]
}, { immediate: true })

</script>

<template>
  <BaseRadioGroup
      :options="materials"
      :model-value="selectedMaterial"
      @update:modelValue="emit('update:modelValue', $event.value)"
      size="sm"
      vertical
  ></BaseRadioGroup>
</template>
