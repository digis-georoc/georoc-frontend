<script setup lang="ts">
const queryStore = useQueryStore()

const activeMaterialFilter = computed(() => queryStore.getFilter('material'))
const selectedMaterialId = ref<string | null>(null)

watch(() => activeMaterialFilter.value, (value) => {
  if (value === null) return
  selectedMaterialId.value = <string>value.value
})

watch(() => selectedMaterialId.value, (value) => {
  if (value === null) return
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
