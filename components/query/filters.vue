<script setup lang="ts">
const { t } = useI18n()

const queryStore = useQueryStore()

const inclusionTypeFilterValue = computed(() => queryStore.getFilter(QueryKey.InclusionType)?.value)
const materialFilterValue = computed(() => queryStore.getFilter(QueryKey.Material)?.value)

const storageHideKey = 'hide-material-dialog'
const storedMaterial = window.localStorage.getItem('material-filter')
const hideMaterialDialog = window.localStorage.getItem(storageHideKey) !== null || window.sessionStorage.getItem(storageHideKey) !== null

const selectedMaterialId = ref<string | null>(hideMaterialDialog && storedMaterial ? storedMaterial : null)

if (!materialFilterValue.value) handleFilterSelection(selectedMaterialId.value)

function handleFilterSelection(value: string | null) {
  if (value === null) return
  selectedMaterialId.value = value
  queryStore.setPanelFilter({
    name: QueryKey.Material,
    value
  }, true)
  queryStore.resetOnMaterialChange()
  submit()
}

function submit() {
  queryStore.execute()
}

</script>
<template>
  <div class="self-start flex items-center mb-8 w-full px-4">
    <QueryFilterMaterial class="w-full" :model-value="selectedMaterialId" @update:model-value="handleFilterSelection" size="normal"/>
  </div>
  <div class="flex flex-1 flex-col px-4 overflow-auto">
    <div v-if="selectedMaterialId === 'WR'">
      <QueryFilterRockType />
    </div>
    <div v-if="selectedMaterialId === 'INC'">
      <QueryFilterInclusionType />
    </div>
    <div v-if="inclusionTypeFilterValue === 'IMIN'" class="my-6 border-b dark:border-stone-700"></div>
    <div v-if="inclusionTypeFilterValue === 'IMIN'" class="flex-grow flex">
      <QueryFilterMaterialInclusion />
    </div>
    <div class="my-6 border-b dark:border-stone-700"></div>
    <div>
      <QueryFilterChemistry />
    </div>
    <div class="my-6 border-b dark:border-stone-700"></div>
    <div>
      <QueryFilterBaseContainer :title="$t('tectonic_setting')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterTectonic />
        </template>
      </QueryFilterBaseContainer>
    </div>
    <div class="my-6 border-b dark:border-stone-700"></div>
    <div>
      <QueryFilterBaseContainer :title="$t('location_type')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterLocationType />
        </template>
      </QueryFilterBaseContainer>
    </div>
    <div class="my-6 border-b dark:border-stone-700"></div>
    <div>
      <QueryFilterBaseContainer :title="$t('age')" @submit="submit">
        <template v-slot:selected>
          <QueryFilterBaseSelected />
        </template>
        <template v-slot:options>
          <QueryFilterAge />
        </template>
      </QueryFilterBaseContainer>
    </div>
  </div>
  <QueryFilterMaterialDialog @select="handleFilterSelection" />
</template>
