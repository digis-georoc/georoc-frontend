<script setup lang="ts">
import { FetchError } from 'ofetch'
let precompiledFilePreviewArr: PrecompiledFilePreview[] | undefined
let precompiledPreviewError: FetchError | undefined
try {
  precompiledFilePreviewArr = (<PrecompiledFilePreviews>(
    await getPrecompiledPreview()
  )).preview
} catch (error: any) {
  precompiledPreviewError = error
}

onMounted(async () => {
  if (precompiledFilePreviewArr) {
    await navigateTo({
      path: `/precompiled-files/${precompiledFilePreviewArr[0].protocol}/${precompiledFilePreviewArr[0].authority}/${precompiledFilePreviewArr[0].identifier}`,
    })
  }
})
</script>
<template>
  <PageContainer v-if="precompiledPreviewError">
    <PageHead headline="Precompiled Files"></PageHead>
    <BaseError :error="precompiledPreviewError"></BaseError>
  </PageContainer>
</template>
