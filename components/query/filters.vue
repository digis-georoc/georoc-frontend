<script setup lang="ts">
const queryStore = useQueryStore()
const selectedMaterialId = ref('WR')
const storedMaterialFilter = computed(() => queryStore.getFilter('material'))


watch(() => storedMaterialFilter.value, (value) => {
  selectedMaterialId.value = value ? <string>value.value : 'WR'
})

watch(() => selectedMaterialId.value, (value) => {
  queryStore.setFilter({
    name: 'material',
    value
  })
})
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
      <QueryFilterMaterial v-model="selectedMaterialId" />
    </QueryFilterContainer>
    <QueryFilterContainer title="Filter by Area">
      <QueryFilterArea
        @start="startDrawingOnMap"
        @reset="resetPolygonOnMap"
        @stop="stopDrawingOnMap"
      />
    </QueryFilterContainer>
  </div>
</template>
