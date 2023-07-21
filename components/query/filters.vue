<script setup lang="ts">
const queryStore = useQueryStore()

const activeMaterialFilter = computed(() => queryStore.getFilter('material'))
const selectedMaterialId = ref<string | null>(null)
watch(() => activeMaterialFilter.value, (value) => {
  if (value === null) return
  selectedMaterialId.value = <string>value.value
}, { immediate: true })

function handleFilterSelection(value: string) {
  queryStore.setFilter({
    name: 'material',
    value
  })
}

function startDrawingOnMap() {
  queryStore.startDrawingOnMap();
}

function resetPolygonOnMap() {
  queryStore.resetPolygonOnMap();
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
          @update:model-value="handleFilterSelection"/>
    </QueryFilterContainer>
    <QueryFilterContainer :title="$t('filter_by_area')">
      <QueryFilterPolygon
        @start="startDrawingOnMap"
        @reset="resetPolygonOnMap"
        @stop="stopDrawingOnMap"
      />
    </QueryFilterContainer>
  </div>
</template>
