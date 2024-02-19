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
      href: `/precompiled-files/${preview.protocol}/${preview.authority}/${preview.identifier}`,
      label: preview.title,
    })
  }
}
</script>
<template>
  <PageContainer>
    <BaseFluidContainer>
      <PageHead headline="Precompiled Files"></PageHead>
    </BaseFluidContainer>
    <div v-if="precompiledPreviewError">
      <BaseError :error="precompiledPreviewError"></BaseError>
    </div>
    <div v-else>
      <BaseContainer class="pt-6 pb-12">
        <BaseDropdown
          :links="links"
          :buttontext="t('precompiledFilePage.select_button')"
        ></BaseDropdown>
      </BaseContainer>
      <PrecompiledFilesConcept />
    </div>
  </PageContainer>
</template>
