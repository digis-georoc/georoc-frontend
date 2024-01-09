<script setup lang="ts">
import { FetchError } from 'ofetch'
const { t } = useI18n()
const props = withDefaults(
  defineProps<{
    error?: FetchError
    redirectUrl?: string
    redirectText?: string
  }>(),
  {
    redirectUrl: '/',
    redirectText: 'Return home.',
  },
)
const handleError = () => clearError({ redirect: props.redirectUrl })
</script>
<template>
  <h2 class="text-2xl font-bold">
    Error {{ error?.statusCode }}: {{ $t('oh_no_something_went_wrong') }}
  </h2>
  <p class="py-4">{{ error?.statusMessage }}</p>
  <BaseButton :text="redirectText" @click="handleError"></BaseButton>
</template>
