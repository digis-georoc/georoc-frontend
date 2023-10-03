<script lang="ts" setup>
import {RadioGroupOption, SelectedChemicalElement} from "~/types";

const props = defineProps<{
  elementTypesOptions: RadioGroupOption[]
  elementOptions: RadioGroupOption[]
  modelValue: SelectedChemicalElement
  title: string
}>()

const emit = defineEmits<{
  'update:modelValue': [selected: RadioGroupOption]
}>()
</script>
<template>
  <BaseSelect :options="elementTypesOptions" :model-value="modelValue.type" @update:modelValue="modelValue.type = $event" :title="$t('element_type')" class="mb-4" />
  <BaseSelect :options="elementOptions" :model-value="modelValue.element" @update:modelValue="modelValue.element = $event" :title="$t('element')" class="mb-4" />
  <div class="flex space-x-2">
    <BaseInput title="Min" type="number" :model-value="modelValue.min" @update:modelValue="modelValue.min = $event" />
    <BaseInput title="Max" type="number" :model-value="modelValue.max" @update:modelValue="modelValue.max = $event" />
  </div>

</template>
