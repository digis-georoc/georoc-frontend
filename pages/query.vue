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
  <div class="flex flex-col xl:flex-row h-full w-full">
    <template v-if="isMobile">
      <QueryActiveFiltersMobile
        @filter="handleFiltersBtn"
        @list="handleListBtn"
      />
      <QueryFiltersPanelMobile v-model="isFilterMobileOpen" />
      <QueryMap/>
      <QueryListPanelMobile v-model="isListMobileOpen" />
    </template>
    <template v-else>
      <div class="flex flex-col h-full w-full">
        <QueryFiltersPanel />
        <div class="flex flex-1 relative">
          <QueryMap/>
          <QueryListPanel/>
        </div>
      </div>
    </template>
  </div>
</template>
