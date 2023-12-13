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
<!--  <QueryFilterBaseContainer :title="$t('tectonic_setting')" @submit="submit">-->
<!--    <template v-slot:selected>-->
<!--      <QueryFilterBaseSelected />-->
<!--    </template>-->
<!--    <template v-slot:options>-->
<!--      <QueryFilterTectonic />-->
<!--    </template>-->
<!--  </QueryFilterBaseContainer>-->
<!--  <QueryFilterBaseContainer :title="$t('location_type')" @submit="submit">-->
<!--    <template v-slot:selected>-->
<!--      <QueryFilterBaseSelected />-->
<!--    </template>-->
<!--    <template v-slot:options>-->
<!--      <QueryFilterLocationType />-->
<!--    </template>-->
<!--  </QueryFilterBaseContainer>-->
<!--  <QueryFilterBaseContainer :title="$t('age')" @submit="submit">-->
<!--    <template v-slot:selected>-->
<!--      <QueryFilterBaseSelected />-->
<!--    </template>-->
<!--    <template v-slot:options>-->
<!--      <QueryFilterAge />-->
<!--    </template>-->
<!--  </QueryFilterBaseContainer>-->
</template>

<style scoped>

</style>
