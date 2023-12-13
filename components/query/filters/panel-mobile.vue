<script lang="ts" setup>

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

</script>
<template>
  <BaseBottomSheet
    :title="$t('filters')"
    :full-height="true"
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <QueryFilters/>
  </BaseBottomSheet>
</template>

