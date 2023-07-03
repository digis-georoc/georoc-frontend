<template>
  <div class="flex flex-col p-4">
    <QueryFilterContainer title="Filter by Area">
      <QueryFilterArea @start="startDrawingOnMap" @reset="resetPolygonOnMap" />
    </QueryFilterContainer>
  </div>
</template>
<script setup lang="ts">
const queryStore = useQueryStore();

function startDrawingOnMap() {
  queryStore.startDrawingOnMap();
}

function resetPolygonOnMap() {
  queryStore.resetPolygonOnMap();
}
</script>
