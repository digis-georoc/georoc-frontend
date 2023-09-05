<script setup lang="ts">
const queryStore = useQueryStore()

const storedMaterial = window.localStorage.getItem('material-filter')
const hideMaterialDialog = window.localStorage.getItem('hide-material-dialog')

const selectedMaterialId = ref<string | null>(hideMaterialDialog !== null && storedMaterial ? storedMaterial : null)

handleFilterSelection(selectedMaterialId.value)

function handleFilterSelection(value: string | null) {
  if (value === null) return
  selectedMaterialId.value = value
  queryStore.setPanelFilter({
    name: 'material',
    value
  }, true)
}

function startDrawingOnMap() {
  queryStore.startDrawingOnMap()
}

function resetPolygonOnMap() {
  queryStore.resetPolygonOnMap()
}

function stopDrawingOnMap() {
  queryStore.stopDrawingOnMap()
}
</script>
<template>
  <div class="flex flex-col p-4">
    <QueryFilterContainer>
      <QueryFilterMaterial
        :model-value="selectedMaterialId"
        @update:model-value="handleFilterSelection"
      />
    </QueryFilterContainer>
    <QueryFilterContainer :title="$t('filter_by_area')">
      <QueryFilterPolygon
        @start="startDrawingOnMap"
        @reset="resetPolygonOnMap"
        @stop="stopDrawingOnMap"
      />
    </QueryFilterContainer>
    <QueryFilterContainer v-if="selectedMaterialId === 'WR'" :title="$t('rock_type')">
      <QueryFilterRockType />
    </QueryFilterContainer>
    <QueryFilterContainer v-if="selectedMaterialId === 'INC'" :title="$t('inclusion_type')">
      <QueryFilterInclusionType />
    </QueryFilterContainer>
  </div>
  <QueryFilterMaterialDialog @select="handleFilterSelection" />
</template>
