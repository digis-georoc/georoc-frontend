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
          <div class="absolute top-[24px] z-[1001] left-1/2 -translate-x-1/2" data-obstacle>
            <div class="flex">
              <div class="bg-white dark:bg-gray-800 rounded-md rounded-r-none font-semibold border border-primary dark:border-gray-600 p-2 dark:text-gray-100">
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
