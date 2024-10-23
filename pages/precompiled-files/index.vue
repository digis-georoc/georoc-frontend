<script setup lang="ts">
import { FetchError } from 'ofetch'
const { t } = useI18n()
let precompiledFilePreviewArr: PrecompiledFilePreview[] | undefined
let precompiledPreviewError: FetchError | undefined
try {
  precompiledFilePreviewArr = (<PrecompiledFilePreviews>(
    await getPrecompiledPreview()
  )).preview
} catch (error: any) {
  precompiledPreviewError = error
}
const links: {
  href: string
  label: string
  isCurrent?: boolean
}[] = []

if (precompiledFilePreviewArr) {
  for (let preview of precompiledFilePreviewArr) {
    links.push({
      href: `/precompiled-files/${preview.protocol}/${preview.authority}/${preview.identifier}/${preview.version.major}.${preview.version.minor}`,
      label: preview.title,
    })
  }
}
</script>
<template>
  <PageContainer>
    <PageHead headline="Precompiled Files"></PageHead>
    <div v-if="precompiledPreviewError">
      <BaseError :error="precompiledPreviewError"></BaseError>
    </div>
    <div v-else class="pt-6 pb-12">
      <BaseDropdown
        :links="links"
        :buttontext="t('precompiledFilePage.select_button')"
        size="large"
      ></BaseDropdown>
    <PrecompiledFilesConcept />
    </div>
  </PageContainer>
</template>
