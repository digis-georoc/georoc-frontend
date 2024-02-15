<script setup lang="ts">
const queryStore = useQueryStore()

const inclusionTypeFilterValue = computed(() => queryStore.getFilter(QueryKey.InclusionType)?.value)

</script>

<template>
  <QueryFilterInclusionType />
  <template v-if="inclusionTypeFilterValue === 'IMIN'">
    <QueryFilterHostMaterial />
    <QueryFilterInclusionMaterial />
  </template>
  <template v-if="inclusionTypeFilterValue === 'IFL' || inclusionTypeFilterValue === 'IGL'" class="flex-grow flex">
    <QueryFilterHostMaterial />
  </template>
  <QueryFilterChemistry />
  <QueryFilterTectonicSetting />
  <QueryFilterLocationType />
  <QueryFilterAge />
</template>

<style scoped>

</style>
