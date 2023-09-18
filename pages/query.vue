<script setup lang="ts">

definePageMeta({
  layout: 'query',
})

const isFilterMobileOpen = ref(false)
const isListMobileOpen = ref(false)

function handleFiltersBtn() {
  isFilterMobileOpen.value = !isFilterMobileOpen.value
  if (isFilterMobileOpen.value) isListMobileOpen.value = false
}

function handleListBtn() {
  isListMobileOpen.value = !isListMobileOpen.value
  if (isListMobileOpen.value) isFilterMobileOpen.value = false
}

</script>
<template>
  <div class="flex flex-col xl:flex-row h-full w-full relative">
    <template v-if="isMobile">
      <QueryActiveFiltersMobile @filter="handleFiltersBtn" @list="handleListBtn" />
      <QueryFiltersPanelMobile v-model="isFilterMobileOpen" />
      <QueryMap/>
      <div class="absolute top-[78px] z-[9999] left-1/2 -translate-x-1/2">
        <QueryFilterPolygon />
      </div>
      <QueryListPanelMobile v-model="isListMobileOpen" />
    </template>
    <template v-else>
      <div class="flex h-full w-full">
        <QueryFiltersPanel />
        <div class="flex flex-1 relative">
          <div class="absolute top-[24px] z-[9999] left-1/2 -translate-x-1/2">
            <QueryFilterPolygon />
          </div>
          <QueryMap/>
          <QueryListPanel/>
        </div>
      </div>
    </template>
  </div>
</template>
