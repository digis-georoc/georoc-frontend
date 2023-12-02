<script setup lang="ts">

import AmountSamples from "~/components/query/amount-samples.vue";

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
      <QueryListPanelMobile v-model="isListMobileOpen" />
    </template>
    <template v-else>
      <div class="flex h-full w-full">
        <QueryFiltersPanel />
        <div class="flex flex-1 relative">
          <QueryMap/>
          <div class="absolute top-[24px] z-[1111] left-1/2 -translate-x-1/2">
            <div class="flex">
              <div class="bg-white rounded-md rounded-r-none font-semibold border border-primary p-2 text-primary">
                <AmountSamples class="ml-auto"/>
              </div>
              <QueryDownloadSamples class="rounded-l-none"/>
            </div>

          </div>
        </div>
        <QueryListPanel/>
      </div>
    </template>
  </div>
</template>
