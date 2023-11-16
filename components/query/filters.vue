<script setup lang="ts">
const { t } = useI18n()

const queryStore = useQueryStore()

const inclusionTypeFilterValue = computed(() => queryStore.getFilter(QueryKey.InclusionType)?.value)
const materialFilterValue = computed(() => queryStore.getFilter(QueryKey.Material)?.value)

const storageHideKey = 'hide-material-dialog'
const storedMaterial = window.localStorage.getItem(queryStore.getCachingKey(QueryKey.Material))
const hideMaterialDialog = window.localStorage.getItem(storageHideKey) !== null || window.sessionStorage.getItem(storageHideKey) !== null

const selectedMaterialId = ref<string | null>(hideMaterialDialog && storedMaterial ? storedMaterial : null)

if (!materialFilterValue.value) handleFilterSelection(selectedMaterialId.value)

function handleFilterSelection(value: string | null) {
  if (value === null) return
  selectedMaterialId.value = value
  queryStore.setPanelFilter({
    name: QueryKey.Material,
    value
  })
  queryStore.resetOnMaterialChange()
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
    <QueryFilterRockType v-if="selectedMaterialId === 'WR'" />
    <QueryFilterInclusionType v-if="selectedMaterialId === 'INC'" />
    <template v-if="inclusionTypeFilterValue === 'IMIN'">
      <QueryFilterHostMaterial />
      <QueryFilterInclusionMaterial />
    </template>
    <template v-if="inclusionTypeFilterValue === 'IFL' || inclusionTypeFilterValue === 'IGL'" class="flex-grow flex">
      <QueryFilterHostMaterial />
    </template>
    <QueryFilterChemistry />
    <QueryFilterBaseContainer :title="$t('tectonic_setting')" @submit="submit">
      <template v-slot:selected>
        <QueryFilterBaseSelected />
      </template>
      <template v-slot:options>
        <QueryFilterTectonic />
      </template>
    </QueryFilterBaseContainer>
    <QueryFilterBaseContainer :title="$t('location_type')" @submit="submit">
      <template v-slot:selected>
        <QueryFilterBaseSelected />
      </template>
      <template v-slot:options>
        <QueryFilterLocationType />
      </template>
    </QueryFilterBaseContainer>
    <QueryFilterBaseContainer :title="$t('age')" @submit="submit">
      <template v-slot:selected>
        <QueryFilterBaseSelected />
      </template>
      <template v-slot:options>
        <QueryFilterAge />
      </template>
    </QueryFilterBaseContainer>
  </div>
  <QueryFilterMaterialDialog @select="handleFilterSelection" />
</template>
<style scoped>
.scroll-gradient::after {
  content: '';
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 25px;
  background: linear-gradient(rgba(255, 255, 255, 0.001), white); /* transparent keyword is broken in Safari */
  left: 0;
  pointer-events: none;
}
</style>
