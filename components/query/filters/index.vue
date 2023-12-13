<script setup lang="ts">
const { t } = useI18n()

const queryStore = useQueryStore()

const materialFilterValue = computed(() => queryStore.getFilter(QueryKey.Material)?.value)

const storageHideKey = 'hide-material-dialog'
// const storedMaterial = window.localStorage.getItem(queryStore.getCachingKey(QueryKey.Material))
const hideMaterialDialog = window.localStorage.getItem(storageHideKey) !== null || window.sessionStorage.getItem(storageHideKey) !== null

const selectedMaterialId = ref<string | null>(hideMaterialDialog ? materialFilterValue.value : null)
if (!materialFilterValue.value) handleFilterSelection(selectedMaterialId.value)

function handleFilterSelection(value: string | null) {
  console.log('handleFilterSelection', value)
  if (value === null) return
  selectedMaterialId.value = value
  queryStore.setMaterialFilter({
    name: QueryKey.Material,
    value
  })
  submit()
}

function submit() {
  queryStore.execute()
}

</script>
<template>
  <div class="self-start flex items-center w-full px-4">
    <QueryFilterMaterial class="w-full" :model-value="selectedMaterialId" @update:model-value="handleFilterSelection" size="normal"/>
  </div>
  <div class="flex flex-1 flex-col overflow-auto scroll-gradient relative">
    <QueryFiltersWholeRockGlass v-if="selectedMaterialId === MaterialKeys.WRGL" />
    <QueryFiltersInclusion v-if="selectedMaterialId === MaterialKeys.INC" />
    <QueryFiltersMineral v-if="selectedMaterialId === MaterialKeys.MIN" />
  </div>
  <QueryFilterMaterialDialog @select="handleFilterSelection" />
</template>
