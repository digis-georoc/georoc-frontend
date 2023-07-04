<script setup lang="ts">
const queryStore = useQueryStore()
const selectedMaterialId = ref('rock')
const storedMaterialFilter = computed(() => queryStore.getFilter('material'))


watch(() => storedMaterialFilter.value, (value) => {
  selectedMaterialId.value = value ? <string>value.value : 'rock'
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
</script>
<template>
  <div class="flex flex-col p-4">
    <QueryFilterContainer>
      <QueryFilterMaterial v-model="selectedMaterialId" />
    </QueryFilterContainer>
    <QueryFilterContainer title="Filter by Area">
      <QueryFilterArea @start="startDrawingOnMap" @reset="resetPolygonOnMap" />
    </QueryFilterContainer>
  </div>
</template>
