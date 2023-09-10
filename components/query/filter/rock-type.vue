<script setup lang="ts">
import { MultiselectOption } from "~/types"

const queryStore = useQueryStore()

const emit = defineEmits<{
  change: [selected: MultiselectOption[]]
}>()

const rocktypes = await getRocktypes()
const options = ref(rocktypes?.data.map(({ value, label }) => ({ value, label, active: false})) ?? [])
const selected = ref<MultiselectOption[]>([])
const selectedTemp = ref<MultiselectOption[]>([])
function remove(index: number) {
  selected.value.splice(index, 1)
  queryStore.setPanelFilter({
    name: 'rocktype',
    value: selected.value.length > 0 ? 'IN:' + selected.value.map(({ value }) => value).join(',') : ''
  })
  queryStore.execute()
}

function submit() {
  selected.value = selectedTemp.value
  queryStore.setPanelFilter({
    name: 'rocktype',
    value: selected.value.length > 0 ? 'IN:' + selected.value.map(({ value }) => value).join(',') : ''
  })
  queryStore.execute()
}

</script>

<template>
  <QueryFilterBaseContainer :title="$t('rock_type')" :dialog-title="$t('please_select_rock_type')" @submit="submit">
    <template v-slot:selected>
      <QueryFilterBaseSelected v-model="selected" @remove="remove($event)" />
    </template>
    <template v-slot:options>
      <div class="w-full">
        <BaseMultiselect :options="options" id-prefix="rocktype" @change="selectedTemp = $event"/>
      </div>
    </template>
  </QueryFilterBaseContainer>
</template>

<style scoped>

</style>
