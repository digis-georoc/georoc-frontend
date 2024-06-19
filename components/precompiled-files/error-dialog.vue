<script setup lang="ts">
const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    downloadError: {
      statusCode: number
      statusMessage: string
    }
    modelValue: boolean
  }>(),
  {},
)
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <BaseDialog
    :closable="true"
    :title="`${downloadError.statusCode}: ${t('oh_no_something_went_wrong')}`"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue')"
  >
    <p>{{ downloadError.statusMessage }}</p>
  </BaseDialog>
</template>
