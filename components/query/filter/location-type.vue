<script setup lang="ts">

</script>

<template>
  <QueryFilterBaseContainer :title="$t('location_type')">
    <template v-slot:selected>
      <QueryFilterBaseSelected />
    </template>
    <template v-slot:options>
      <QueryFilterLocationType />
    </template>
  </QueryFilterBaseContainer>
</template>

<style scoped>

</style>