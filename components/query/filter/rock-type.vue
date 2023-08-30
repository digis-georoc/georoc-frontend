<script setup lang="ts">
import {MultiselectOption} from "~/types";

const rocktypes = await getRocktypes()
const options = ref(rocktypes?.data.map(({ value, label }) => ({ value, label, active: false})) ?? [])
const queryStore = useQueryStore()

function onChange(selected: MultiselectOption[]) {
  queryStore.setFilter({
    name: 'rocktype',
    value: 'IN:' + selected.map(({ value }) => value).join(',')
  })
}
</script>

<template>
  <div class="w-full">
    <BaseMultiselect :options="options" id-prefix="rocktype" @change="onChange"/>
  </div>
</template>

<style scoped>

</style>
