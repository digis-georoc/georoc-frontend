<script lang="ts" setup>

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

</script>
<template>
  <BaseBottomSheet
      :title="$t('selected_samples')"
      :model-value="modelValue"
      :full-height="true"
      @update:modelValue="emit('update:modelValue', $event)"
  >
    <QueryList/>
  </BaseBottomSheet>
</template>
