<script setup lang="ts">
const props = withDefaults(defineProps<{
  idPrefix: string,
  modelValue?: MultiselectOption[]
}>(), { idPrefix: 'default-checkbox'})

const emit = defineEmits<{
  remove: [item: string]
  'update:modelValue': [list: string[]],
  change: [{index: number, checked: boolean}]
}>()

function onChange(index: number, checked: boolean) {
  emit('change', {index, checked})
}

</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center my-1 hover:bg-gray-100 dark:hover:bg-gray-600" v-for="({ value, label, active }, i) in modelValue">
      <BaseCheckbox :id="idPrefix + value + i" :model-value="active" @update:modelValue="onChange(i, $event)" />
      <label :for="idPrefix + value + i" class="cursor-pointer ml-1.5 flex-1">{{ label }}</label>
    </div>
  </div>
</template>

<style scoped>

</style>
