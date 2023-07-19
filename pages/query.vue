<script setup lang="ts">

definePageMeta({
  layout: 'query',
})

const queryStore = useQueryStore()
const isMaterialDialogOpen = ref(window.localStorage.getItem('hide-material-dialog') === null)
const storedMaterialFilter = window.localStorage.getItem('material-filter')
const initialMaterialId = storedMaterialFilter !== null ? storedMaterialFilter : 'WR'

const selectedMaterialId = ref(isMaterialDialogOpen ? initialMaterialId : null)
const dontShowMaterialDialogAgain = ref(false)

const isFilterMobileOpen = ref(false)
const isListMobileOpen = ref(false)

function setMaterialFilter() {
  queryStore.setFilter({
    name: 'material',
    value: selectedMaterialId.value
  })
}

function handleDialogContinue() {
  isMaterialDialogOpen.value = false
  if (dontShowMaterialDialogAgain.value) window.localStorage.setItem('hide-material-dialog', '')
  else window.localStorage.removeItem('hide-material-dialog')

  setMaterialFilter()
}

onMounted(() => {
  if (!isMaterialDialogOpen.value) setMaterialFilter()
})

</script>
<template>
  <div class="flex flex-col xl:flex-row h-full w-full">
    <template v-if="isMobile">
      <QueryActiveFiltersMobile
        @filter="isFilterMobileOpen = !isFilterMobileOpen"
        @list="isListMobileOpen = !isListMobileOpen"
      />
      <QueryFiltersPanelMobile v-model="isFilterMobileOpen" />
      <QueryMap/>
      <QueryListPanelMobile v-model="isListMobileOpen" />
    </template>
    <template v-else>
      <div class="flex h-full w-full">
        <QueryFiltersPanel />
        <div class="flex flex-1 h-full relative">
          <QueryMap/>
          <QueryListPanel/>
        </div>
      </div>
    </template>
  </div>
  <BaseDialog title="Please select a material type" v-model="isMaterialDialogOpen">
    <QueryFilterMaterial v-model="selectedMaterialId" />
    <div class="flex justify-between items-center mt-4">
      <BaseCheckbox label="Don't show again" v-model="dontShowMaterialDialogAgain" />
      <BaseButton text="Continue" @click="handleDialogContinue" />
    </div>
  </BaseDialog>
</template>
