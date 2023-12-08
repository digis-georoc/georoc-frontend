<script setup lang="ts">
  onMounted(async () => {
    const precompiledFilePreviewArr:  PrecompiledFilePreview[] | undefined = (await getPrecompiledPreview())?.preview;
    if(precompiledFilePreviewArr){
      await navigateTo({path: `/precompiled-files/${precompiledFilePreviewArr[0].protocol}/${precompiledFilePreviewArr[0].authority}/${precompiledFilePreviewArr[0].identifier}`})
    }
  })
</script>
<template></template>
