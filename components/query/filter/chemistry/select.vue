<script lang="ts" setup>
import { RadioGroupOption, SelectedChemicalElement } from "~/types";

const props = defineProps<{
  modelValue: SelectedChemicalElement
  title: string
}>()

const elementsSelectDisabled = ref(true)

const elementOptions = ref<RadioGroupOption[]>([])
const elementTypesOptions = ref<RadioGroupOption[]>([])

const emit = defineEmits<{
  'update:modelValue': [selected: RadioGroupOption]
}>()

async function selectElementType(type: RadioGroupOption) {
  props.modelValue.type = type
  const elements = await getElements(type.value)
  elementOptions.value = elements?.data ?? []

  elementsSelectDisabled.value = false
}

onMounted(async () => {
  const elementTypes = await getElementTypes()
  elementTypesOptions.value = elementTypes?.data.map(({ name }) => ({ label: name, value: name })) ?? []

})
</script>
<template>
  <BaseSelect
    :options="elementTypesOptions"
    :model-value="modelValue.type"
    :title="$t('element_type')"
    @update:modelValue="selectElementType"
    class="mb-4"
  />
  <BaseSelect
    :options="elementOptions"
    :model-value="modelValue.element"
    :title="$t('element')"
    :disabled="elementsSelectDisabled"
    @update:modelValue="modelValue.element = $event"
    class="mb-4"
  />
  <div class="flex space-x-2">
    <BaseInput
      class="w-1/2"
      title="Min"
      type="number"
      :model-value="modelValue.min"
      :disabled="elementsSelectDisabled"
      @update:modelValue="modelValue.min = $event"
    />
    <BaseInput
      class="w-1/2"
      title="Max"
      type="number"
      :model-value="modelValue.max"
      :disabled="elementsSelectDisabled"
      @update:modelValue="modelValue.max = $event"
    />
  </div>

</template>
